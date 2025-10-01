"use client";
import { useState, useRef, useId, useEffect } from "react";

interface SlideData {
  title: string;
  src: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, title } = slide;

  return (
    <li
      ref={slideRef}
      className={`relative flex flex-col items-center justify-center w-[280px] h-[280px] text-white cursor-pointer select-none rounded-lg overflow-hidden shadow-lg transition-transform duration-500 ease-in-out ${
        current === index ? "scale-100 z-20" : "scale-95 opacity-70"
      }`}
      onClick={() => handleSlideClick(index)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformOrigin: "bottom",
        transform:
          current !== index ? "rotateX(8deg) scale(0.98)" : "rotateX(0deg) scale(1)"
      }}
    >
      <div
        className={`absolute inset-0 rounded-lg bg-[#1D1F2F] overflow-hidden transition-transform duration-300 ease-out ${
          current === index ? "translate-z-0" : "translate-z-[-10px]"
        }`}
        style={{
          transform:
            current === index
              ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
              : "none"
        }}
      >
        <img
          src={src}
          alt={title}
          loading="eager"
          decoding="sync"
          onLoad={imageLoaded}
          className="w-full h-full object-cover opacity-90 transition-opacity duration-600 ease-in-out"
          style={{ opacity: current === index ? 1 : 0.5 }}
        />
        {current === index && (
          <div className="absolute inset-0 bg-black/30 transition-opacity duration-700" />
        )}
      </div>
      <article className="relative p-5 text-center pointer-events-none">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-wide">
          {title}
        </h2>
      </article>
    </li>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const id = useId();

  // Auto-advance slides every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSlideClick = (index: number) => {
    if (current !== index) setCurrent(index);
  };

  return (
    <div
      className="relative w-[320px] h-[320px] mx-auto select-none"
      aria-labelledby={`carousel-heading-${id}`}
    >
      <ul
        className="absolute flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${(current * 100) / slides.length}%)` }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>
    </div>
  );
}
