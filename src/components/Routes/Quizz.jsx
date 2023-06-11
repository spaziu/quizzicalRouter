import React, { Suspense, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { useLoaderData, Form, NavLink } from "react-router-dom";
import Question from "../common/Question";

export async function loader({ params, request }) {
  const param = new URL(request.url).searchParams;
  return {
    category: param.get("category"),
    difficulty: param.get("difficulty"),
  };
}
export async function action({ request, params }) {
  const form = Object.fromEntries(await request.formData());
  console.log(form);
  return null;
}

// method get make app bugging

export default function Quizz() {
  const quizz = useLoaderData();
  const [data, setData] = useState([]);
  const [bestScore, setBestScore] = useState(
    localStorage.getItem("bestScore") || localStorage.setItem("bestScore", 0)
  );
  const [score, setScore] = useState(0);
  const [incomplete, setIncomplete] = useState(true);

  useEffect(fetchQuizz, []);

  function fetchQuizz() {
    setScore(0);
    const params = {
      category: quizz.category !== "any" ? `&category=${quizz.category}` : ``,
      difficulty:
        quizz.difficulty !== "any" ? `&difficulty=${quizz.difficulty}` : ``,
    };

    fetch(
      `https://opentdb.com/api.php?amount=5${params.category}${params.difficulty}&type=multiple`
    )
      .then((r) => r.json())
      .then((d) =>
        setData(
          d.results.map((e) => {
            return {
              ...e,
              answers: [...e.incorrect_answers, e.correct_answer].sort(
                () => Math.random() - 0.5
              ),
              answersSelected: "",
              isSubmited: false,
            };
          })
        )
      )

      .catch((err) => console.log(err));
  }

  function handleChange(event) {
    !data[0].isSubmited &&
      setData((prev) => {
        return prev.map((e) =>
          e.question === event.target.name
            ? { ...e, answersSelected: event.target.value }
            : { ...e }
        );
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setScore(0);
    setData((prev) => {
      return prev.map((e) => {
        return {
          ...e,
          isSubmited: true,
        };
      });
    });
    data.map(
      (e) =>
        e.answersSelected === e.correct_answer && setScore((prev) => prev + 1)
    );
  }

  function reset() {
    localStorage.setItem("bestScore", 0);
    setScore(0);
    setBestScore(0);
    fetchQuizz();
  }

  useEffect(() => {
    score > bestScore &&
      (setBestScore(score), localStorage.setItem("bestScore", score));
  }, [score]);

  useEffect(() => {
    data?.filter((e) => {
      return e.answersSelected.length === 0;
    }).length === 0
      ? setIncomplete(false)
      : setIncomplete(true);
  }, [data]);

  const Questions = data.map((e) => {
    return (
      <Question key={nanoid()} {...e} onChange={() => handleChange(event)} />
    );
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
        method="post"
        onSubmit={handleSubmit}
        className=" mb-auto flex flex-col flex-wrap items-center text-center"
      >
        {Questions}
        <div className="flex flex-wrap items-center gap-x-4">
          <div className="flex flex-col">
            {data[0]?.isSubmited && (
              <p className="text-lg font-medium">Score: {score}/5</p>
            )}
            {data[0]?.isSubmited && (
              <p className="text-lg font-medium">
                Record:
                <span
                  onDoubleClick={reset}
                  title="Double click to reset"
                  className="inline-block cursor-pointer pl-1  "
                >
                  {bestScore}/5
                </span>
              </p>
            )}
          </div>
          {data[0]?.isSubmited ? (
            <button
              type="button"
              onClick={fetchQuizz}
              className="btn-primary my-4"
            >
              Play Again
            </button>
          ) : (
            <button
              className="btn-primary mt-4 disabled:cursor-not-allowed disabled:hover:animate-forbidden disabled:hover:bg-[#c50000]"
              disabled={incomplete}
              title={incomplete && "Quizz not completed"}
            >
              Check answers
            </button>
          )}
        </div>
      </Form>
    </>
  );
}
