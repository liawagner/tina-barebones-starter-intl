import Post from "./client-page";
import client from "../../../../tina/__generated__/client";
import { setRequestLocale } from "next-intl/server";
import { routing } from "../../../../i18n/routing";

export async function generateStaticParams() {
  const pages = await client.queries.postConnection();
  const paths: { locale: string; filename: string[] }[] = [];

  // Generate paths for each locale
  const locales = routing.locales;

  for (const locale of locales) {
    // Get posts for this locale
    const localePosts =
      pages.data?.postConnection?.edges?.filter((edge) =>
        edge?.node?._sys.relativePath.startsWith(`${locale}/`)
      ) || [];

    for (const edge of localePosts) {
      if (edge?.node?._sys.breadcrumbs) {
        // Remove locale from breadcrumbs since it's in the path
        const filename = edge.node._sys.breadcrumbs.slice(1);
        paths.push({
          locale,
          filename,
        });
      }
    }
  }

  return paths;
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; filename: string[] }>;
}) {
  const { locale, filename } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const data = await client.queries.post({
    relativePath: `${locale}/${filename.join("/")}.md`,
  });

  return <Post {...data}></Post>;
}
