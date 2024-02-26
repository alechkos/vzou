import { useState } from "react";

import BarChart from "../components/Charts/BarChart";
import DoughnutChart from "../components/Charts/Doughnut";
import ExportExcel from "../components/Charts/ExportExcel";
import LineChart from "../components/Charts/Line";
import DropDown from "../components/UI/DropDown";
import FloatUpContainer from "../components/UI/FloatUpContainer";
import MediumCard from "../components/UI/MediumCard";
import { useGetGeneralReportsQuery } from "../store/reducers/report-reducer";
import { ExportData, GeneralReport } from "../types/GeneralReport";
import { makeTable } from "../utils/helper-functions";


enum Choices {
  USERS_GENDER = "Gender",
  USERS_AUTH = "Login & Registeration",
  USERS_AGE = "Age",
}

function GeneralReportsPage() {
  const { data, isLoading, isError } = useGetGeneralReportsQuery("");
  const [ graphChoosen, setGraphChoosen ] = useState("Choose report");
  const getDataToExport = (data: GeneralReport) => {
    if (!data) {
      return [];
    }
    const authRows: ExportData[] = makeTable({
      items: data.accountsData,
      title: "",
    });
    const genderRows: ExportData[] = makeTable({
      items: data.usersData.usersGroupedByGender,
      title: "Users By Gender",
    });
    const ageRows: ExportData[] = [{ title: "AGE INFORMATION", amount: "" }].concat(
      makeTable({
        items: data.usersData.usersGroupedByAge,
        title: "Users By Age",
      }),
    );
    return authRows.concat(genderRows.concat(ageRows));
  };

  return (
    <FloatUpContainer>
      {isError && <div>Error fetching</div>}
      {isLoading && <div>Loading ...</div>}
      {!isLoading && data && (
        <MediumCard>
          <DropDown
            title={graphChoosen}
            items={Object.values(Choices)}
            onClick={setGraphChoosen}
          />
          {graphChoosen === Choices.USERS_GENDER && (
            <DoughnutChart
              items={data.usersData.usersGroupedByGender}
              title="Users Gender"
            />
          )}
          {graphChoosen === Choices.USERS_AUTH && (
            <BarChart
              items={data.accountsData}
              title="Information"
            />
          )}
          {graphChoosen === Choices.USERS_AGE && (
            <LineChart
              items={data.usersData.usersGroupedByAge}
              title="Information about the age"
            />
          )}
          <ExportExcel
            fileName="general-reports"
            csvData={getDataToExport(data)}
          />
        </MediumCard>
      )}
    </FloatUpContainer>
  );
}

export default GeneralReportsPage;
