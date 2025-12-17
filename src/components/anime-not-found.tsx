import NoAnimeFound from "@/assets/not-found-4.gif";

const AnimeNotFound = () => {
  return (
    <div className="text-center text-2xl sm:text-3xl font-bold font-secondary flex flex-col gap-8 items-center mt-40 p-4">
      <div className="overflow-hidden shadow-lg ">
        <img src={NoAnimeFound} alt="No anime found" className="w-full" />
      </div>
      <p>No anime found</p>
    </div>
  );
};

export default AnimeNotFound;
