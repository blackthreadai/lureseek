"use client";

interface LogoProps {
  size?: "lg" | "sm";
}

export default function Logo({ size = "lg" }: LogoProps) {
  const isLarge = size === "lg";

  return (
    <div className={`flex flex-col items-center ${isLarge ? "gap-2" : "gap-0"}`}>
      <div className="flex items-center gap-2">
        {/* Fish hook icon */}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className={isLarge ? "w-10 h-10" : "w-6 h-6"}
          aria-hidden="true"
        >
          <path
            d="M16 2 v8 a8 8 0 0 1 -8 8 v6 a4 4 0 0 0 8 0 v-6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-lure-accent"
          />
          <circle cx="16" cy="2" r="2" className="fill-lure-accent" />
        </svg>
        <h1
          className={`font-bold tracking-tight ${
            isLarge ? "text-4xl sm:text-5xl" : "text-xl"
          }`}
        >
          <span className="text-lure-text">Lure</span>
          <span className="text-lure-accent">Seek</span>
        </h1>
      </div>
      {isLarge && (
        <p className="text-lure-muted text-sm tracking-wide">
          Find your perfect lure
        </p>
      )}
    </div>
  );
}
