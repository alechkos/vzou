import { useState } from "react";
import swal from "sweetalert";

import MediumCard from "../../UI/MediumCard";
import SimulationInputGroup from "../../UI/SimulationInputGroup";
import { getArrFromInput } from "../Sorts/helpers/functions";
import { UnknownAction } from "redux";

export interface Item {
  value: string;
  key: number;
}

interface Props {
  // Functions are implemented on the stack/queue page
  rightBtnHandler: () => void; // remove from data
  inputHandler: (data: number[]) => void; // function that gets the value and add to the the data
  leftBtnHandler?: () => void;

  abortTrueHandler?: () => void;
  abortFalseHandler?: () => void;

  rightBtnText: string;
  inputBtnText: string;
  leftBtnText?: string;

  maxElements: number;

  maxInputNum?: number;

  enteredValue: string;
  setEnteredValue: (val: string) => UnknownAction;
}

export function SortControlsPanel(props: Props) {
  const inputValueHandler = () => {
    const result = getArrFromInput(props.maxElements, props.enteredValue, props.maxInputNum);

    if (typeof result === "string") swal({ icon: "error", text: result });
    else {
      props.inputHandler(result as number[]);
      if (props.abortTrueHandler) props.abortTrueHandler();
      props.setEnteredValue("");
    }
  };

  return (
    <MediumCard isSmaller>
      <div
        className="grid grid-cols-3 justify-items-center
          "
      >
        {/* left button */}
        <button
          onClick={props.leftBtnHandler}
          className=" inline-block px-4 py-2.5 bg-lime-500 text-white font-medium text-md leading-tight  rounded shadow-md hover:bg-lime-600 hover:shadow-lg transition duration-150 ease-in-out"
        >
          {props.leftBtnText}
        </button>

        {/* input text box for value to push */}
        <SimulationInputGroup
          name="value"
          value={props.enteredValue}
          placeholder="e.g. 1,5,6,4"
          btnText={props.inputBtnText}
          onChange={props.setEnteredValue}
          btnOnClick={inputValueHandler}
        />

        {/* right button */}
        <button
          onClick={props.rightBtnHandler}
          className="inline-block px-4 py-2.5 bg-lime-500 text-white font-medium text-md leading-tight  rounded shadow-md hover:bg-lime-600 hover:shadow-lg transition duration-150 ease-in-out"
        >
          {props.rightBtnText}
        </button>
      </div>
    </MediumCard>
  );
}
