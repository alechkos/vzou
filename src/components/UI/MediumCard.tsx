import React from "react";

// for using children as in JS
type Props = {
  children: React.ReactNode;
  isSmaller?: boolean;
  maxWidth?: string;
};

const MediumCard: React.FC<Props> = ({ children, isSmaller, maxWidth }) => (
  <div className="flex min-h-full items-center justify-center py-10 sm:px-4 lg:px-8 ">
    <div
      className={`${maxWidth || "max-w-xl"} w-full ${
        isSmaller ? "p-3" : "p-10"
      } bg-white border border-gray-200 rounded-lg shadow-lg`}
    >
      <div className={maxWidth || "max-w-xl w-full space-y-8 "}>{children}</div>
    </div>
  </div>
);

export default MediumCard;
