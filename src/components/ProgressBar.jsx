export default function ProgressBar({ currWidth }) {
  return (
    <div className="mt-4 w-full rounded-full bg-[#3c4d67] p-1 md:mt-8">
      <div
        className="rounded-full bg-[#a52af5] p-1 transition-all duration-500"
        style={{ width: `${(currWidth / 10) * 100}%` }}
      ></div>
    </div>
  );
}
