import { Oswald } from "next/font/google";

const appFont = Oswald({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const bebas = appFont;
export const oswald = appFont;
