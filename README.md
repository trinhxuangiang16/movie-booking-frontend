# Movie Booking Frontend (WIP)

Frontend web app cho hệ thống đặt vé xem phim. Dự án sử dụng **backend Movie Booking do mình tự xây dựng** (repo backend riêng). Hiện UI/UX đã hoàn thiện khá nhiều; một số flow booking/checkout vẫn đang phát triển.

## Live Demo

- https://movie-booking-app-pearl.vercel.app

## Tech Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **TailwindCSS v4** + animations (`tailwindcss-animate`, `tw-animate-css`)
- **UI components**: shadcn/ui (via `components.json`), Radix UI, lucide-react
- **Data fetching / Server state**: TanStack React Query + Axios
- **Forms & Validation**: React Hook Form + Zod (+ resolvers)
- **Charts**: Recharts
- **Media/UX**: Swiper, Embla Carousel, react-youtube
- **Theme**: next-themes
- **Tooling**: ESLint

## Implemented Features

- **Home page**
  - Banner
  - Movie lists theo topic (hot / upcoming / showing)
  - Trailer player (YouTube)
  - Biểu đồ/section highlight (chart/top hot)
  - Chọn lịch chiếu (UI)
- **Movies**
  - Fetch danh sách phim theo nhóm/trạng thái (React Query hooks)
  - Movie detail module (đã có structure route/components)
- **Auth**
  - Login page & auth feature structure (hooks/services/types)

## Pending (Not finished yet)

- Seat selection (chọn ghế)
- Booking / đặt vé
- Checkout & tính tiền
- Payment flow (nếu có)
- Order history / ticket history (nếu có)
- Admin management (nếu có)

## Architecture (high level)

- `src/app/*`: pages/routes theo Next.js App Router (`/`, `/login`, `/movie/...`)
- `src/features/*`: chia theo domain (auth, movie) gồm `hooks`, `services`, `types`, `components`
- `src/providers/*`: providers (React Query, theme, v.v.)
- `src/schemas/*`: validate schema bằng Zod
- `src/types/*`: shared types

## Notes

- Dự án đang trong giai đoạn hoàn thiện booking flow; repo tập trung showcase **UI/UX + TypeScript structure + data fetching patterns**.
