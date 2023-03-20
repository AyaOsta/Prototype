import "../App.scss";
import { classNames } from "../utils/classnames.util";
import { HTMLAttributes } from "react";
import { motion } from "framer-motion";

export function ChatBoxComponent(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <motion.div
      className={classNames(
        "rounded-lg shadow-xl w-full h-full bg-white z-50 ring-2 focus:outline-none ring-offset-4 p-10 flex justify-center items-center",
        props.className
      )}
    >
      <span className={"text-center block text-gray-700 text-xl"}>
        {props.children}
      </span>
    </motion.div>
  );
}
