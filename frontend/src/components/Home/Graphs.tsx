import DsCard from "./DsCard";
import HomePageData from "./HomePageData";
import FloatUpContainer from "../UI/FloatUpContainer";

const Graphs = () => {
  return (
    <FloatUpContainer>
      <section className="container mx-auto px-0 md:px- py-24 h-full w-full">
        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 justify-items-center gap-12 gap-y-24">
          {HomePageData.map((element, index) => {
            if (element.type === "Graph")
              return (
                <DsCard
                  key={index}
                  title={element.title}
                  image={element.image}
                  gif={element.gif}
                  url={element.url}
                />
              );
          })}
        </div>
      </section>
    </FloatUpContainer>
  );
};

export default Graphs;
