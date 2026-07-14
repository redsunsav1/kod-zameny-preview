import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Код замены — лекционный курс Тины Канделаки",
  description: "Лекционный курс о том, как нам подменяют красоту, историю и смысл.",
  openGraph: {
    title: "Код замены — лекционный курс Тины Канделаки",
    description: "Увидеть подмену. Понять механику. Переписать код.",
    type: "website",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Код замены — архивное дело курса" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Код замены — лекционный курс Тины Канделаки",
    description: "Увидеть подмену. Понять механику. Переписать код.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
