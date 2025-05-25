import React from 'react';
import { useState } from "react";
import styles from './TagBox.module.css';
import Icon from './Icon';
import { InputField } from './form/InputBox';
import { CreateProductRequest, ProductSummary } from '@/hooks/useItems';
import { Control, useController } from 'react-hook-form';


interface TagListProps {
  tags: string; 
  onClickDelete: (index: number) => void; 
  num: number
}
function TagList({tags, onClickDelete, num}: TagListProps){
  const handleClick = () => onClickDelete(num);
 return (
  <>
    <span>#{tags}</span>
    <div className={styles.tagDeleteBtn} onClick={handleClick}><Icon iconName='X'  width={12} height={12}  alt='delete product tag' /></div>
  </>
 )
}

interface TagBoxProps {
  control: Control<any>;
  name: string; 
  maxCount?: number;
}

function TagBox({ control, maxCount = 99 }: TagBoxProps){
  
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name: 'tags',
    control,
  });


  // 엔터를 KeyDown 했을때 
  // inputValue 값을 product.tags 에 추가하고 input 박스 리셋
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = e.currentTarget.value.trim();
      if (!trimmed || value.includes(trimmed)) return;
      if (value.length >= maxCount) return;


      onChange([...value, trimmed]);
      console.log(value);
      e.currentTarget.value = '';
    }
  }

  // 태그 미리보기 삭제
  function handleClickTagDelete(index: number){
    const updated = [...value];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div className={styles.tagBox}>
      <InputField
      label='태그' 
      inputBoxType='text' 
      placeholder='태그를 입력해주세요' 
      onKeyDown={handleKeyDown}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
      {value.tags?.length !== 0 &&
        <ul className={styles.tagList}>
        {value.map((tag: string, index: number) => (
          <li key={index}>
            <TagList tags={tag} onClickDelete={handleClickTagDelete} num={index}/>
          </li>
        ))}
        </ul>
      }
    </div>
  )
}
export default TagBox; 