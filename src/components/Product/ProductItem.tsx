'use client';

import React from 'react';
import Link from 'next/link';
import styles from './ProductItem.module.css';
import clsx from 'clsx';
import { ProductSummary } from '@/hooks/useItems';
import { FallbackImage } from '../FallbackImage/FallbackImage';
import { defaultImg } from '@/lib/imageAssets';
import { useConfirmModal } from '@/hooks/useModal';
import ConfirmModal from '../ui/ConfirmModal';
import ProductLikeButton from '../ui/ProductLikeButton';


interface ProductItemProps {   // ProductSummary 타입정의할때 옵셔널 방식을 사용함   | undefined 필요 
  productItem: ProductSummary;
}

function ProductItem({productItem}: ProductItemProps) {
  // const randomNum = Math.floor(Math.random() * 4) + 1;
  // const randomImg = `../img/img_1.jpg`;

  const productId = productItem.id ?? 0; 

  const { isConfirmOpen, confirmMessage, openConfirmModal, closeConfirmModal } = useConfirmModal();

  return (
    <li className={styles.listItem}>
      <Link href={`items/${productId}`}>
        <div className={clsx(styles.imgBox,'border border-[var(--Cool_Gray_200)]')}>
          <FallbackImage
            src={productItem.images?.[0] || defaultImg}
            alt="ProductImg"  
          />
        </div>
      </Link>
      <div className={styles.description}>
        <div className={styles.name}>{productItem.name}</div>
        <div className={styles.price}>{productItem.price?.toLocaleString()}원</div>
        <ProductLikeButton
          id={productId} 
          className="flex gap-1 h-4 w-4 items-center text-sm"
          iconWidth={16}
          iconHeight={16}
        />
      </div>
      <ConfirmModal isOpen={isConfirmOpen} onClose={closeConfirmModal} errorMessage={confirmMessage} />
    </li>
  );
}

export default ProductItem;
