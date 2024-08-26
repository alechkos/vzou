import { Link } from "react-router-dom";
import { useState } from "react";
import HomePageData from "../../Home/HomePageData";

interface Props {
  title: string;
}

const SortElements = ({ title }: Props) => {
  const currentUrl = window.location.href;

  const [showSorts, setShowSorts] = useState(true);

  const setShowSortsHandler = () => {
    setShowSorts((prev) => !prev);
  };

  return (
    <>
      <div
        className={`flex flex-col p-2 hover:text-green-400 hover:cursor-pointer w-full`}
        onClick={setShowSortsHandler}
      >
        <p className="border-b-2 border-gray-200">{title}</p>
          {showSorts &&
              HomePageData.map((element) => {
                  if (element.type === "Sort")
                      return (
                          <Link
                              to={element.url}
                              key={element.url}
                              className={`text-black hover:text-green-400 pt-1 ${
                                  currentUrl.includes(element!.url) ? "text-green-400" : ""
                              }`}
                          >
                              {element.title}
                          </Link>
                      );
              })}
      </div>
    </>
  );
};

export default SortElements;
