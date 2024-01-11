type T_Props = {
  variant: "dark" | "light";
};
const PlayerToolbar: React.FC<T_Props> = (props) => {
  return (
    <div className="w-full p-6 bg-neutral-800 rounded-lg flex justify-between items-center">
      <div>Player Name</div>
      <div className="border-2 px-4 py-2 rounded-lg text-xl font-extrabold">
        10:00
      </div>
    </div>
  );
};

export default PlayerToolbar;
