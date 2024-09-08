import { createContext } from 'react';
import { Outlet } from 'react-router-dom';
import categories from '../data';

const quizDataContext = createContext();

export default function App() {
  return (
    <quizDataContext.Provider value={categories}>
      <main className="font-Rubik relative min-h-screen overflow-hidden">
        <div className="absolute right-10 top-0 -z-10 size-[700px] rounded-full border-[100px] border-[#26303e] md:-left-1/4 md:-top-1/2"></div>
        <div className="invisible absolute right-10 top-0 -z-10  size-[700px] rounded-full border-[100px] border-[#26303e] md:visible md:-right-1/3 md:top-2/3"></div>
        <Outlet />
      </main>
    </quizDataContext.Provider>
  );
}

export { quizDataContext };
