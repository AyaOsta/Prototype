import React, { useCallback, useEffect, useRef, useState } from "react";
import { classNames } from "../utils/classnames.util";
import { AnimatedButton } from "./animated-button.component";

interface Combination {
  configuration: number;
  roundness: number;
}

export function LandingComponent(props: { click: () => void }) {
  const [prev, setPrev] = useState<number>(0);
  const [combination, setCombination] = useState<Combination>({
    configuration: 1,
    roundness: 1,
  });
  const [clicked, setClicked] = useState<number | undefined | null>();
  const [divIsHovered, setDivIsHovered] = useState<number | boolean | null>();
  const motionDivRefs = useRef<Array<HTMLDivElement | null>>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const combinations: Combination[] = [
    { configuration: 1, roundness: 1 },
    { configuration: 1, roundness: 2 },
    { configuration: 1, roundness: 4 },
    { configuration: 2, roundness: 2 },
    { configuration: 2, roundness: 3 },
    { configuration: 3, roundness: 3 },
  ];

  const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const uniqueRand = (min: number, max: number, prev: number) => {
    let next = prev;
    while (prev === next) next = rand(min, max);
    return next;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const index = uniqueRand(0, combinations.length - 1, prev);
      const combination = combinations[index];
      setCombination(combination);
      setPrev(index);
    }, 3000);

    return () => clearInterval(interval);
  }, [prev, combinations]);

  const updateProperties = useCallback((index: number) => {
    const ref = motionDivRefs.current[index];

    if (ref && ref.classList.contains("grow")) {
      ref.classList.remove("grow");
      motionDivRefs.current.forEach((e, i) => {
        if (e && i !== index) {
          e.classList.remove("hide");
        }
      });
    } else if (ref) {
      ref.classList.add("grow");
      motionDivRefs.current.forEach((e, i) => {
        if (e && i !== index) {
          e.classList.add("hide");
        }
      });
    }
  }, []);

  const clickHandler = (index: number) => {
    setClicked(clicked !== null && clicked !== undefined ? null : index);
    updateProperties(index);
  };

  const hoverHandler = (index?: number) => {
    setDivIsHovered(index);
  };

  return (
    <div className="landing">
      <div className="fixed top-4 left-0 w-screen flex items-start justify-between w-full text-2xl font-bold hover:underline mt-0">
        <div className="hidden relative ml-5 mr-auto opacity-0 md:block">
          <AnimatedButton
            clickCallback={() => console.log("remove me later")}
          />
        </div>
        <h1 className="text-3xl text-gray-900 md:text-4xl mx-auto cursor-pointer">
          Student Major Fit
        </h1>
        <div className="relative mr-5 ml-auto">
          <AnimatedButton clickCallback={props.click} />
        </div>
      </div>
      <div
        className={"wrapper"}
        data-configuration={combination.configuration}
        data-roundness={combination.roundness}
      >
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className={
              "shape shadow-2xl flex justify-items-center align-middle items-center overflow-hidden w-full h-full"
            }
            onClick={() => clickHandler(index)}
            onMouseEnter={() => hoverHandler(index)}
            onMouseLeave={() => hoverHandler()}
            onMouseOut={() => hoverHandler()}
            ref={(el) => (motionDivRefs.current[index] = el)}
          >
            <span
              className={classNames(
                divIsHovered !== index && clicked !== index
                  ? "opacity-0"
                  : "opacity-100",
                "text-[40rem] flex items-center justify-center cursor-pointer user-select-none"
              )}
            >
              {index}
            </span>
            {/*{clicked && (*/}
            {/*  <div className={"w-2/5 h-2/5 ml-32"}>*/}
            {/*    <ChatBoxComponent className={""} />*/}
            {/*  </div>*/}
            {/*)}*/}
          </div>
        ))}
      </div>
    </div>
  );
}
