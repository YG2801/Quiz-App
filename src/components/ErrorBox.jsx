import { useEffect } from 'react';

export default function ErrorBox({ setError }) {
  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 2000);
  }, []);
  return (
    <div className="animate-error-box fixed -right-full top-4 w-[250px] rounded-md border-b-4 border-red-500  bg-white px-4 py-3 text-black">
      <p className="font-semibold">Please select an Option</p>
    </div>
  );
}
