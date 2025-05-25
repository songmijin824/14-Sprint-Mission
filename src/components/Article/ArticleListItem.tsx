import React, { useEffect } from 'react';
import UserInfo from '../ui/UserInfo';
import { formatDate } from '@/utils/date';
import { FallbackImage } from '../FallbackImage/FallbackImage';
import { PostItem } from '@/hooks/useArticles';
import { useRouter } from 'next/navigation';
import ArticleLikeButton from '../ui/ArticleLikeButton';

interface ArticleListItemProps {
  postItem: PostItem
}
function ArticleListItem({ postItem }: ArticleListItemProps) {
  const router = useRouter();
  const href = `boards/${postItem.id}`;

  useEffect(() => {
    router.prefetch(href);
  }, [href, router]);

  
  const createdAtString = formatDate(postItem.createdAt);


  return (
    <>
      <li className="border-b border-secondary-200 my-6 pb-6">
        <div className="flex w-full flex-col gap-4">
          <div className="flex justify-between w-full">
            <div className="font-semibold text-lg"><a href={href}>{postItem.title}</a></div>
            <div className="relative w-[72px] border border-secondary-100 rounded-lg overflow-hidden aspect-[1/1]">
              <FallbackImage
                src={postItem.image}
                alt={postItem.content}
                sizes="sm:100vw, 33vw"
                className={`absolute inset-0 object-cover scale-105 transition-opacity duration-300 $`}
                aria-hidden="true"
              />
            </div> 
          </div>
          <div className="flex justify-between w-full">
            <UserInfo ownerNickname={postItem.writer.nickname} createdAtString={createdAtString} width={24} className="gap-[8px] text-sm" childrenClassName="!flex-row items-center" fontSize='12px'/>
            <ArticleLikeButton
              className="flex gap-1 items-center text-sm "
              id={postItem.id} 
              />
          </div>
        </div>
      </li>
    </>
  );
}

export default ArticleListItem;