# Movie Booking Frontend

A modern movie ticket booking web application built with Next.js, React, TypeScript, and Tailwind CSS.

## Live Application

URL: https://movie.trinhxuangiang.me

![Application Demo](./public/demo.gif)

## Test Credentials

Regular User 1:
- Email: test1@gmail.com
- Password: 123456

Regular User 2:
- Email: test2@gmail.com
- Password: 123456

Admin Account:
- Email: ad@gmail.com
- Password: 123456

## Feature Overview

### 1. User Authentication & Profile
- Account registration, login, and automatic JWT token refresh.
- Profile management with personal detail updates.
- Role-based routing for regular users and administrators.

### 2. Movie Exploration & Search
- Featured movie banners with interactive carousel.
- Categorized movie lists for Now Showing and Coming Soon.
- Detailed movie pages with trailer video player, rating, duration, and genre tags.
- Quick movie search by title.

### 3. Cinema Systems & Showtimes
- Browse by cinema systems (BHD, CGV, Galaxy, etc.) and cinema clusters.
- Filter showtimes by date and location.
- Direct navigation to real-time seat booking.

### 4. Interactive Booking Engine
- Dynamic seat layout matrix with real-time seat status (Available, Selected, Reserved).
- Temporary seat hold timer to prevent concurrent booking conflicts.
- Food & Beverage combo selection.

### 5. Checkout & Digital Tickets
- Order summary and payment flow.
- Digital ticket generation with embedded QR codes.
- Export or download ticket as image for offline access.

### 6. Booking History
- Comprehensive order history viewing past and upcoming bookings with ticket status.

## Engineering Highlights

- Automatic Token Silent Refresh: Implemented custom Axios interceptors handling transparent 401 token refresh queue management using cookies-next.
- Dynamic Data Caching: Leveraged TanStack React Query v5 for server-state caching, background revalidation, and optimistic UI updates during seat holding.
- Form Validation Architecture: Built type-safe forms with React Hook Form integrated with Zod validation schemas (@hookform/resolvers).
- Digital Ticket Rendering: Client-side QR Code rendering (qrcode.react) paired with html-to-image DOM screenshot capabilities for saving mobile tickets.

## Tech Stack

- Framework: Next.js 16 (App Router), React 19
- Language: TypeScript
- Styling: Tailwind CSS v4, Shadcn UI, Radix UI
- State & Data Fetching: TanStack React Query v5, Axios
- Utilities: Cookies-next, Lucide React, Sonner, Recharts, QR Code React, HTML-to-Image

## Local Development Setup

Prerequisites:
- Node.js 18 or higher
- npm, pnpm, or yarn

Steps:

1. Install dependencies:
   npm install

2. Create a .env.local file in the root directory:
   NEXT_PUBLIC_API_URL=https://api-movie.trinhxuangiang.me

3. Start the development server:
   npm run dev

4. Open http://localhost:3000 in your browser.

## Scripts

- npm run dev: Start development server
- npm run build: Build application for production
- npm run start: Start production server
- npm run lint: Run ESLint checks

## Author

- Name: Trinh Xuan Giang
- Email: trinhgiang.dev16@gmail.com
- GitHub: https://github.com/trinhxuangiang16
