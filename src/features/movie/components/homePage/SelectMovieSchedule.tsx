import { TMovie } from "../../types/typeMovie";
import TitleSection from "./cateroryCardList/TitleSection";
import { SystemLogo } from "./selectMovieSchedule/SystemLogo";

export default function SelectMovieSchedule({ status }: { status: string }) {
  const noneData: TMovie[] = [];
  return (
    <div className="relative w-full">
      <TitleSection status={status} movies={noneData} />
      <SystemLogo />
    </div>
  );
}
