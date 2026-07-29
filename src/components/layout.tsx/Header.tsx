"use client";

import Link from "next/link";
import "./layout.css";
import { bebas } from "@/lib";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { deleteCookie } from "cookies-next";
import { FiUser, FiChevronDown, FiLogOut } from "react-icons/fi";

const MOVIE_SECTIONS = [
  { label: "Phim hot", hash: "phim-hot" },
  { label: "Phim đang chiếu", hash: "phim-dang-chieu" },
  { label: "Phim sắp chiếu", hash: "phim-sap-chieu" },
];

const ACCOUNT_LINKS = [
  { label: "Tài khoản", href: "/account" },
  { label: "Lịch sử mua vé", href: "/history" },
  { label: "Yêu cầu hỗ trợ", href: "/support" },
];

function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const isMovieDetail = pathname.startsWith("/movie/movie-detail/");
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  const [openMenu, setOpenMenu] = useState<"movie" | "account" | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEmail(localStorage.getItem("userEmail"));
  }, []);

  useEffect(() => {
    if (!openMenu) return;

    const onPointerDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openMenu]);

  const handleLogout = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    deleteCookie("user");
    localStorage.removeItem("userEmail");
    setOpenMenu(null);
    router.push("/login");
  };

  const goToSection = (hash: string) => {
    setOpenMenu(null);
    if (pathname === "/") {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${hash}`);
    }
  };

  if (isAuthPage) return null;

  const userName = email?.split("@")[0] ?? "Tài khoản";

  return (
    <div
      className={`header absolute top-0 w-full z-50 ${!isMovieDetail ? "bg-white/5 backdrop-blur-md border-b border-white/10" : "bg-[#0c1137] bg-[url('http://www.transparenttextures.com/patterns/batthern.png')]"}`}
    >
      <Link href={"/"} className="logo">
        <p className={`${bebas.className}`}>Movi</p>{" "}
        <div className={`${bebas.className} logo-e`}>.E</div>
      </Link>

      <div ref={navRef} className={`nav ${bebas.className}`}>
        <Link href="/">Trang chủ</Link>

        <div className="nav-item">
          <button
            type="button"
            className="nav-trigger"
            aria-haspopup="true"
            aria-expanded={openMenu === "movie"}
            onClick={() => setOpenMenu((p) => (p === "movie" ? null : "movie"))}
          >
            Phim
            <FiChevronDown
              className={`nav-caret ${openMenu === "movie" ? "is-open" : ""}`}
            />
          </button>

          {openMenu === "movie" && (
            <div className="nav-dropdown" role="menu">
              {MOVIE_SECTIONS.map((item) => (
                <button
                  key={item.hash}
                  type="button"
                  role="menuitem"
                  className="nav-dropdown-item"
                  onClick={() => goToSection(item.hash)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className="nav-trigger"
          onClick={() => goToSection("lich-chieu-phim")}
        >
          Lịch chiếu phim
        </button>

        <div className="nav-item">
          <button
            type="button"
            className="nav-trigger nav-user"
            aria-haspopup="true"
            aria-expanded={openMenu === "account"}
            onClick={() =>
              setOpenMenu((p) => (p === "account" ? null : "account"))
            }
          >
            <FiUser className="nav-user-icon" />
            <span className="nav-user-name">{userName}</span>
            <FiChevronDown
              className={`nav-caret ${openMenu === "account" ? "is-open" : ""}`}
            />
          </button>

          {openMenu === "account" && (
            <div className="nav-dropdown nav-dropdown--right" role="menu">
              {email && <p className="nav-dropdown-email">{email}</p>}

              {ACCOUNT_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  className="nav-dropdown-item"
                  onClick={() => setOpenMenu(null)}
                >
                  {item.label}
                </Link>
              ))}

              <button
                type="button"
                role="menuitem"
                className="nav-dropdown-item nav-dropdown-logout"
                onClick={handleLogout}
              >
                <FiLogOut />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
