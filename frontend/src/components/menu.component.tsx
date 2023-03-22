import React, { FormEventHandler, Suspense, useEffect, useState } from "react";
import { ChatBoxComponent } from "./chat-box.component";
import { classNames } from "../utils/classnames.util";
import { AiOutlineSend, IoSend } from "react-icons/all";
import { useGetQuestions } from "../hooks/questions.hook";
import { useCreateUser, useGetMajor } from "../hooks/user.hook";
import { UserSchema } from "../schema/user.schema";
import toast from "react-hot-toast";
import { useCreateResponse } from "../hooks/response.hook";
import { MagicalText } from "./magic.component";
import { colors } from "../data/colors";

export function MenuComponent() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showPattern, setShowPattern] = useState(false);
  const [showMenuItems, setShowMenuItems] = useState(-1);
  const [clicked, setClicked] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [arrowHovered, setArrowHovered] = useState<boolean>(false);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [user, setUser] = useState<UserSchema | undefined>();
  const [answer, setAnswer] = useState<string>("");
  const [end, setEnd] = useState(false);
  const [themeColor, setThemeColor] = useState("gray");

  const { data: questions, isFetching, isLoading, isError } = useGetQuestions();
  const major = useGetMajor(end, user?.id);
  const { mutate: createUserFn, isError: createUserError } = useCreateUser({
    onSuccess: (data) => {
      setUser(data as UserSchema);
    },
  });
  const {
    mutate: createResponseFn,
    isError: createResponseError,
    isLoading: creatingResponse,
  } = useCreateResponse({
    onSuccess: () => {
      if (questions && questionNumber < questions.length - 1) {
        setQuestionNumber(questionNumber + 1);
        setAnswer("");
      } else {
        setEnd(true);
        setAnswer("");
      }
    },
  });

  const handleMouseOver = (index: number) => {
    if (!clicked) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPattern(true);
    }, 100);

    const timer2 = setTimeout(() => {
      setShowMenuItems(0);
    }, 400);

    const timer3 = setTimeout(() => {
      setShowMenuItems(1);
    }, 800);

    const timer4 = setTimeout(() => {
      setShowMenuItems(2);
    }, 1200);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  useEffect(() => {
    if (clicked) {
      setActiveIndex(-1);
      const timer = setTimeout(() => {
        setShowInput(true);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [clicked]);

  useEffect(() => {
    if (!user) {
      createUserFn();
    }
  }, []);

  if (createUserError) {
    toast.error("Couldn't create a user try again later");
  }

  const submitHandler = (e: FormEventHandler<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    createResponseFn({
      user: user?.id,
      question: questions && questions[questionNumber].id,
      text: answer,
    });
  };

  const disabled =
    !user || !questions || questions.length === 0 || creatingResponse;

  useEffect(() => {
    if (activeIndex === 0) {
      setThemeColor(colors[5]);
    } else if (activeIndex === 1) {
      setThemeColor(colors[3]);
    } else if (activeIndex === 2) {
      setThemeColor(colors[2]);
    } else if (activeIndex === -1) {
      setThemeColor("gray");
    }
  }, [activeIndex, themeColor]);

  return (
    <div id="menu">
      <div
        id="menu-items"
        className={classNames(
          clicked && "animate-fade transform -translate-x-[200%]"
        )}
      >
        <button
          className={classNames(
            "menu-item",
            showMenuItems >= 0 && "opacity-100",
            activeIndex === 0 ? "active" : "",
            "transition-transform duration-300 ease-in-out transform translate-y-0 delay-1000 opacity-0"
          )}
          onMouseOver={() => handleMouseOver(0)}
          onMouseLeave={() => handleMouseOver(-1)}
          onClick={() => {
            if (!disabled) {
              setClicked(true);
            }
          }}
          disabled={disabled}
        >
          High school Student
        </button>
        <button
          className={classNames(
            "menu-item",
            activeIndex === 1 && "active ",
            showMenuItems >= 1 && "opacity-100",
            "transition-transform duration-300 ease-in-out transform translate-y-0 opacity-0"
          )}
          onMouseOver={() => handleMouseOver(1)}
          onMouseLeave={() => handleMouseOver(-1)}
          onClick={() => {
            if (!disabled) {
              setClicked(true);
            }
          }}
          disabled={disabled}
        >
          College Student
          {activeIndex === 1 && (
            <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full absolute top-1/2 transform -translate-y-1/2 ml-2">
              <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
              Coming Soon!
            </span>
          )}
        </button>
        <button
          className={classNames(
            "menu-item",
            activeIndex === 1 && "active",
            showMenuItems >= 2 && "opacity-100",
            "transition-transform duration-300 ease-in-out transform translate-y-0 opacity-0"
          )}
          onMouseOver={() => handleMouseOver(2)}
          onMouseLeave={() => handleMouseOver(-1)}
          onClick={() => {
            if (!disabled) {
              setClicked(true);
            }
          }}
          disabled={disabled}
        >
          Employer
          {activeIndex === 2 && (
            <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full absolute top-1/2 transform -translate-y-1/2 ml-2">
              <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
              Coming Soon!
            </span>
          )}
        </button>
      </div>
      <div
        id="menu-background-pattern"
        className={classNames(!showPattern && "opacity-0")}
        style={{
          backgroundImage: `radial-gradient(${themeColor} 9%, transparent 9%)`,
        }}
      />
      <div id="menu-background-image" />
      <div
        className={classNames(
          "absolute transition ease-in-out duration-1000 w-[40%] h-[45%] z-50 top-1/4 left-2/4",
          activeIndex === -1 && !clicked && "opacity-0 hidden",
          clicked &&
            "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 opacity-1",
          clicked && end && "transform -translate-y-[5%]"
        )}
      >
        <ChatBoxComponent
          className={classNames(
            activeIndex === 0 && "ring-palate-600",
            activeIndex === 1 && "ring-palate-400",
            activeIndex === 2 && "ring-palate-300",
            clicked && "ring-gray-600"
          )}
        >
          {
            <span>
              {activeIndex === 0 && "lorem ipsium highschool student"}
              {activeIndex === 1 && "lorem ipsium college student"}
              {activeIndex === 2 && "lorem ipsium employeer"}
              {clicked &&
                !isLoading &&
                !isFetching &&
                !isError &&
                !end &&
                questions &&
                questions[questionNumber].text}
              {end && (
                <Suspense>
                  <MagicalText
                    text={
                      major.data.code ||
                      "An error occurred on the server try again later"
                    }
                  />
                </Suspense>
              )}
            </span>
          }
        </ChatBoxComponent>
        <div className={classNames("mt-8 relative", end && "hidden")}>
          <form onSubmit={submitHandler}>
            <label htmlFor="answer" className="sr-only">
              Answer
            </label>
            <input
              type="text"
              name="answer"
              id="answer"
              className={classNames(
                "w-full rounded-lg border-0 py-3 px-4 text-gray-700 text-xl shadow-xl ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-gray-600 sm:leading-6 transition ease-linear opacity-0 duration-500",
                showInput && "opacity-100"
              )}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder=""
              disabled={end || disabled}
            />
            <button
              type="submit"
              className={classNames(
                "bg-transparent flex justify-center items-center rounded-lg w-1/12 h-full absolute top-0 right-0 text-black text-xl transition opacity-0 duration-500 ease-linear",
                showInput && "opacity-100"
              )}
              onMouseEnter={() => setArrowHovered(true)}
              onMouseLeave={() => setArrowHovered(false)}
              disabled={end || disabled}
            >
              <span>{arrowHovered ? <IoSend /> : <AiOutlineSend />}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
