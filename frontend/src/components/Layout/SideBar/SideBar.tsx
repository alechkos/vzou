import HomePageData from "../../Home/HomePageData";
import SortElements from "./SortElements";
import { useState } from "react";
import { elements } from "chart.js";
import DataStructureElements from "./DataStructureElements";
import GraphElements from "./GraphElements";

const SideBar = () => {
  const [show, setShow] = useState(true);

  const closeHandler = () => {
    setShow(false);
  };

  const openHandler = () => {
    setShow(true);
  };

  return (
    <div className="absolute border border-gray-200 shadow-2xl rounded-xl text-xl top-48 ml-4 overflow-auto max-h-[700px]">
      <ul className="flex flex-col p-4 w-52">
        {show && (
          <>
            <span
              className={"self-end mr-2 cursor-pointer hover:text-green-400"}
              onClick={closeHandler}
            >
              X
            </span>
            {HomePageData.map((element, index) => {
              if (element.expended)
                return (
                  <SortElements
                    key={element.title}
                    keyz={index}
                    title={element.title}
                    url={element.url}
                    expended={element.expended}
                    expendedList={element.expendedList}
                    type={element.type}
                  />
                );
            })}
            <DataStructureElements title={"Data Structures"} />
            <GraphElements title={"Graphs"} />
          </>
        )}
        {!show && (
          <span
            className={"hover:text-green-400 hover:cursor-pointer"}
            onClick={openHandler}
          >
            Show SideBar
          </span>
        )}
      </ul>
    </div>
  );
};

export default SideBar;
