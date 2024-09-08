import { useEffect, useState, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Confetti from 'react-confetti';
import {
  ProgressBar,
  Option,
  Button,
  ErrorBox,
  QuizCompletedComponent,
  Loader,
} from '../components/MasterComponent';
import { quizDataContext } from '../App';

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [error, setError] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const quizId = searchParams.get('id');

  const [quizData, setQuizData] = useState([]);
  const [randomIndex, setRandomIndex] = useState(generateRandomIndex());
  const [loading, setLoading] = useState(true);

  function generateRandomIndex() {
    return Math.floor(Math.random() * 4);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=10&type=multiple&difficulty=easy&category=${quizId}`
        );
        if (!response.ok) throw new Error('Failed to fetch data');
        const dt = await response.json();
        setQuizData(dt.results);
        console.log(dt.results[0].question);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [searchParams, quizId]);

  const decodeHtmlEntities = (text) => {
    const parser = new DOMParser();
    const decodedString = parser.parseFromString(text, 'text/html').body
      .textContent;
    return decodedString;
  };

  const title =
    quizData.length > 0
      ? decodeHtmlEntities(quizData[currentQuestion - 1].category)
      : '';
  const image = useContext(quizDataContext).find(
    (obj) => obj.id == quizId
  ).image;

  function generateOptions() {
    const incorrectAnswers = quizData[currentQuestion - 1].incorrect_answers;
    const correctAnswer = quizData[currentQuestion - 1].correct_answer;
    const options = incorrectAnswers
      .slice(0, randomIndex)
      .concat([correctAnswer, ...incorrectAnswers.slice(randomIndex)]);
    let optionNumber = 0;
    return options.map((option, index) => {
      return (
        <Option
          key={index}
          optionNumber={String.fromCharCode(65 + optionNumber++)}
          isSelected={selectedOption === option ? true : false}
          setSelectedOption={setSelectedOption}
          isCorrectAnswer={correctAnswer === option ? true : false}
          showAnswer={showAnswer}
        >
          {decodeHtmlEntities(option)}
        </Option>
      );
    });
  }

  const optionElements = quizData.length > 0 ? generateOptions() : [];

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function handleSubmit() {
    if (selectedOption === null) {
      setError(true);
      return;
    }
    setShowAnswer(true);
    await delay(2000);
    if (selectedOption === quizData[currentQuestion - 1].correct_answer) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    setShowAnswer(false);
    if (currentQuestion === 10) {
      setQuizCompleted(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setRandomIndex(generateRandomIndex());
    }
  }

  const navigate = useNavigate();
  function handlePlayAgain() {
    navigate('/');
  }
  if (loading) return <Loader />;
  if (quizData.length === 0)
    return (
      <div className="flex flex-col h-screen justify-center items-center text-lg font-medium px-4 text-center">
        <p>Failed to fetch data</p>
        <p>Please retry</p>
      </div>
    );

  return (
    <>
      {error && <ErrorBox setError={setError} />}
      {score === 10 && <Confetti />}
      <div className="px-4 py-3 md:absolute md:left-1/2 md:top-1/2 md:w-[90%] md:max-w-[900px] md:-translate-x-1/2 md:-translate-y-1/2">
        <div className="flex items-center gap-4">
          <div className="size-10">
            <img src={image} alt="" className="size-full object-cover" />
          </div>
          <p className="font-semibold md:text-xl">{title}</p>
        </div>
        {quizCompleted ? (
          <QuizCompletedComponent
            score={score}
            title={title}
            image={image}
            size={10}
            handlePlayAgain={handlePlayAgain}
          />
        ) : (
          <div className="mt-12 md:flex md:gap-12">
            <div className="md:shrink-0 md:basis-1/2">
              <div>
                <p className="italic text-slate-400 md:text-lg">
                  Question {currentQuestion} of {10}
                </p>
              </div>
              <div id="question" className="mt-4">
                <p className="text-lg md:text-2xl md:font-semibold">
                  {decodeHtmlEntities(quizData[currentQuestion - 1].question)}
                </p>
              </div>
              <ProgressBar currWidth={currentQuestion} />
            </div>
            <div className="mt-8 md:mt-0 md:basis-1/2">
              {optionElements}
              <Button
                disabled={showAnswer ? true : false}
                handleClick={handleSubmit}
              >
                Submit answer
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
