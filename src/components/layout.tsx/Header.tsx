import Link from "next/link";
import "./layout.css";
import { bebas } from "@/lib";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();

  const isMovieDetail = pathname.startsWith("/movie/movie-detail/");
  return (
    <div
      className={`header absolute top-0 w-full z-50 ${!isMovieDetail ? "bg-white/5 backdrop-blur-md border-b border-white/10" : "bg-[#0c1137] bg-[url('http://www.transparenttextures.com/patterns/batthern.png')]"}`}
    >
      <Link href={"/"} className="logo">
        <p className={`${bebas.className}`}>Movi</p>{" "}
        <div className={`${bebas.className} logo-e`}>.E</div>
      </Link>
      <div className={`nav ${bebas.className}`}>
        <Link href="/">Home</Link>
        <Link href="/services">Theaters</Link>
        <Link href="/login">Login</Link>
        <Link href="/sign-up">Sign Up</Link>
        <Link href="#">Log Out</Link>
      </div>
    </div>
  );
}

export default Header;
