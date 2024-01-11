import MenuCard from "./components/MenuCard";

const MainMenu = () => {
  return (
    <section className="h-full grid place-items-center ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <MenuCard
          btnHref="/local-mp"
          iconHref="https://source.unsplash.com/200x200"
          title="Local Multiplayer"
        />
        <MenuCard
          btnHref="/editor"
          iconHref="https://source.unsplash.com/200x200"
          title="Board Editor"
        />
        <MenuCard
          btnHref="/ai"
          iconHref="https://source.unsplash.com/200x200"
          title="AI GPT"
        />
        <MenuCard
          btnHref="/ai-stockfish"
          iconHref="https://source.unsplash.com/200x200"
          title="AI Stockfish"
        />
      </div>
    </section>
  );
};

export default MainMenu;
