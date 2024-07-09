import React, { FC, useState } from "react";
import { AlertError } from "../../UI/Controls/AlertError";
import MediumCard from "../../UI/MediumCard";
import { TextField, ThemeProvider } from "@mui/material";
import { theme } from "../../UI/Controls/ControlsTheme";
import { ControlsToolTip } from "../../UI/Controls/ControlsToolTip";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import CasinoIcon from "@mui/icons-material/Casino";

interface Props {
  error: string;
  setCurrentError: (error: string) => void;
  isButtonDisabled: boolean;
  showActions: boolean;
  editingConstruction: boolean;
  handleHideActions: () => void;
  handleShowActions: () => void;
  setAlgorithm: (name: string) => void;
  algorithms: string[];
  inputArray: string | any;
  setInputArray: (event: any) => void;
  createStructure: () => void;
  randomizeStructure: () => void;
  animate: (text: string) => Promise<void>;
  handleInput: (e: any) => void;
  value: string;
  handleChange: (event: any, value: string) => void;
  minMax?: string[];
  traversals?: string[];
  dataLabel: string;
  dataForInput: string;
  handleRandomNodes: (e: any) => void;
}

const BaseControlPanel: FC<Props> = ({
  error,
  setCurrentError,
  isButtonDisabled,
  showActions,
  editingConstruction,
  handleShowActions,
  handleHideActions,
  setAlgorithm,
  algorithms,
  inputArray,
  setInputArray,
  createStructure,
  randomizeStructure,
  animate,
  handleInput,
  value,
  handleChange,
  minMax,
  traversals,
  dataLabel,
  dataForInput,
  handleRandomNodes,
}) => {
  const buttonClassname =
    "bg-white hover:bg-lime-100 text-lime-800 font-semibold py-2 px-2 border border-lime-600 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed";

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
        maxWidth="max-w-5xl"
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
                    {!showActions && !editingConstruction && (
                      <Tab
                        label={`Create ${dataLabel} construction`}
                        value="1"
                        disabled={isButtonDisabled}
                      />
                    )}
                    {(showActions || editingConstruction) && (
                      <Tab
                        label={`Change ${dataLabel} construction`}
                        value="1"
                        onClick={handleHideActions}
                        disabled={isButtonDisabled}
                      />
                    )}
                  </TabList>
                  {showActions && (
                    <TabList
                      onChange={handleChange}
                      aria-label="algorithms and actions"
                      centered
                    >
                      {algorithms.map((alg) => {
                        if (alg.includes("Min")) {
                          return (
                            <Tab
                              label="Min / Max"
                              value="2"
                              onClick={() => {
                                setAlgorithm("Min");
                              }}
                              disabled={isButtonDisabled}
                            />
                          );
                        } else if (alg.includes("Traversals")) {
                          return (
                            <Tab
                              label="Traversals"
                              value="3"
                              onClick={() => {
                                setAlgorithm("Inorder");
                              }}
                              disabled={isButtonDisabled}
                            />
                          );
                        } else {
                          return (
                            <Tab
                              label={alg}
                              value={alg}
                              onClick={() => {
                                setAlgorithm(alg);
                              }}
                              disabled={isButtonDisabled}
                            />
                          );
                        }
                      })}
                    </TabList>
                  )}
                </Box>
                <TabPanel
                  value="1"
                  className={value === "1" ? "justify-start flex " : "hidden"}
                >
                  <TextField
                    placeholder="e.g 1,2,3,4,..."
                    size="small"
                    sx={{ width: "150px" }}
                    value={inputArray}
                    label={dataForInput}
                    variant="outlined"
                    onChange={(e) => setInputArray(e)}
                  />
                  <button
                    disabled={isButtonDisabled}
                    className={`${buttonClassname} w-[40px] h-[40px]`}
                    onClick={createStructure}
                  >
                    Go
                  </button>
                  <div className={"ml-10"}>
                    <TextField
                      sx={{ width: "150px" }}
                      name={"NumberOfRandom"}
                      size="small"
                      type="text"
                      variant="outlined"
                      label={"Number of nodes"}
                      inputProps={{
                        min: 0,
                        max: 999,
                        style: { textAlign: "center" },
                      }}
                      onChange={handleRandomNodes}
                    />
                    <button
                      disabled={isButtonDisabled}
                      className={`${buttonClassname} w-[140px] h-[40px]`}
                      onClick={randomizeStructure}
                    >
                      <CasinoIcon />
                      Randomize
                    </button>
                  </div>
                  <button
                    disabled={isButtonDisabled}
                    className={`${buttonClassname} w-[60px] h-[40px] ml-8`}
                    onClick={async () => animate("Clear")}
                  >
                    Clear
                  </button>
                </TabPanel>
                {minMax && (
                  <TabPanel
                    value="2"
                    className={value === "2" ? "flex flex-row justify-center " : "hidden"}
                  >
                    {minMax.map((text) => (
                      <div
                        className="py-2 px-6"
                        key={text}
                      >
                        <button
                          disabled={isButtonDisabled}
                          className={`${buttonClassname} w-[60px] h-[40px]`}
                          onClick={async () => animate(text)}
                        >
                          {text}
                        </button>
                      </div>
                    ))}
                  </TabPanel>
                )}
                {traversals && (
                  <TabPanel
                    value="3"
                    className={value === "3" ? "flex flex-row justify-center " : "hidden"}
                  >
                    {traversals.map((text) => (
                      <div
                        className="py-2 px-2"
                        key={text}
                      >
                        <button
                          disabled={isButtonDisabled}
                          className={buttonClassname}
                          onClick={async () => animate(text)}
                        >
                          {text}
                        </button>
                      </div>
                    ))}
                  </TabPanel>
                )}
                {showActions &&
                  algorithms
                    .filter((alg) => !alg.includes("Min") && !alg.includes("Traversals"))
                    .map((text) => (
                      <TabPanel
                        key={text}
                        value={text}
                        className={value === text ? "justify-start " : "hidden"}
                      >
                        {text !== "DeleteFromHead" && text !== "DeleteFromTail" && (
                          <TextField
                            sx={{ width: "138px" }}
                            name={text}
                            size="small"
                            type="text"
                            variant="outlined"
                            label={"Your value here"}
                            inputProps={{
                              min: 0,
                              max: 999,
                              style: { textAlign: "center" },
                            }}
                            onChange={handleInput}
                          />
                        )}
                        <button
                          disabled={isButtonDisabled}
                          className={`${buttonClassname} w-auto h-[40px]`}
                          onClick={async () =>
                            animate(text).catch((e) => {
                              setCurrentError(e.message);
                            })
                          }
                        >
                          {text === "DeleteFromHead" || text === "DeleteFromTail" ? "Delete" : "Go"}
                        </button>
                      </TabPanel>
                    ))}
              </TabContext>
            </Box>
          </ControlsToolTip>
        </ThemeProvider>
      </MediumCard>
    </>
  );
};

export default BaseControlPanel;
