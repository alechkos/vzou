import CasinoIcon from "@mui/icons-material/Casino";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { TextField, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import React, { FC, useState } from "react";

import HeapAnimationController from "../../../ClassObjects/Heap/HeapAnimationController";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setInputArray, setInputKey } from "../../../store/reducers/alghoritms/heap-reducer";
import { useRegisterActivityMutation } from "../../../store/reducers/report-reducer";
import { AlertError } from "../../UI/Controls/AlertError";
import { theme } from "../../UI/Controls/ControlsTheme";
import { ControlsToolTip } from "../../UI/Controls/ControlsToolTip";
import MediumCard from "../../UI/MediumCard";
import { generateRandomArrForHeap, getArrFromInputForHeap } from "../BinaryTree/Helpers/Functions";

interface Props {
  controller: HeapAnimationController;
  isButtonDisabled: boolean;
}

const buttonClassname =
  "bg-white hover:bg-lime-100 text-lime-800 font-semibold py-2 px-2 border border-lime-600 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed";
const HeapControlsPanel: FC<Props> = ({ controller, isButtonDisabled }) => {
  const inputArray = useAppSelector((state) => state.heap.inputArray);
  const inputKey = useAppSelector((state) => state.heap.inputKey);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const [regsterActivity] = useRegisterActivityMutation();
  const [value, setValue] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const setCurrentError = (error: string) => {
    setError(error);
    setTimeout(() => {
      setError("");
    }, 5000);
  };
  const createHeapHandler = async () => {
    const res = getArrFromInputForHeap(15, inputArray);
    if (typeof res !== "string") {
      controller.setArrFromInput(res);
      await Animate("Build-Max-Heap");
    } else {
      setCurrentError(res);
    }
  };

  const handleInputKey = (e: any) => {
    const val = Number(e.target.value);
    if (val < 1000 && val > -1) {
      dispatch(setInputKey(val));
    } else {
      setCurrentError("Please enter a number between 0 and 999");
    }
  };

  const Animate = async (animation: string) => {
    switch (animation) {
      case "Build-Max-Heap":
        regsterActivity({
          algorithm: "Build-Max-Heap",
          subject: "Heap",
        });
        await controller.buildMaxHeap();
        return;
      case "Heap-Max":
        regsterActivity({
          algorithm: "Heap-Max",
          subject: "Heap",
        });
        await controller.heapMax();
        return;
      case "Extract-Max":
        regsterActivity({
          algorithm: "Extract-Max",
          subject: "Heap",
        });
        await controller.extractMax();
        return;
      case "Insert Key":
        regsterActivity({
          algorithm: "Insert Key",
          subject: "Heap",
        });
        await controller.insertKey(inputKey);
        return;
      case "Heap-Sort":
        regsterActivity({
          algorithm: "Heap-Sort",
          subject: "Heap",
        });
        await controller.heapSort();
        return;
      case "Clear":
        controller.setArrFromInput([]);
        return;

      default:
    }
  };
  return (
    <>
      {error && (
        <AlertError
          error={error}
          onClose={() => {
            setCurrentError("");
          }}
        />
      )}
      <MediumCard
        isSmaller
        maxWidth="max-w-[530px]"
      >
        <ThemeProvider theme={theme}>
          <ControlsToolTip isButtonDisabled={isButtonDisabled}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="algorithms and actions"
                    centered
                  >
                    <Tab
                      label="Heap construction"
                      value="1"
                    />
                    <Tab
                      label="Algorithms"
                      value="2"
                    />
                    <Tab
                      label="Insert"
                      value="3"
                    />
                  </TabList>
                </Box>
                <TabPanel
                  value="1"
                  className={value === "1" ? "justify-start " : "hidden"}
                >
                  <TextField
                    placeholder="e.g 1,2,3,4,..."
                    size="small"
                    sx={{ width: "150px" }}
                    value={inputArray}
                    onChange={(e) => dispatch(setInputArray(e.target.value))}
                    label="Build-Max-Heap"
                    variant="outlined"
                  />
                  <button
                    disabled={isButtonDisabled}
                    className={`${buttonClassname} w-[40px] h-[40px]`}
                    onClick={createHeapHandler}
                  >
                    Go
                  </button>

                  <button
                    disabled={isButtonDisabled}
                    className={`${buttonClassname} w-[140px] h-[40px] ml-8`}
                    onClick={async () => {
                      controller.setArrFromInput(generateRandomArrForHeap(9, 7));
                      await Animate("Build-Max-Heap");
                    }}
                  >
                    <CasinoIcon />
                    Randomize
                  </button>
                  <button
                    disabled={isButtonDisabled}
                    className={`${buttonClassname} w-[60px] h-[40px] ml-8`}
                    onClick={async () => Animate("Clear")}
                  >
                    Clear
                  </button>
                </TabPanel>
                <TabPanel
                  value="2"
                  className={value === "2" ? "flex flex-row justify-center " : "hidden"}
                >
                  {["Heap-Max", "Extract-Max", "Heap-Sort"].map((text) => (
                    <div
                      className="px-2"
                      key={text}
                    >
                      <button
                        disabled={isButtonDisabled}
                        className={buttonClassname}
                        onClick={async () => Animate(text)}
                      >
                        {text}
                      </button>
                    </div>
                  ))}
                </TabPanel>
                <TabPanel
                  value="3"
                  className={value === "3" ? "justify-start " : "hidden"}
                >
                  <TextField
                    sx={{ width: "100px" }}
                    size="small"
                    value={inputKey}
                    type="number"
                    variant="outlined"
                    label="Input-Key"
                    inputProps={{
                      min: 0,
                      max: 999,
                      style: { textAlign: "center" },
                    }}
                    onChange={handleInputKey}
                  />
                  <button
                    disabled={isButtonDisabled}
                    className={`${buttonClassname} w-[40px] h-[40px]`}
                    onClick={async () =>
                      Animate("Insert Key").catch((e) => {
                        console.log(e);
                        setCurrentError("Array size overflow, max is 15.");
                      })
                    }
                  >
                    Go
                  </button>
                </TabPanel>
              </TabContext>
            </Box>
          </ControlsToolTip>
        </ThemeProvider>
      </MediumCard>
    </>
  );
};

export default HeapControlsPanel;
