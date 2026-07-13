import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Vazirmatn } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "محمد مهدی سلیمیان | طراح و توسعه‌دهنده وب",
  description:
    "پورتفولیوی محمد مهدی سلیمیان — طراح سایت، تدوینگر، گرافیست و هنرمند منبت و معرق چوب",
  keywords: [
    "طراح سایت",
    "توسعه‌دهنده وب",
    "تدوین ویدیو",
    "فتوشاپ",
    "منبت چوب",
    "طراحی پوستر",
    "محمد مهدی سلیمیان",
  ],
  authors: [{ name: "محمد مهدی سلیمیان" }],
  openGraph: {
    title: "محمد مهدی سلیمیان | طراح و توسعه‌دهنده وب",
    description: "طراحی سایت، تدوین، گرافیک و هنر چوب",
    type: "website",
    locale: "fa_IR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${vazirmatn.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
