type T_Props = {
  variant: "dark" | "light";
};

const BoardCell: React.FC<T_Props> = (props) => {
  return (
    <button
      className={`w-[100px] h-[100px] transition-all duration-150 ${
        props.variant === "dark" ? "bg-darkSq" : "bg-lightSq"
      }`}
    />
  );
};

export default BoardCell;
