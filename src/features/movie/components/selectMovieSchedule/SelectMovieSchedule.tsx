import TitleSection from "../cateroryCardList/TitleSection";

export default function SelectMovieSchedule({ status }: { status: string }) {
  return (
    <div>
      <TitleSection status={status} />
    </div>
  );
}
