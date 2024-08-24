import React from "react";
import { useDispatch } from "react-redux";
import { UnknownAction } from "redux";

interface Props {
  name: string;
  value: string;
  placeholder?: string;
  maxVal?: number;
  btnText?: string;
  btnOnClick?: () => void;
  onChange: (s: string) => UnknownAction | void;

  disable?: boolean;
}

function SimulationInputGroup(props: Props) {
  const dispatch = useDispatch();

  return (
    <div className="relative w-56 rounded-md shadow-sm mr-2">
      <input
        type="text"
        name="value"
        id="input"
        className="block w-max p-2 h-10 rounded-md border border-gray-600 "
        placeholder={props.placeholder}
        maxLength={props.maxVal}
        value={props.value}
        onChange={(e) => {
          const action = props.onChange(e.currentTarget.value);
          if (action !== undefined) {
            dispatch(props.onChange(e.currentTarget.value) as UnknownAction);
          } else props.onChange(e.currentTarget.value);
        }} // update the state value to be set as the input
      />
      <div className="absolute inset-y-0 -right-[28px] flex items-center">
        <button
          onClick={props.btnOnClick}
          disabled={props.disable !== undefined ? props.disable : false}
          id="input-button"
          className=" inline-block px-4 py-2.5 bg-lime-500 text-white font-medium text-md leading-tight  shadow-md hover:bg-lime-600 hover:shadow-lg transition duration-150 ease-in-out rounded-r-md "
        >
          {props.btnText ? props.btnText : "BTN"}
        </button>
      </div>
    </div>
  );
}

export default SimulationInputGroup;
