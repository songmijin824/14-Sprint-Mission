
'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../login/Login.module.css';
import Button from 'components/ui/Button';
import MembersLogo from '@/components/members/MembersLogo';
import SnsLogin from '@/components/members/SnsLogin';
import FormField from '@/components/ui/form/FormField';
import { useSignUp } from '@/hooks/useAuth';
import { useConfirmModal } from '@/hooks/useModal';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { useForm, SubmitHandler } from 'react-hook-form';
import { joinFormSchema } from '@/utils/validate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

type FormValues = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
};

function Login() {
  const [passwordBoxType, setPasswordBoxType] = useState(false);
  const [pwdCheckBoxType, setPwdCheckBoxType] = useState(false);

   const router = useRouter();
 
   useEffect(() => {
     const accessToken = localStorage.getItem('accessToken');
 
     if (accessToken) {
       router.replace('/'); 
     }
   }, []);

  const { isConfirmOpen, confirmMessage, openConfirmModal, closeConfirmModal } = useConfirmModal();
  const { mutate: signUp } = useSignUp(openConfirmModal);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<FormValues>({
    mode: 'onBlur', // blur 시 유효성 검사
    resolver: zodResolver(joinFormSchema),
  });
  
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    signUp(data);
  };

  const handleEyeClick = () => setPasswordBoxType(!passwordBoxType);
  const handleEyePwdCheck = () => setPwdCheckBoxType(!pwdCheckBoxType);

  return (
    <div className={styles.login_body}>
      <div className={styles.login_wrap}>
        <MembersLogo />
        <div className={styles.login_box}>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              id="login_email"
              label="이메일"
              type="email"
              placeholder="이메일을 입력해주세요"
              error={errors.email?.message}
              {...register('email')}
            />

            <FormField
              id="login_name"
              label="닉네임"
              type="text"
              placeholder="닉네임을 입력해주세요"
              error={errors.nickname?.message}
              {...register('nickname')}
            />

            <FormField
              id="login_pwd"
              label="비밀번호"
              type={passwordBoxType ? "text" : "password" }
              placeholder="비밀번호를 입력해주세요"
              error={errors.password?.message}
              withEyeToggle
              eyeState={passwordBoxType} // eye 토글 상태 관리 필요시 별도 상태 선언
              onEyeToggle={handleEyeClick}
              {...register('password')}
            />
            <FormField
              id="login_pwd_check"
              label="비밀번호 확인"
              type={pwdCheckBoxType ? "text" : "password" }
              placeholder="비밀번호를 다시 입력해주세요"
              error={errors.passwordConfirmation?.message}
              withEyeToggle
              eyeState={pwdCheckBoxType} // eye 토글 상태 관리 필요시 별도 상태 선언
              onEyeToggle={handleEyePwdCheck}
              {...register('passwordConfirmation')}
            />
                        
            <Button 
              type="submit"
              variant='primary' 
              size="large"
              disabled={!isValid || !isDirty}
            >
              회원가입
            </Button>
          </form>
        </div>
        <SnsLogin />
        <div className={styles.member_sub_box}>
          <span>이미 회원이신가요? <Link href="/login">로그인</Link></span>
        </div>
      </div>      
      <ConfirmModal isOpen={isConfirmOpen} onClose={closeConfirmModal} errorMessage={confirmMessage} />
    </div>
  );
}

export default Login;