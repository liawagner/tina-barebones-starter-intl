import React from "react";

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import { useTranslations } from "next-intl";
import { Link } from "../../i18n/navigation";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        style={{
          margin: "3rem",
        }}
      >
        <NextIntlClientProvider>
          <header>
            <Link href="/">Home</Link>
            {" | "}
            <Link href="/about">About</Link>
            {" | "}
            <Link href="/posts">Posts</Link>
          </header>
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
