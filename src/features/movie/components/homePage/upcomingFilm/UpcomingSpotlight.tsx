import React, { useEffect, useMemo, useState } from "react";
import "./upcomingSpotlight.css";

const RELEASE_DATE = new Date("2026-08-20T19:00:00+07:00");
const BANNER =
  "https://touchcinema.com/storage/slider-app/1440wx600h-4-1674325136.jpg";

const pad = (n: number) => String(Math.max(0, n)).padStart(2, "0");

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor(diff / 3600000) % 24,
    m: Math.floor(diff / 60000) % 60,
    s: Math.floor(diff / 1000) % 60,
  };
}

const UpcomingSpotlight: React.FC = () => {
  const { d, h, m, s } = useCountdown(RELEASE_DATE);
  const units = useMemo(
    () => [
      { v: pad(d), label: "NGÀY" },
      { v: pad(h), label: "GIỜ" },
      { v: pad(m), label: "PHÚT" },
      { v: pad(s), label: "GIÂY" },
    ],
    [d, h, m, s],
  );

  return (
    <section className="ucs" aria-label="Phim sắp ra mắt nổi bật">
      <div className="ucs__frame">
        <img
          className="ucs__img"
          src={BANNER}
          alt="Poster phim Chị Chị Em Em 2"
          loading="lazy"
        />

        {/* Tấm kính mờ che chữ bên trái ảnh */}
        <div className="ucs__glass" aria-hidden />
        <div className="ucs__veil" aria-hidden />
        <div className="ucs__beam" aria-hidden />
        <div className="ucs__grain" aria-hidden />
        <div className="ucs__strip ucs__strip--top" aria-hidden />
        <div className="ucs__strip" aria-hidden />

        <div className="ucs__content">
          <p className="ucs__eyebrow">SIÊU PHẨM SẮP RA MẮT</p>

          <h3 className="ucs__name">
            Chị Chị <em>Em Em</em> <b className="ucs__num">2</b>
          </h3>

          <p className="ucs__tagline">
            Lấy cảm hứng từ giai thoại mỹ nhân Ba Trà &amp; Tư Nhị — cuộc đối
            đầu nhan sắc và quyền lực lộng lẫy bậc nhất Sài Gòn xưa, nay trở lại
            trên màn ảnh rộng.
          </p>

          <ul className="ucs__meta">
            <li className="ucs__chip ucs__chip--hot">★ HOT</li>
            <li className="ucs__chip">Tâm lý · Chính kịch</li>
            <li className="ucs__chip">T18</li>
            <li className="ucs__chip">ĐD Vũ Ngọc Đãng</li>
          </ul>

          <div className="ucs__countWrap">
            <span className="ucs__countLabel">Khởi chiếu sau</span>
            <div
              className="ucs__count"
              role="timer"
              aria-label="Đếm ngược đến ngày khởi chiếu"
            >
              {units.map((u, i) => (
                <React.Fragment key={u.label}>
                  {i > 0 && (
                    <span className="ucs__colon" aria-hidden>
                      :
                    </span>
                  )}
                  <div className="ucs__cell">
                    <b>{u.v}</b>
                    <span>{u.label}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="ucs__cta">
            <a className="ucs__buy" href="/booking/chi-chi-em-em-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1a2 2 0 0 0 0 4v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a2 2 0 0 0 0-4V9z" />
                <path d="M13 7v10" strokeDasharray="2 3" />
              </svg>
              Đặt vé ngay
            </a>
            <a className="ucs__detail" href="/movies/chi-chi-em-em-2">
              Chi tiết phim
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingSpotlight;
