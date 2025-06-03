import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "../../i18n/routing";

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
  return routing.locales.map((locale) => ({ locale }));
}
