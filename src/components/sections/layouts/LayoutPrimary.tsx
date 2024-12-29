"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface LayoutPrimaryProps {
  children: ReactNode;
  navbar?: ReactNode;
  footer?: ReactNode;
  sidebar?: ReactNode;
}

const LayoutPrimary: React.FC<LayoutPrimaryProps> = ({
  children,
  navbar,
  sidebar,
  footer,
}) => {
  return (
    <div
      className={cn(
        "w-screen flex flex-col max-w-screen dark:bg-[#040D12]  overflow-x-hidden"
      )}
    >
      {navbar && <div className="w-full">{navbar}</div>}
      <div className="flex pt-10 ">
        {sidebar ?? ""}
        <div className="flex flex-col w-full min-h-screen px-4 pb-16 overflow-x-hidden overflow-y-auto ">
          {children}
        </div>
      </div>
      {footer && <div className="w-full">{footer}</div>}
    </div>
  );
};

export default LayoutPrimary;
