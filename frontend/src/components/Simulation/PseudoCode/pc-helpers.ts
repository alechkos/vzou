import SortController from "../../../ClassObjects/SortControllers/SortController";

export interface PseudoProps {
  line: number;
  code: PseudoItem[];
  width?: number;
  children?: JSX.Element | JSX.Element[];
}

export interface AnimationWrraperProps extends PseudoProps {
  controller?: SortController;
  showPseudoCode?: boolean;
}

export interface PseudoItem {
  text: string;
  tabAmount: number;
}
