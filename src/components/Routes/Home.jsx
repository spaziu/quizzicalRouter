import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Quizzical() {
  const [data, setData] = useState({ category: 23, difficulty: "medium" });

  function handleChange(event) {
    setData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  return (
    <>
      <h1 className="text-5xl font-medium">Quizzical</h1>
      <p className="f my-2 mb-3 text-lg">
        Boost your knowledge with endless fun!
      </p>
      <fieldset className=" flex flex-col justify-center rounded-md border-2  border-[#293264] p-3 pt-1">
        <div className=" text-centerex flex  flex-col">
          <label
            htmlFor="category"
            className=" text-center font-semibold underline"
          >
            Category:
          </label>
          <select
            name="category"
            id="category"
            className="mt-2  rounded-lg border-2 border-[#293264] bg-[#F5F7FB]  text-center"
            onChange={handleChange}
            defaultValue="23"
          >
            <option value="any">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Books</option>
            <option value="11">Film</option>
            <option value="12">Music</option>
            <option value="13">Musicals</option>
            <option value="14">Television</option>
            <option value="15">Video Games</option>
            <option value="16">Board Games</option>
            <option value="17">Science &amp; Nature</option>
            <option value="18">Computers</option>
            <option value="19">Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Comics</option>
            <option value="30">Gadgets</option>
            <option value="31">Anime </option>
            <option value="32">Cartoon</option>
          </select>
        </div>
        <div className=" flex flex-col text-center">
          <label htmlFor="difficulty" className="mt-2 font-semibold underline">
            Difficulty:
          </label>
          <select
            name="difficulty"
            id="difficulty"
            className=" mt-2   rounded-lg border-2 border-[#293264] bg-[#F5F7FB] text-center"
            onChange={handleChange}
            defaultValue="medium"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </fieldset>
      <NavLink
        className="btn-primary mt-5"
        to={`/quizz?category=${data.category}&difficulty=${data.difficulty}`}
      >
        Launch Game
      </NavLink>
    </>
  );
}
