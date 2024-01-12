import { Color, PieceSymbol } from "chess.js";
import { twMerge } from "tailwind-merge";
type T_Props = {
  variant: "dark" | "light";
  children?: React.ReactNode;
  cellPeice: {
    color?: Color;
    type?: PieceSymbol;
  };
  highlightValid?: boolean;
  highlightSelected?: boolean;
  onClick?: () => void;
};

const BoardCell: React.FC<T_Props> = (props) => {
  return (
    <button
      className={`relative isolate w-[100px] text-black h-[100px] transition-all duration-150 grid place-items-center ${
        props.variant === "dark" ? "bg-darkSq" : "bg-lightSq"
      }`}
      onClick={props.onClick}
    >
      <div
        className={twMerge(
          "absolute -z-1 w-[50%] h-[50%] rounded-xl scale-0 transition-all duration-150",
          (props.highlightValid || props.highlightSelected) && "scale-1",
          props.highlightSelected && "bg-amber-500",
          props.highlightValid && "bg-amber-200"
        )}
      />
      {/* {props.cellPeice.color && props.cellPeice.type && (
        <img
          src={`/assets/sprites/${props.cellPeice.color}/${props.cellPeice.type}.svg`}
          className="relative w-[80%] h-[80%] z-2"
        />
      )} */}
      {props.children}
    </button>
  );
};

export default BoardCell;
