import React, { useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { colors } from "../data/colors";

const variants: Variants = {
  hidden: {
    transform: "translateX(-100%)",
  },
  show: {
    transform: "translateX(0%)",
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
  exit: {
    transform: "translateX(100%)",
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
};

export function AnimatedButton(props: { clickCallback: () => void }) {
  const [pageVisible, setPageVisible] = useState(false);
  const [nextPage, setNextPage] = useState<number | undefined | null>();

  if (!pageVisible && nextPage) {
    setNextPage(null);
  }

  return (
    <div className={"text-xl rounded-lg"}>
      <button
        className="inline-block relative box-border py-8 px-16 text-xl font-bold text-white border-0 cursor-pointer overflow-hidden rounded-lg"
        onClick={props.clickCallback}
        onMouseEnter={() => {
          setPageVisible(true);
        }}
        onMouseLeave={() => {
          setPageVisible(false);
          setNextPage(null);
        }}
        onMouseOut={() => {
          setPageVisible(false);
          setNextPage(null);
        }}
      >
        <span
          className={
            "inline-block text-center z-20 text-white absolute w-full h-full top-50 left-50 transform -translate-y-1/2"
          }
          style={{ transform: "translate(-50%, -25%)" }}
        >
          Lets Go!
        </span>
        <AnimatePresence>
          {!pageVisible && (
            <motion.div
              key="nextPage0"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={variants}
              className={"absolute z-10 top-0 left-0 w-full h-full"}
              style={{
                backgroundColor: colors[0],
              }}
              onAnimationStart={() => setNextPage(1)}
            />
          )}
          {pageVisible && nextPage === 1 && (
            <motion.div
              key="nextPage1"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={variants}
              className={"absolute z-10 top-0 left-0 w-full h-full"}
              style={{
                backgroundColor: colors[1],
              }}
              onAnimationComplete={() => setNextPage(2)}
            />
          )}
          {pageVisible && nextPage === 2 && (
            <motion.div
              key="nextPage2"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={variants}
              className={"absolute z-10 top-0 left-0 w-full h-full"}
              style={{
                backgroundColor: colors[2],
              }}
              onAnimationComplete={() => setNextPage(3)}
            />
          )}
          {pageVisible && nextPage === 3 && (
            <motion.div
              key="nextPage3"
              initial="hidden"
              animate="show"
              exit="exit"
              className={"absolute z-10 top-0 left-0 h-full w-full"}
              variants={variants}
              style={{
                backgroundColor: colors[3],
              }}
              onAnimationComplete={() => setNextPage(4)}
            />
          )}
          {pageVisible && nextPage === 4 && (
            <motion.div
              key="nextPage4"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={variants}
              className={"absolute z-10 top-0 left-0 h-full w-full"}
              style={{
                backgroundColor: colors[4],
              }}
              onAnimationComplete={() => setNextPage(5)}
            />
          )}
          {pageVisible && nextPage === 5 && (
            <motion.div
              key="nextPage5"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={variants}
              className={"absolute z-10 top-0 left-0 h-full w-full"}
              style={{
                backgroundColor: colors[5],
              }}
              onAnimationComplete={() => setNextPage(6)}
            />
          )}
          {pageVisible && nextPage === 6 && (
            <motion.div
              key="nextPage6"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={variants}
              className={"absolute z-10 top-0 left-0 h-full w-full"}
              style={{
                backgroundColor: colors[6],
              }}
              onAnimationComplete={() => setNextPage(7)}
            />
          )}
          {nextPage === 7 && (
            <motion.div
              key="nextPage7"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={variants}
              className={"absolute z-10 top-0 left-0 h-full w-full"}
              style={{
                backgroundColor: colors[7],
              }}
              onAnimationStart={() => {
                setPageVisible(false);
              }}
            />
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
