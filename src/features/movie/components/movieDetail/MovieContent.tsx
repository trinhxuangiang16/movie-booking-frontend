import { FaStar } from "react-icons/fa";
import { TMovie } from "../../types/typeMovie";
import TrailerPlayer from "../homePage/TrailerPlayer";
import { oswald } from "@/lib/fonts";

export default function MovieContent({ movie }: { movie: TMovie }) {
  return (
    <div
      className={`mt-55 px-20 w-full [text-shadow:0_2px_4px_#000000d9] ${oswald.className}`}
    >
      <div className="flex gap-10 ">
        <div className="w-2/5">
          <h2 className="text-2xl text-white font-bold mb-4 uppercase">
            Trailer Phim
          </h2>
          <TrailerPlayer videoId={movie?.trailer} title="trailer-detail" />
        </div>

        <div className="movie-detail-content w-3/5">
          <>
            <h2 className="text-2xl text-white font-bold mb-4 uppercase">
              Nội dung phim
            </h2>
            <p className="text-white text-lg text-justify font-light">
              {movie?.mo_ta}
            </p>
          </>

          <h2 className="text-2xl text-white font-bold uppercase mt-2">
            Trạng thái:{" "}
            {movie?.hot
              ? " HOT"
              : movie?.dang_chieu
                ? " Đang chiếu"
                : movie?.sap_chieu
                  ? " Sắp chiếu"
                  : ""}
          </h2>
          <h2 className="text-2xl text-white font-bold mb-4 uppercase mt-2">
            Đánh giá: {movie?.danh_gia || 0}
            {"  "}
            <FaStar className="inline text-[#ffe869] mt-[-8px]" />
          </h2>
        </div>
      </div>
    </div>
  );
}
