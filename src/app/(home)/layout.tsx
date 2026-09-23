import { Baloo_2, Caveat, Figtree } from "next/font/google";
import "./p2.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function HomeLayout({ children }: LayoutProps<"/">) {
  return (
    <div
      className={`p2 ${baloo.variable} ${caveat.variable} ${figtree.variable} flex-1`}
    >
      {children}
    </div>
  );
}
