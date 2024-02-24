import ARP from "../../assets/algorithmsReportsPhoto.png";
import GRP from "../../assets/generalReportsPhoto.png";
import headlinePhoto from "../../assets/ReportsHead.png";
import DsCard from "../../components/Home/DsCard";
import FloatUpContainer from "../../components/UI/FloatUpContainer";
import { SubjectImg } from "../../components/UI/SubjectImg";
import RoutePaths from "../../Routes/RoutePaths";


function ReportsPage() {
  return (
    <FloatUpContainer>
      <section className="container mx-auto px-0 sm:px-0 py-24" style={{ padding: "40px" }}>
        <div className="grid grid-cols-0 md:grid-cols-0 lg:grid-cols-0 2xl:grid-cols-0 justify-items-center gap-12">
          <SubjectImg
            name="GR"
            src={headlinePhoto}
            width="300px"
          />
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-2 justify-items-center gap-20">
            <DsCard
              key={0}
              title="General"
              image={GRP}
              gif={GRP}
              url={RoutePaths.GENERAL_REPORTS}
            />
            <DsCard
              key={1}
              title="Algorithms"
              image={ARP}
              gif={ARP}
              url={RoutePaths.ALGORITHMS_REPORTS}
            />
          </div>
        </div>
      </section>
    </FloatUpContainer>
  );
}

export default ReportsPage;
