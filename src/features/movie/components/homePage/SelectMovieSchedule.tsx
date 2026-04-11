import TitleSection from "./cateroryCardList/TitleSection";
import { SystemLogo } from "./selectMovieSchedule/SystemLogo";

export default function SelectMovieSchedule({ status }: { status: string }) {
  return (
    <div className="relative w-full">
      <TitleSection status={status} />
      <SystemLogo />
    </div>
  );
}
