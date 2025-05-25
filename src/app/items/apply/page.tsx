'use client';
import React from 'react';
import { useState } from 'react';
import styles from './Additem.module.css';
import Container from 'components/layout/Container';
import Button from 'components/ui/Button';
import Title from 'components/ui/Title';
import { InputField, TextAreaField } from '@/components/ui/form/InputBox';
import TagBox from '@/components/ui/TagBox';
import { CreateProductRequest, usePostProduct } from '@/hooks/useItems';
import ImageFileBox from '@/components/ui/form/ImageFileBox';
import { useConfirmModal } from '@/hooks/useModal';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import FormField from '@/components/ui/form/FormField';
import { itemFormSchema } from '@/utils/validate';
import { zodResolver } from '@hookform/resolvers/zod';


function Additem() {
  const router = useRouter();
  const { isConfirmOpen, confirmMessage, openConfirmModal, closeConfirmModal } = useConfirmModal();

  const { mutate: postProduct} = usePostProduct(openConfirmModal,router);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<CreateProductRequest>({
    mode: 'onChange', 
    defaultValues: {
      images: [],
      tags: [],
      price: 0,
      description: '',
      name: ''
    },
    resolver: zodResolver(itemFormSchema),
  });


  const onSubmit = (data: CreateProductRequest) => {
    postProduct(data);
  };

  return (
    <Container className="relative">
      <Title titleTag='h1' text='상품 등록하기'>
      </Title>
    
      <form className={styles.formBox} onSubmit={handleSubmit(onSubmit)}> 
        <Button 
          type="submit"
          variant="primary" size="small_40" width={74}
          className="!absolute top-0 right-0"
          disabled = { !isValid }
        >등록</Button>
        <Controller
          name="images"
          control={control}
          render={({ field, fieldState }) => (
          <ImageFileBox field={field} error={fieldState.error?.message} maxCount={1}/>
          )}
        />
        <FormField
          id="name"
          label="*상품명"
          type="text"
          placeholder="상품명을 입력해주세요"
          error={errors.name?.message}
          {...register('name')}
        />   
        <TextAreaField
          id="description"
          label='*상품 소개' height='282px' placeholder='상품 소개를 입력해주세요'
          error={errors.description?.message}
          {...register("description")}
        />
        <FormField
          id="price"
          label="*판매가격"
          type="number"
          placeholder="판매 가격을 입력해주세요"
          error={errors.price?.message}
          {...register('price')}
        />   
        <TagBox  control={control} name="tags" maxCount={20} />
      </form>
      <ConfirmModal isOpen={isConfirmOpen} onClose={closeConfirmModal} errorMessage={confirmMessage} />
    </Container>
  );
}

export default Additem;