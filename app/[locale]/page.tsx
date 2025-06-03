import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

export default async function LocaleRootPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  // Redirect to the home content
  redirect(`/${locale}/home`);
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "de" }];
}
