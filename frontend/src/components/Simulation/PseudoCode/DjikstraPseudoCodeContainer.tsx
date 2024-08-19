import { Drawer as MuiDrawer } from "@mui/material";
import React, { useEffect, FC, useState } from "react";
import { Spin as Hamburger } from "hamburger-react";
import styles from "./PseudoCodeWrapper.module.css";
import { SubjectImg } from "../../UI/SubjectImg";
import headlinePhoto from "../../../assets/Algorithms/PseudoCode.png";

interface Props {
  visible: boolean;
  currentLine: number;
  open: boolean;
  toggleOpen: () => void;
}

const DjikstraPseudoCodeContainer: FC<Props> = ({ visible, currentLine, open, toggleOpen }) => {
  //const [open, setOpen] = useState(true);
  console.log("The open is ", open);
  console.log("The visible is ", visible);
  useEffect(() => {
    console.log("Current open state:", open);
  }, [open]);

  const pseudoCode = [
    "0. Djikstra(G,w,s){",
    "1. For each v in V",
    "2.     d[v]=infinity",
    "3.     п[v]=NIL",
    "4. d[s]=0",
    "5. S = ∅",
    "6. Q = Build_Heap(V)",
    "7. While(Q ≠ ∅){",
    "8.    u=Extract_Min(Q)",
    "9.    S = S U {u}",
    "10.   for each v in Adj[u]",
    "11.       if(v ∉ S)",
    "12.           Relax(u,v,w)",
    "13. }",
    "14.}",
    "15.",
    "16.Relax(u,v,w){",
    "17.if(d[v]>d[u]+w(u,v)){",
    "18.    d[v]=d[u]+w(u,v)",
    "19.    П[v]=u",
    "20.}",
  ];

  return (
    <div className={styles.pseudoCodeWrapper}>
      {!open && (
        <div className={styles.hamburgerWrapper2}>
          <SubjectImg
            name="Pseudo code"
            src={headlinePhoto}
            width="180px"
          />
          <Hamburger
            toggled={open}
            toggle={toggleOpen}
            direction="left"
            size={30}
            rounded
            duration={0.8}
          />
        </div>
      )}
      {open && (
        <MuiDrawer
          variant="permanent"
          elevation={11}
          anchor="right"
          ModalProps={{ disableEnforceFocus: true }}
          PaperProps={{
            style: {
              minWidth: "fit-content",
              height: "auto",
              top: "80px", // here setting for move the pseudocode up or down
              marginRight: -50,
              border: "none",
              background: "transparent",
              padding: 50,
            },
          }}
          open={visible}
        >
          {/* our x for close pseudocode */}
          <div className={styles.hamburgerWrapper}>
            <Hamburger
              toggled={open}
              toggle={toggleOpen}
              direction="left"
              size={30}
              rounded
              duration={0.8}
            />
          </div>
          <div className={styles.pseudoCodeContainer}>
            <SubjectImg
              name="Pseudo code"
              src={headlinePhoto}
              width="180px"
            />
            {pseudoCode.map((line, index) => (
              <div
                key={index}
                className={index === currentLine ? styles.highlighted : ""}
              >
                {line}
              </div>
            ))}
          </div>
        </MuiDrawer>
      )}
    </div>
  );
};

export default DjikstraPseudoCodeContainer;
