"use client";

import { type ReactNode } from "react";
import "./graphic-background.css";
import { StackedCards } from "./StackedCards";

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <div className="lg:flex h-screen border-2 border-black">
      <div className="lg:w-2/5 p-8 flex items-center relative justify-center h-full bg-background">
        <div className="max-w-xl md:min-w-[450px]">{children}</div>
      </div>
      <div className="hidden lg:flex w-3/5 border-l-2 items-center relative justify-center h-full">
        <div className="w-full px-32">
          <StackedCards
            images={[
              "/assets/marketing/landing-1.jpg",
              "/assets/marketing/dashboard-2.jpg",
              "/assets/marketing/docs-3.jpg",
            ]}
          />
        </div>
      </div>
    </div>
  );
}
