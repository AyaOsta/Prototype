import React, { useEffect, useRef } from "react";

export function MagicalText({ text }: { text: string }) {
  const starsRef = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const rand = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const animate = (star: HTMLSpanElement) => {
      star.current.style.setProperty("--star-left", `${rand(-10, 100)}%`);
      star.current.style.setProperty("--star-top", `${rand(-40, 80)}%`);

      star.current.style.animation = "none";
      star.current.offsetHeight;
      star.current.style.animation = "";
    };

    starsRef.current.forEach((star, index) => {
      setTimeout(() => {
        if (star) {
          animate(star);
          setInterval(() => animate(star), 1000);
        }
      }, index * (1000 / 3));
    });
  }, []);

  return (
    <h1 className={"text-center block text-gray-700 text-xl"}>
      Your major is:
      <br />
      <span className="magic">
        <span className="magic-star" ref={(el) => (starsRef.current[0] = el)}>
          <svg viewBox="0 0 512 512">
            <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
          </svg>
        </span>
        <span className="magic-star" ref={(el) => (starsRef.current[1] = el)}>
          <svg viewBox="0 0 512 512">
            <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
          </svg>
        </span>
        <span className="magic-star">
          <svg viewBox="0 0 512 512">
            <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
          </svg>
        </span>
        <span className="magic-text"> {text} </span>
      </span>
      <br />
    </h1>
  );
}
