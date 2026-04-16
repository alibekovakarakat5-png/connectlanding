import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Connect — WhatsApp Business Platform",
  description: "Каталог, запись, рассылки и чат-боты для бизнеса в WhatsApp. Антибан-защита, 17+ интеграций, flow builder. Попробуйте бесплатно.",
  keywords: "WhatsApp API, WhatsApp бизнес, чат-бот WhatsApp, рассылка WhatsApp, каталог WhatsApp, CRM WhatsApp",
  openGraph: {
    title: "Connect — WhatsApp Business Platform",
    description: "Продавайте, записывайте и автоматизируйте через WhatsApp",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
