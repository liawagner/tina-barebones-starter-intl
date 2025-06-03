import PostList from "./post-list";
import { client } from "../../../tina/__generated__/client";
import { setRequestLocale } from "next-intl/server";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const pages = await client.queries.postConnection();

  // Filter posts for current locale
  const filteredPosts = {
    ...pages,
    data: {
      ...pages.data,
      postConnection: {
        ...pages.data?.postConnection,
        edges:
          pages.data?.postConnection?.edges?.filter((edge) =>
            edge?.node?._sys.relativePath.startsWith(`${locale}/`)
          ) || [],
      },
    },
  };

  return <PostList {...filteredPosts} locale={locale} />;
}
