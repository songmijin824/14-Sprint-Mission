'use client';
import Container from '@/components/layout/Container';
import Button from '@/components/ui/Button';
import ConfirmModal from '@/components/ui/ConfirmModal';
import FormField from '@/components/ui/form/FormField';
import ImageFileBox from '@/components/ui/form/ImageFileBox';
import { TextAreaField } from '@/components/ui/form/InputBox';
import Title from '@/components/ui/Title';
import { usePostArticles } from '@/hooks/useArticles';
import { useConfirmModal } from '@/hooks/useModal';
import { ArticlesFormSchema} from '@/utils/validate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type FormValues = {
  title: string;
  content: string;
  image: string[];
};

function PostArticles() {
  const router = useRouter();
  const { isConfirmOpen, confirmMessage, openConfirmModal, closeConfirmModal } = useConfirmModal();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange', 
    defaultValues: {
      image: [],
      title: '',
      content: ''
    },
    resolver: zodResolver(ArticlesFormSchema),
  });


  const { mutate: postArticles} = usePostArticles(openConfirmModal,router);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    postArticles(data);
  };

  return (
    <Container className="relative mb-[130px]">
      <Title titleTag='h1' text='게시물 쓰기'>
      </Title>
      <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}> 
        <Button 
          type="submit"
          variant="primary" 
          size="small_40"
          width={74}
          className="!absolute top-0 right-0"
          disabled = { !isValid }
        >등록</Button>

        <FormField
          id="title"
          label="*제목"
          type="text"
          placeholder="제목을 입력해주세요"
          error={errors.title?.message}
          {...register('title')}
        />        
        <TextAreaField
          id="content"
          label='*내용' height='282px' placeholder='내용를 입력해주세요'
          error={errors.content?.message}
          {...register("content")}
        />
        <Controller
          name="image"
          control={control}
          render={({ field, fieldState }) => (
          <ImageFileBox field={field} error={fieldState.error?.message} maxCount={3}/>
          )}
        />
      </form>
      <ConfirmModal isOpen={isConfirmOpen} onClose={closeConfirmModal} errorMessage={confirmMessage} />
    </Container>
  );
}

export default PostArticles;