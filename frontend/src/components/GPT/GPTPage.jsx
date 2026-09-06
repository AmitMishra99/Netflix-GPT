import GPTSearch from "./GPTSearch";

const GPTPage = () => {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black pointer-events-none -z-10"></div>
      <GPTSearch />
    </div>
  );
};

export default GPTPage;
