import { useTranslations } from "next-intl";
import { Link } from "../../../i18n/navigation";
import type { PostConnectionQuery } from "../../../tina/__generated__/types";

interface PostListProps {
  data: PostConnectionQuery;
  locale: string;
}

export default function PostList({ data, locale }: PostListProps) {
  const t = useTranslations("HomePage");
  return (
    <>
      <h1 className="title">{t("posts")}</h1>
      <div>
        {data.postConnection?.edges?.map((post) => {
          if (!post?.node) return null;

          // Remove locale prefix from filename for the URL
          const filename = post.node._sys.filename.replace(`${locale}/`, "");

          return (
            <div key={post.node.id}>
              <Link href={`/posts/${filename}`}>
                {post.node.title || filename}
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
