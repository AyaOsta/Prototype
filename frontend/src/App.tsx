import { AnimatePresence, motion, Variants } from "framer-motion";
import React, { useState } from "react";
import "./App.scss";
import { LandingComponent } from "./components/landing.component";
import { MenuComponent } from "./components/menu.component";
import { colors } from "./data/colors";

const landingVariant = {
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const variants = {
  hidden: {
    x: "100vw",
  },
  show: {
    x: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  exit: {
    x: "-100vw",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const menuVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0,
      ease: "easeInOut",
    },
  },
};

function App() {
  const [pageVisible, setPageVisible] = useState(true);
  const [nextPage, setNextPage] = useState<number | undefined | null>();

  const handleClick = () => {
    setPageVisible(false);
  };

  return (
    <div className="App">
      <AnimatePresence mode="popLayout">
        {pageVisible && (
          <motion.div
            key="page"
            exit="exit"
            variants={variants}
            style={{ height: "100vh", width: "100vw" }}
          >
            <LandingComponent click={handleClick} />
          </motion.div>
        )}
        {!pageVisible && !nextPage && (
          <motion.div
            key="nextPage0"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={variants}
            style={{
              height: "100vh",
              width: "100vw",
              backgroundColor: colors[0],
            }}
            onAnimationComplete={() => setNextPage(1)}
          />
        )}
        {!pageVisible && nextPage === 1 && (
          <motion.div
            key="nextPage1"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={variants}
            style={{
              height: "100vh",
              width: "100vw",
              backgroundColor: colors[1],
            }}
            onAnimationComplete={() => setNextPage(2)}
          />
        )}
        {!pageVisible && nextPage === 2 && (
          <motion.div
            key="nextPage2"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={variants}
            style={{
              height: "100vh",
              width: "100vw",
              backgroundColor: colors[2],
            }}
            onAnimationComplete={() => setNextPage(3)}
          />
        )}
        {!pageVisible && nextPage === 3 && (
          <motion.div
            key="nextPage3"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={variants}
            style={{
              height: "100vh",
              width: "100vw",
              backgroundColor: colors[3],
            }}
            onAnimationComplete={() => setNextPage(4)}
          />
        )}
        {!pageVisible && nextPage === 4 && (
          <motion.div
            key="nextPage4"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={variants}
            style={{
              height: "100vh",
              width: "100vw",
              backgroundColor: colors[4],
            }}
            onAnimationComplete={() => setNextPage(5)}
          />
        )}
        {!pageVisible && nextPage === 5 && (
          <motion.div
            key="nextPage5"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={variants}
            style={{
              height: "100vh",
              width: "100vw",
              backgroundColor: colors[5],
            }}
            onAnimationComplete={() => setNextPage(6)}
          />
        )}
        {!pageVisible && nextPage === 6 && (
          <motion.div
            key="nextPage6"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={variants}
            style={{
              height: "100vh",
              width: "100vw",
              backgroundColor: colors[6],
            }}
            onAnimationComplete={() => setNextPage(7)}
          />
        )}
        {!pageVisible && nextPage === 7 && (
          <motion.div
            key="nextPage7"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={variants}
            style={{
              height: "100vh",
              width: "100vw",
              backgroundColor: colors[7],
            }}
            // onAnimationStart={() => setNextPage(8)}
            onAnimationComplete={() => setNextPage(8)}
          />
        )}
        {!pageVisible && nextPage === 8 && (
          <motion.div
            key="nextPage8"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={menuVariant}
            onAnimationComplete={() => setNextPage(8)}
          >
            <MenuComponent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
