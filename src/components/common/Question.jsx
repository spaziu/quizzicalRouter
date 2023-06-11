import { nanoid } from "nanoid";
import { decode } from "html-entities";
import React from "react";

export default function Question(props) {
  const red = {
    backgroundColor: "#c50000",
    border: "2px solid #c50000",
    color: "white",
  };
  const green = {
    backgroundColor: "#6bba62",
    border: "2px solid #6bba62",
    color: "white",
  };
  // for tailwind
  const colorVariants = {
    red: "bg-red-600 border-2 border-red-600 text-white",
    green: "bg-green-600 border-2 border-green-600 text-white",
  };

  const displayAnwsers = props.answers.map((e) => (
    <span key={nanoid()}>
      <input
        onChange={props.onChange}
        name={props.question}
        id={e}
        type="radio"
        value={e}
        checked={props.answersSelected === e}
        required
        disabled={props.isSubmited}
        className="peer hidden"
      />
      <label
        htmlFor={e}
        style={
          props.isSubmited && e === props.correct_answer
            ? green
            : props.isSubmited && e === props.answersSelected
            ? red
            : null
        }
        disabled={props.isSubmited}
        className=" mx-2  mb-2 mt-1 inline-block cursor-pointer rounded-md border-2 border-solid border-[#4D5B9E] px-2 py-1 font-normal text-[#293264] hover:border-[#D6DBF5] hover:bg-[#D6DBF5] peer-checked:border-[#D6DBF5] peer-checked:bg-[#D6DBF5] peer-disabled:cursor-not-allowed peer-disabled:border-slate-400 peer-disabled:bg-transparent peer-disabled:text-slate-400  "
      >
        {decode(e)}
      </label>
    </span>
  ));

  return (
    <div className=" mb-2 mt-1 w-10/12 border-b-[1px] border-[#DBDEF0]">
      <h2 className="mb-1 mt-2 text-2xl font-medium">
        {decode(props.question)}
      </h2>
      <div className="my-3">{displayAnwsers}</div>
    </div>
  );
}
