import { useState } from "react";

import headlinePhoto from "../../assets/GeneralReport.png";
import BarChart from "../../components/Charts/BarChart";
import DoughnutChart from "../../components/Charts/Doughnut";
import ExportExcel from "../../components/Charts/ExportExcel";
import LineChrat from "../../components/Charts/Line";
import DropDown from "../../components/UI/DropDown";
import FloatUpContainer from "../../components/UI/FloatUpContainer";
import MediumCard from "../../components/UI/MediumCard";
import { SubjectImg } from "../../components/UI/SubjectImg";
import { useGetGeneralReportsQuery } from "../../store/reducers/report-reducer";
import { ExportData, GeneralReport } from "../../types/GeneralReport";
import { makeTable } from "../../utils/helper-functions";


enum Choices {
  USERS_GENDER = "Gender",
  USERS_AUTH = "Login & Registration",
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
      <MediumCard>
        <SubjectImg
          name="GR"
          src={headlinePhoto}
          width="400px"
        />

        {isError && <div>Error fetching</div>}
        {isLoading && (
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {!isLoading && data && (
          <>
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
              <LineChrat
                items={data.usersData.usersGroupedByAge}
                title="Information about the age"
              />
            )}
            <ExportExcel
              fileName="general-reports"
              csvData={getDataToExport(data)}
            />
          </>
        )}
      </MediumCard>
    </FloatUpContainer>
  );
}

export default GeneralReportsPage;
