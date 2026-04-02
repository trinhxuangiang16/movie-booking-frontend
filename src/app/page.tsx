"use client";
import Banner from "@/components/layout.tsx/Banner";

import { useState } from "react";
import ModalTopHot from "@/features/movie/index";
import { THotMovie } from "@/features/movie/types/typeHotMovie";

export default function HomePage() {
  return (
    <div className="bg-[#0c1137] h-[4000px] bg-[url('http://www.transparenttextures.com/patterns/black-linen.png')]">
      <Banner />
    </div>
  );
}
