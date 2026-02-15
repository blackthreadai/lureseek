"use client";

interface LogoProps {
  size?: "lg" | "sm";
}

export default function Logo({ size = "lg" }: LogoProps) {
  const isLarge = size === "lg";

  return (
    <div className="flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="LureSeek"
        className={isLarge ? "h-24 sm:h-32" : "h-8"}
      />
    </div>
  );
}
