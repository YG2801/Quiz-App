export default function Option({
  optionNumber,
  isSelected,
  setSelectedOption,
  isCorrectAnswer,
  showAnswer,
  children: optionText,
}) {
  const innerStyle = `${isCorrectAnswer ? 'bg-green-400' : 'bg-red-400'}`;
  return (
    <div
      className={`mb-2 flex cursor-pointer items-center gap-4 rounded-lg p-2 transition-all ${isSelected ? 'bg-[#62748f]' : showAnswer ? 'bg-[#3c4d67]' : 'bg-[#3c4d67] hover:scale-105 hover:bg-[#4a596f]'}`}
      onClick={() => {
        if (!showAnswer) {
          setSelectedOption(optionText);
        }
      }}
    >
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-lg text-xl text-black ${showAnswer ? innerStyle : 'bg-white'}`}
      >
        {optionNumber}
      </div>
      <p dangerouslySetInnerHTML={{ __html: optionText }}></p>
    </div>
  );
}
