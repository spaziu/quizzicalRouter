import React, { Suspense, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { useLoaderData, Form, NavLink, useActionData } from "react-router-dom";
import Question from "../common/Question";

export async function loader({ params, request }) {
  const param = new URL(request.url).searchParams;
  const choice = {
    category: param.get("category"),
    difficulty: param.get("difficulty"),
  };
  const category =
    choice.category !== "any" ? `&category=${choice.category}` : ``;

  try {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=5${category}&difficulty=${choice.difficulty}&type=multiple`
    );
    const data = await res.json();
    const quizz = data.results.map((e) => {
      return {
        ...e,
        answers: [...e.incorrect_answers, e.correct_answer].sort(
          () => Math.random() - 0.5
        ),
        isSubmited: false,
      };
    });
    localStorage.setItem("quizz", JSON.stringify(quizz));
    return quizz;
  } catch (error) {
    throw error;
  }
}

export async function action({ request, params }) {
  try {
    const formArr = Object.values(Object.fromEntries(await request.formData()));
    const score = await JSON.parse(localStorage.getItem("quizz")).reduce(
      (acc, { correct_answer }, i) => acc + (correct_answer === formArr[i]),
      0
    );
    let bestScore =
      localStorage.getItem("bestScore") ||
      (localStorage.setItem("bestScore", 0), 0);

    score > bestScore &&
      (localStorage.setItem("bestScore", score), (bestScore = score));

    return { score, bestScore };
  } catch (error) {
    throw error;
  }
}

// method get make app bugging

export default function Quizz() {
  const loaderData = useLoaderData();
  const actionData = useActionData();

  console.log(Boolean(actionData));

  function reset() {
    localStorage.setItem("bestScore", 0);
  }

  const Questions = loaderData.map((e) => {
    return <Question key={nanoid()} {...e} />;
  });

  return (
    <>
      <NavLink
        to="/"
        className="m-4 mb-auto flex items-center gap-1 self-start text-2xl font-medium hover:underline"
      >
        <img src="/home.svg" alt="home" width={23} />
        Home
      </NavLink>
      <Form
        method="POST"
        className=" mb-auto flex flex-col flex-wrap items-center text-center"
      >
        {Questions}

        <div className="flex flex-wrap items-center gap-x-4">
          <div className="flex flex-col">
            {actionData && (
              <p className="text-lg font-medium">Score: {actionData.score}/5</p>
            )}
            {actionData && (
              <p className="text-lg font-medium">
                Record:
                <span
                  onDoubleClick={reset}
                  title="Double click to reset"
                  className="inline-block cursor-pointer pl-1  "
                >
                  {actionData.bestScore}/5
                </span>
              </p>
            )}
          </div>
          {actionData ? (
            <button className="btn-primary my-4">Play Again</button>
          ) : (
            <button
              className="btn-primary mt-4 disabled:cursor-not-allowed disabled:hover:animate-forbidden disabled:hover:bg-[#c50000]"
              // disabled={!action}
              title={!actionData && "Quizz not completed"}
            >
              Check answers
            </button>
          )}
        </div>
      </Form>
    </>
  );
}
