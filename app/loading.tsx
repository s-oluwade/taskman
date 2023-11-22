'use client';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-slate-800 bg-opacity-90 transition-opacity duration-300 opacity-100'>
      <div className='border-8 border-solid border-gray-300 border-t-green-700 rounded-full w-16 h-16 animate-spin'></div>
    </div>
  );
}
