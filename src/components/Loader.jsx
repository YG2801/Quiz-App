import React from 'react';
import { HashLoader } from 'react-spinners';

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <HashLoader color="#FFF" size={80} />
    </div>
  );
}

export default Loader;
