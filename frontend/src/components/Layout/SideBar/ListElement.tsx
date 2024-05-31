import { Link } from "react-router-dom";
import { useState } from "react";

export interface ExpendedItem {
  name: string;
  url: string;
}

interface Props {
  title: string;
  key: number;
  url: string;
  expended?: boolean;
  expendedList?: ExpendedItem[];
}

const ListElement = ({ title, key, url, expendedList, expended }: Props) => {
  const currentUrl = window.location.href;

  const [showSorts, setShowSorts] = useState(false);

  const setShowSortsHandler = () => {
    setShowSorts((prev) => !prev);
  };

  return (
    <>
      {url !== "" ? (
        <Link
          to={url}
          key={key}
          className={`flex flex-col p-2 hover:text-green-400 hover:cursor-pointer w-full ${
            currentUrl.includes(url) && url !== "" ? "text-green-400" : ""
          }`}
        >
          <p className="border-b-2 border-gray-200">{title}</p>
        </Link>
      ) : (
        <div
          key={key}
          className={`flex flex-col p-2 hover:text-green-400 hover:cursor-pointer w-full ${
            currentUrl.includes(url) && url !== "" ? "text-green-400" : ""
          }`}
          onClick={setShowSortsHandler}
        >
          <p className="border-b-2 border-gray-200">{title}</p>
          {expended &&
            showSorts &&
            expendedList?.map((element) => (
              <Link
                to={element.url}
                key={element.url}
                className={`text-black hover:text-green-400 pt-1 ${
                  currentUrl.includes(element.url) ? "text-green-400" : ""
                }`}
              >
                {element.name}
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default ListElement;
