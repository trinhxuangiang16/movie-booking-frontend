import { TMovie } from "../../types/typeMovie";
import TitleSection from "./cateroryCardList/TitleSection";
import { SystemLogo } from "./selectMovieSchedule/SystemLogo";

export default function SelectMovieSchedule({ status }: { status: string }) {
  const noneData: TMovie[] = [];
  return (
    <div id="lich-chieu-phim" className="relative w-full scroll-mt-24">
      <TitleSection status={status} movies={noneData} />
      <SystemLogo />
    </div>
  );
}
