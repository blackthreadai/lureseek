"use client";

interface LogoProps {
  size?: "lg" | "sm";
}

export default function Logo({ size = "lg" }: LogoProps) {
  const isLarge = size === "lg";

  return (
    <div className={`flex flex-col items-center ${isLarge ? "gap-2" : "gap-0"}`}>
      <div className="flex items-center">
        <h1
          className={`font-bold tracking-tight ${
            isLarge ? "text-4xl sm:text-5xl" : "text-xl"
          }`}
        >
          <span className="text-lure-text">Lure</span>
          <span className="text-lure-accent">Seek</span>
        </h1>
      </div>
      {/* tagline removed */}
    </div>
  );
}
