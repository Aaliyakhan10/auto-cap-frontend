import React from 'react'

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-bg  bg-opacity-40 flex flex-col items-center justify-center gap-2 text-primary z-50">
      <div className="w-12 h-12 rounded-full border-4 border-t-4 border-primary border-t-transparent animate-spin shadow-[0_0_10px_#B9375D]"></div>
      <p className="text-sm font-semibold animate-pulse mt-2">Generating magic...</p>
    </div>
  );
};




export default Loading