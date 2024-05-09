import HomePageData from "../../Home/HomePageData";
import ListElement from "./ListElement";

const SideBar = () => {
  return (
    <div className="absolute border border-gray-200 shadow-2xl rounded-xl text-xl top-80 ml-4">
      <ul className="flex flex-col p-4 w-52">
        {HomePageData.map((element, index) => (
          <ListElement
            key={index}
            title={element.title}
            url={element.url}
            expended={element.expended}
            expendedList={element.expendedList}
          />
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
