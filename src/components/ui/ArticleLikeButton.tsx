'use client';

import ConfirmModal from "./ConfirmModal";
import { useConfirmModal } from "@/hooks/useModal";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { ICON } from "./Icon";
import { useArticleDetails, useArticleLikePostMutation } from "@/hooks/useArticles";

interface LikeButtonProps {
  id: number;
  className?: string;
  iconWidth?: number; 
  iconHeight?: number;
}
function ArticleLikeButton({
  id, 
  className, 
  iconWidth=16, 
  iconHeight=16, 
} : LikeButtonProps) {
  
  const { user } = useAuth();
  const { isConfirmOpen, confirmMessage, openConfirmModal, closeConfirmModal } = useConfirmModal();
  
  const { data: currentData } = useArticleDetails(id);
  const { mutate: toggleLike } = useArticleLikePostMutation();

  const handleClick = () => {
    if(!user) {
      openConfirmModal('로그인 후 이용 가능합니다.');
      return;
    }
    toggleLike({
      postId: id,
      userAction: currentData?.isLiked ? 'UNLIKE_POST' : 'LIKE_POST',
    });
  };

  return (
    <>
      <button onClick={handleClick} className={className}>
        <Image src={currentData?.isLiked ?  ICON.heartClose : ICON.heartOpen} width={iconWidth} height={iconHeight}  alt='좋아요' />
        <span>{currentData?.likeCount}</span>
      </button>
      <ConfirmModal isOpen={isConfirmOpen} onClose={closeConfirmModal} errorMessage={confirmMessage} />
    </>
  )

}
export default ArticleLikeButton;
