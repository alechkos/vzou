import { AnimatePresence, motion, useCycle } from "framer-motion";
import { Spin as Hamburger } from "hamburger-react";
import { useState } from "react";

import { PseudoProps } from "./pc-helpers";
import styles from "./PseudoCodeWrapper.module.css";

import headlinePhoto from "../../../assets/Algorithms/PseudoCode.png";
import { SubjectImg } from "../../UI/SubjectImg";

export function PseudoCode(props: PseudoProps) {
  const [open, setOpen] = useState(true);
  // const [open, cycleOpen] = useCycle(true, false);
  console.log(props.code);
  return (
    <div className={"z-50 " + styles["div-side"]}>
      <div className={styles["button-div"]}>
        <Hamburger
          toggled={open}
          toggle={setOpen}
          direction="left"
          size={30}
          rounded
          duration={0.8}
        />
      </div>

      <AnimatePresence mode="wait">
        {open && (
          <motion.aside
            className={styles["aside-side"]}
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: props.width ? props.width : "fit-content",
              borderWidth: "2px",
              borderRadius: "10px",
              borderColor: "#ecfccb",
              opacity: 1,
              transition: { duration: 0.5 },
            }}
            exit={{
              width: 0,
              opacity: 0,
              transition: { duration: 1 },
            }}
          >
            <motion.ul
              className="px-2"
              style={{ textAlign: "left" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              <SubjectImg
                name="Pseudo code"
                src={headlinePhoto}
                width="180px"
              />
              <br />

              {props.code.map((l, index) => (
                <motion.li
                  key={index}
                  initial={{ backgroundColor: "#ecfccb" }}
                  animate={{
                    backgroundColor: index === props.line ? "#a3e635" : "#ecfccb",
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  exit={{ transition: { duration: 0.1 } }}
                >
                  <span>
                    {index}
                    .&emsp;
                  </span>
                  {
                    // this section responsable for the tabs before each line
                    [...Array(l.tabAmount)].map((x, i) => (
                      <span key={i}>&emsp;</span>
                    ))
                  }
                  <span>{l.text}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
