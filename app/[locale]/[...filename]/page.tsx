import ClientPage from "./client-page";
import client from "../../../tina/__generated__/client";
import { setRequestLocale } from "next-intl/server";
import { routing } from "../../../i18n/routing";

export async function generateStaticParams() {
  const pages = await client.queries.pageConnection();
  const paths: { locale: string; filename: string[] }[] = [];

  // Generate paths for each locale
  const locales = routing.locales;

  for (const locale of locales) {
    // Get pages for this locale
    const localePages =
      pages.data?.pageConnection?.edges?.filter((edge) =>
        edge?.node?._sys.relativePath.startsWith(`${locale}/`)
      ) || [];

    for (const edge of localePages) {
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

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; filename: string[] }>;
}) {
  const { locale, filename } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const data = await client.queries.page({
    relativePath: `${locale}/${filename.join("/")}.mdx`,
  });

  return <ClientPage {...data} />;
}
