const Loader = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4 px-6 text-center">
        <div className="h-12 w-12 sm:h-16 sm:w-16 animate-spin rounded-full border-4 border-gray-800 border-t-red-600 shadow-lg"></div>
        <p className="text-sm sm:text-base font-medium text-gray-300 tracking-wider">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;
