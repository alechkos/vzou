import { ActionType } from "../BinaryTree/BinaryTreeTypes";
import { AnimationProps } from "framer-motion";
import React from "react";

export function getAnimationsAndStylesForRow(
  action: ActionType,
  nodeInteractionPosition: { y: number; x: number } | null,
  myPosition?: { y: number; x: number }
): {
  initial: AnimationProps["initial"];
  animate: AnimationProps["animate"];
  style: React.CSSProperties;
} {
  let initial = {};
  let animate = {};
  const style = {};
  switch (action) {
    case ActionType.CHANGE: {
      initial = {
        opacity: 0,
        scale: 0.5,
      };
      animate = {
        opacity: 1,
        scale: 1,
      };
      break;
    }
    case ActionType.ADD: {
      initial = {
        opacity: 0,
      };
      animate = {
        opacity: 1,
      };
      break;
    }
    case ActionType.HIGHLIGHT_FULL: {
      animate = { backgroundColor: "#309975" };
      break;
    }
    case ActionType.SWAP: {
      if (!nodeInteractionPosition || !myPosition) {
        throw new Error(`nodeInteractionPosition and myPosition are required\n 
                  nodeInteractionPosition: ${nodeInteractionPosition}\n myPosition: ${myPosition}`);
      }
      initial = {
        y: nodeInteractionPosition.y - myPosition.y,
        x: nodeInteractionPosition.x - myPosition.x,
      };
      animate = {
        x: 0,
        y: 0,
        backgroundColor: "#125f2c",
      };
      break;
    }
    case ActionType.HIGHLIGHT_LIGHT: {
      animate = { backgroundColor: "#58b368" };
      break;
    }
    case ActionType.NONE: {
      break;
    }
    default: {
      break;
    }
  }
  return { initial, animate, style };
}
