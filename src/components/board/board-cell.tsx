import { Color, PieceSymbol } from "chess.js";

type T_Props = {
  variant: "dark" | "light";
  children?: React.ReactNode;
  cellPeice: {
    color?: Color;
    type?: PieceSymbol;
  };
};

const BoardCell: React.FC<T_Props> = (props) => {
  return (
    <button
      className={`w-[100px] text-black h-[100px] transition-all duration-150 grid place-items-center ${
        props.variant === "dark" ? "bg-darkSq" : "bg-lightSq"
      }`}
    >
      {props.cellPeice.color && props.cellPeice.type && (
        <img
          src={`/assets/sprites/${props.cellPeice.color}/${props.cellPeice.type}.svg`}
          className="w-[80%] h-[80%]"
        />
      )}
    </button>
  );
};

export default BoardCell;
