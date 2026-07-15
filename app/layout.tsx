import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Код замены — живая лекция Тины Канделаки в Ростове-на-Дону",
  description: "Офлайн-лекция Тины Канделаки о том, как нам подменяют красоту, историю и смысл. Оставьте заявку на участие.",
  openGraph: {
    title: "Код замены — живая лекция в Ростове-на-Дону",
    description: "Тина Канделаки. Один вечер, два лекционных блока и живой разговор.",
    type: "website",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Код замены — архивное дело курса" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Код замены — живая лекция в Ростове-на-Дону",
    description: "Тина Канделаки. Один вечер, два лекционных блока и живой разговор.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
