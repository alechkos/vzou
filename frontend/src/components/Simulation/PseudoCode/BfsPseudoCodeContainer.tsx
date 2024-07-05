import { Drawer as MuiDrawer } from "@mui/material";
import React, { FC, useState } from "react";
import { Spin as Hamburger } from "hamburger-react";
import styles from "./PseudoCodeWrapper.module.css";
import { SubjectImg } from "../../UI/SubjectImg";
import headlinePhoto from "../../../assets/Algorithms/PseudoCode.png";

interface Props {
  visible: boolean;
  currentLine: number;
}

const BfsPseudoCodeContainer: FC<Props> = ({ visible, currentLine }) => {
  const [open, setOpen] = useState(true);

  const pseudoCode = [
    "0. BFS(G,s)",
    "1. For each v in V",
    "2.     d[v]=infinity",
    "3.     п[v]=NIL",
    "4.     color[v]=WHITE",
    "5. Q=empty group",
    "6. d[s]=0",
    "7. color[s]=GRAY",
    "8. Enqueue(Q,s)",
    "9. While(Q not equal empty group){",
    "10.     u=dequeue(Q)",
    "11.     for each v in Adj[u]",
    "12.         if(color[v]=WHITE)",
    "13.             d[v]=d[u]+1",
    "14.             п[v]=u",
    "15.             color[v]=GRAY",
    "16.             Enqueue(Q,v)",
    "17.     color[u]=BLACK",
    "18. }",
    "19. }",
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
            toggle={setOpen}
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
          <div className={styles.hamburgerWrapper}>
            <Hamburger
              toggled={open}
              toggle={setOpen}
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

export default BfsPseudoCodeContainer;
