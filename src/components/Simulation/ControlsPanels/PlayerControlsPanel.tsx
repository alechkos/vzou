import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SpeedIcon from "@mui/icons-material/Speed";
import {
  Box,
  Button,
  ButtonGroup,
  createTheme,
  Slider,
  Stack,
  ThemeProvider,
  Tooltip,
} from "@mui/material";
import { FC } from "react";

import AnimationController from "../../../ClassObjects/AnimationController";

interface Props {
  controller: AnimationController<any, any>;
  isPlaying: boolean;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#78ab3a",
    },
    secondary: {
      main: "#78ab3a",
    },
  },
});
const PlayerControlsPanel: FC<Props> = ({ controller, isPlaying }) => (
  <ButtonGroup
    variant="outlined"
    aria-label="outlined button group"
    className="my-10 fixed bottom-0"
  >
    <ThemeProvider theme={theme}>
      <Tooltip
        title="Speed"
        arrow
      >
        <Box className="mt-1 mr-5 w-28">
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
          >
            <SpeedIcon
              color="primary"
              fontSize="large"
            />
            <Slider
              step={0.25}
              color="primary"
              defaultValue={1}
              min={0.25}
              max={2}
              onChange={(event: Event, newValue: number | number[]) => {
                controller.setSpeed(newValue as number);
              }}
            />
          </Stack>
        </Box>
      </Tooltip>
      <Tooltip
        title="Jump to start"
        arrow
      >
        <Button onClick={async () => controller.jumpToStart()}>
          <SkipPreviousIcon />
        </Button>
      </Tooltip>
      <Tooltip
        title="Previous frame"
        arrow
      >
        <Button onClick={async () => controller.playPreviousFrame()}>
          <ChevronLeftIcon />
        </Button>
      </Tooltip>
      {!isPlaying ? (
        <Tooltip
          title="Play"
          arrow
        >
          <Button
            onClick={async () => {
              await controller.playAnimation();
            }}
          >
            <PlayArrowIcon />
          </Button>
        </Tooltip>
      ) : (
        <Tooltip
          title="Pause"
          arrow
        >
          <Button
            onClick={async () => {
              await controller.pause();
            }}
          >
            <PauseIcon />
          </Button>
        </Tooltip>
      )}
      <Tooltip
        title="Next frame"
        arrow
      >
        <Button onClick={async () => controller.playNextFrame()}>
          <ChevronRightIcon />
        </Button>
      </Tooltip>
      <Tooltip
        title="Jump to end"
        arrow
      >
        <Button onClick={async () => controller.jumpToEnd()}>
          <SkipNextIcon />
        </Button>
      </Tooltip>
    </ThemeProvider>
  </ButtonGroup>
);

export default PlayerControlsPanel;
