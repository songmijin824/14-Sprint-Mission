import React, { useState } from 'react';
import ImageFile from './ImageFile';
import { useUploadImage } from '@/hooks/useUploadImage';
import { ControllerRenderProps } from 'react-hook-form';
import ConfirmModal from '../ConfirmModal';
import { useConfirmModal } from '@/hooks/useModal';

interface ImageFileBoxProps {
  field: ControllerRenderProps<any, any>;
  error: string | undefined;
  maxCount:number;
}

function ImageFileBox({ field,error , maxCount = 3 }: ImageFileBoxProps) {  
   const { mutate: uploadImage } = useUploadImage();
    const { isConfirmOpen, confirmMessage, openConfirmModal, closeConfirmModal } = useConfirmModal();

  const getFilesValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (field.value?.length >= maxCount) {
      openConfirmModal(`이미지 등록은 최대 ${maxCount}개까지 가능합니다.`);
      return;
    }
    uploadImage(file, {
      onSuccess: (url) => {
        field.onChange([...(field.value || []), url]);
      },
      onError:(error) => {
        const message = error?.message || '이미지 업로드 실패';
        openConfirmModal(message);
      },
    });
  };

  return (
    <>
      <ImageFile
        label="상품 이미지"
        text="이미지 등록"
        images={field.value}
        errorCase={error}
        onChange={getFilesValue}
        onClickDelete={(idx) => {
          const updated = [...(field.value || [])];
          updated.splice(idx, 1);
          field.onChange(updated);
        }}
      />
      <ConfirmModal isOpen={isConfirmOpen} onClose={closeConfirmModal} errorMessage={confirmMessage} />
    </>
  );
}

export default ImageFileBox;
