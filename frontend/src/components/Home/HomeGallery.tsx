import DsCard from "./DsCard";
import HomePageData from "./HomePageData";
import bfsImage from "../../assets/Gallery/bfsPhoto.png";
import bfsGif from "../../assets/Gallery/bfsGif.gif";
import bstImage from "../../assets/Gallery/treePhoto.png";
import bstGif from "../../assets/Gallery/treeGif.gif";
import RoutePaths from "../../Routes/RoutePaths";

function HomeGallery() {
  return (
    <section className="container mx-auto px-0 md:px- py-24 h-full w-full">
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 justify-items-center gap-12 gap-y-24">
        <DsCard
          title={"Graphs"}
          image={bfsImage}
          gif={bfsGif}
          url={RoutePaths.GRAPHS}
        />
        <DsCard
          title={"Data Structures"}
          image={bstImage}
          gif={bstGif}
          url={RoutePaths.DATA_STRUCTURES}
        />
        <DsCard
          title={HomePageData[0].title}
          image={HomePageData[0].image}
          gif={HomePageData[0].gif}
          url={HomePageData[0].url}
          description={HomePageData[0].description}
          expended={HomePageData[0].expended}
          expendedList={HomePageData[0].expendedList}
        />
      </div>
    </section>
  );
}

export default HomeGallery;
