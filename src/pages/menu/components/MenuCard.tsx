import React from "react";
import { Link } from "react-router-dom";

type T_ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  title: string;
  iconHref: string;
  btnHref: string;
};

const MenuCard: React.FC<T_ButtonProps> = (props) => {
  return (
    <Link to={props.btnHref}>
      <button
        {...props}
        className="w-[350px] h-[250px] p-10 text-left flex items-center border rounded-xl text-5xl font-extrabold hover:bg-red-300 transition-all"
      >
        {props.title}
      </button>
    </Link>
  );
};

export default MenuCard;
