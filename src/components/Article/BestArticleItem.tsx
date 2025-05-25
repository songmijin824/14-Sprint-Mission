import { PostItem } from "@/hooks/useArticles";
import { formatDate } from "@/utils/date";
import { FallbackImage } from "../FallbackImage/FallbackImage";
import BestBadge from "../ui/BestBadge";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ArticleLikeButton from "../ui/ArticleLikeButton";


interface ArticleListItemProps {
  postItem: PostItem
}
function BestArticleItem({ postItem }: ArticleListItemProps) {
  const router = useRouter();
  const href = `boards/${postItem.id}`;

  useEffect(() => {
    router.prefetch(href);
  }, [href, router]);

  const createdAtString = formatDate(postItem.createdAt);

  return (
    <>
      <li className="relative flex-1 bg-secondary-50 rounded-lg pt-[46px] pb-[9px] px-6">
        <div className="flex w-full flex-col gap-4">
          <BestBadge className="absolute top-0 left-6"/>
          <div className="flex justify-between w-full">
            <div className="font-semibold text-lg"> <a href={href}>{postItem.title}</a></div>
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
            <div className="flex gap-2 items-center">
              <span className="text-sm text-secondary-600">{postItem.writer.nickname}</span>
              <ArticleLikeButton
                className="flex gap-1 h-4 w-4 items-center text-sm"
                id={postItem.id} 
                />
            </div>
            <div className="text-sm text-secondary-400">
              {createdAtString}
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

export default BestArticleItem;
