import { useContext } from 'react';
import { QuizLink } from '../components/MasterComponent';
import { quizDataContext } from '../App';

export default function HomePage() {
  const quizData = useContext(quizDataContext);
  const quizLinksArray = quizData.map((obj) => {
    return <QuizLink key={obj.id} {...obj} />;
  });

  return (
    <div className="mt-20 p-4 mb-20 md:mb-0 md:absolute md:left-1/2 md:top-1/2 md:mt-0 md:flex md:w-[90%] md:max-w-[900px] md:-translate-x-1/2 md:-translate-y-1/2 md:gap-4">
      <div className="md:basis-1/2">
        <h1 className="text-4xl font-light md:text-5xl md:leading-tight">
          Welcome to the most exciting{' '}
          <span className="font-semibold">Quiz!</span>
        </h1>
        <h4 className="mt-4 italic text-slate-400 md:text-lg">
          Pick a subject to get started.
        </h4>
      </div>
      <div className="mt-8 border-b-4 border-[#26303e] md:mt-0 md:max-h-[300px] md:grow md:overflow-auto">
        {quizLinksArray}
      </div>
    </div>
  );
}
