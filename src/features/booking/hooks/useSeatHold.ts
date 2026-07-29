"use client";

import { useCallback, useEffect, useRef } from "react";
import { getCookie } from "cookies-next";
import { seatHoldService } from "../services/seatHold.service";
import { useGiuGhe } from "./useGiuGhe";
import { useNhaGhe } from "./useNhaGhe";

export const useSeatHold = (ma_lich_chieu?: number) => {
  const { mutateAsync: giuGheMutate } = useGiuGhe();
  const { mutate: nhaGheMutate } = useNhaGhe();

  const dangGiuRef = useRef<number[]>([]);

  const daTaoDonRef = useRef(false);

  const giuGhe = useCallback(
    async (ma_ghe: number): Promise<boolean> => {
      if (!ma_lich_chieu) return false;

      try {
        await giuGheMutate({ ma_lich_chieu, danh_sach_ghe: [ma_ghe] });

        if (!dangGiuRef.current.includes(ma_ghe)) {
          dangGiuRef.current = [...dangGiuRef.current, ma_ghe];
        }
        return true;
      } catch {
        return false;
      }
    },
    [ma_lich_chieu, giuGheMutate],
  );

  const nhaGhe = useCallback(
    (ma_ghe: number) => {
      if (!ma_lich_chieu || daTaoDonRef.current) return;

      dangGiuRef.current = dangGiuRef.current.filter((id) => id !== ma_ghe);
      nhaGheMutate({ ma_lich_chieu, danh_sach_ghe: [ma_ghe] });
    },
    [ma_lich_chieu, nhaGheMutate],
  );


  const khoiPhucGhe = useCallback((danhSachMaGhe: number[]) => {
    dangGiuRef.current = danhSachMaGhe;
  }, []);

  const danhDauDaTaoDon = useCallback(() => {
    daTaoDonRef.current = true;
    dangGiuRef.current = [];
  }, []);

  const resetSauKhiHuyDon = useCallback(() => {
    daTaoDonRef.current = false;
    dangGiuRef.current = [];
  }, []);

  useEffect(() => {
    if (!ma_lich_chieu) return;

    const nhaTatCaBangBeacon = () => {
      if (daTaoDonRef.current || dangGiuRef.current.length === 0) return;

      seatHoldService.nhaGheBeacon(
        { ma_lich_chieu, danh_sach_ghe: dangGiuRef.current },
        getCookie("accessToken") as string | undefined,
      );
    };

    const onPageHide = () => nhaTatCaBangBeacon();
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") nhaTatCaBangBeacon();
    };

    window.addEventListener("pagehide", onPageHide);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("pagehide", onPageHide);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [ma_lich_chieu]);

  useEffect(() => {
    if (!ma_lich_chieu) return;

    return () => {
      const danhSach = dangGiuRef.current;
      if (daTaoDonRef.current || danhSach.length === 0) return;

      dangGiuRef.current = [];
      void seatHoldService
        .nhaGhe({ ma_lich_chieu, danh_sach_ghe: danhSach })
        .catch(() => { });
    };
  }, [ma_lich_chieu]);

  return {
    giuGhe,
    nhaGhe,
    khoiPhucGhe,
    danhDauDaTaoDon,
    resetSauKhiHuyDon,
  };
};
