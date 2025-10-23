import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-be-vietnam-pro',
});

export const metadata: Metadata = {
  title: "FGS ONE",
  description: "FGS ONE",
  icons: {
    icon: [
      { url: '/assets/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/assets/favicon.svg', type: 'image/svg+xml' },
      { url: '/assets/favicon.ico' },
    ],
    apple: { url: '/assets/apple-touch-icon.png', sizes: '180x180' },
  },
  manifest: '/assets/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={beVietnamPro.variable}>
      <body style={{ fontFamily: 'var(--font-be-vietnam-pro)' }}>
        {children}
      </body>
    </html>
  );
}

