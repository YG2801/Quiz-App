import { Button } from './MasterComponent';

export default function QuizCompletedComponent({
  score,
  title,
  image,
  size,
  handlePlayAgain,
}) {
  return (
    <div className="mt-12">
      <h1 className="text-4xl font-light">
        Quiz Completed <span className="font-semibold">You scored...</span>
      </h1>
      <div className="mt-8 rounded-md bg-[#3c4d67] p-6">
        <div className="flex items-center justify-center gap-3">
          <div className="size-10">
            <img src={image} alt="" className="size-full object-cover" />
          </div>
          <p
            className="font-semibold"
            dangerouslySetInnerHTML={{ __html: title }}
          ></p>
        </div>
        <h1 className="mt-4 text-center text-7xl font-semibold">{score}</h1>
        <h4 className="mt-2 text-center font-semibold text-slate-400">
          out of {size}
        </h4>
      </div>
      <Button extraStyle="md:mt-8" handleClick={handlePlayAgain}>
        Play Again
      </Button>
    </div>
  );
}
