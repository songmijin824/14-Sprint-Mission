'use client';

import ConfirmModal from "./ConfirmModal";
import { useConfirmModal } from "@/hooks/useModal";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { ICON } from "./Icon";
import { useProductLikePostMutation, useProductsDetails } from "@/hooks/useItems";

interface LikeButtonProps {
  id: number;
  className?: string;
  iconWidth?: number; 
  iconHeight?: number;
}
function ProductLikeButton({
  id, 
  className, 
  iconWidth=16, 
  iconHeight=16, 
} : LikeButtonProps) {
  
  const { user } = useAuth();
  const { isConfirmOpen, confirmMessage, openConfirmModal, closeConfirmModal } = useConfirmModal();

  const { data: currentData } = useProductsDetails(id);
  const { mutate: toggleLike } = useProductLikePostMutation();

  const handleClick = () => {
    if(!user) {
      openConfirmModal('로그인 후 이용 가능합니다.');
      return;
    }
    toggleLike({
      postId: id,
      userAction: currentData?.isFavorite ? 'UNLIKE_POST' : 'LIKE_POST',
    });
  };

  return (
    <>
      <button onClick={handleClick} className={className}>
        <Image src={currentData?.isFavorite ?  ICON.heartClose : ICON.heartOpen} width={iconWidth} height={iconHeight}  alt='좋아요' />
        <span>{currentData?.favoriteCount}</span>
      </button>
      <ConfirmModal isOpen={isConfirmOpen} onClose={closeConfirmModal} errorMessage={confirmMessage} />
    </>
  )

}
export default ProductLikeButton;
