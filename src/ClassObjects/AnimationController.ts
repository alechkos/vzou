/* eslint @typescript-eslint/ban-types: warn */

import { Memento } from "./Memento";

import { NodeRole } from "../components/Simulation/BinaryTree/BinaryTreeTypes";
import { AppDispatch } from "../store/store";
import { sleepWithID } from "../utils/animation-helpers";

/** Generic class used to group together the similar functionalities of every animation controller.
 * An animation controller is the boxed grouping of buttons in charge of the algorithms.
 *
 * A 'controller' consists of controls over things such as: speed, frames, pausing, stopping, etc.
 */
abstract class AnimationController<T, Y> {
  speed: number;

  stopFlag: boolean;

  pauseFlag: boolean;

  frame: number;

  dispatch: AppDispatch;

  timeOutsArr: NodeJS.Timeout[];

  memento: Memento<T, Y>;

  data: T;

  protected constructor(dispatch: AppDispatch, memento: Memento<T, Y>, data: T) {
    this.speed = 1;
    this.pauseFlag = false;
    this.stopFlag = false;
    this.timeOutsArr = [];
    this.frame = 0;
    this.dispatch = dispatch;
    this.memento = memento;
    this.data = data;
  }

  /** Stops all other animations, and prepares the data for a new animation.
   *
   */
  async initNewAnimation() {
    // Stop all previous actions.
    this.stopFlag = true;
    this.clearTimeOuts();

    // Check if we're starting a new animation directly after an existing one, if so - copy the last relevant data.
    if (this.memento.getLength()) {
      this.data = this.memento.getLastData();
      this.initData(this.data);
    } else {
      this.setCurrentRoles([]);
    }
    this.memento.clearSnapshots();
    this.stopFlag = false;
  }

  /** This function handles the control over the frame-by-frame playing of animations
   *  If at any point the stopFlag is set to true, the animation is stopped, and the data array is set to the last relevant data.
   *  If the pauseFlag is set to true, the animation simply pauses.
   */

  async playAnimation(...args: any[]) {
    this.setPlaying(true);
    this.pauseFlag = false;
    for (let i = this.frame; i < this.memento.getLength(); i++) {
      this.frame = i;
      if (this.stopFlag) {
        this.initData(this.memento.getLastData());
        return;
      }
      if (this.pauseFlag) {
        return;
      }
      this.setAllData(i); // Pass the index of the current frame, so that every array is set to values in that index.
      await sleepWithID(500 * this.speed, this.timeOutsArr);
    }
    this.setReference({ name: this.memento.getCurrentAlg(), line: 0 }); // Set the reference to the first frame.
    this.setPlaying(false);
  }

  /** This function receives an algorithm to execute, and the arguments, and executes it while retaining a reference to it.
   *
   * @param algFunc - the algorithm to execute
   * @param args - the arguments to pass to the algorithm
   */
  async playAlgorithm(algFunc: Function, ...args: any[]) {
    await this.initNewAnimation();
    const data = Array.isArray(this.data) ? [ ...this.data ] : this.data; // de-structure data if it's an array
    algFunc(data, ...args);
    this.setReference({ name: this.memento.getCurrentAlg(), line: 0 });
    this.frame = 0;
    await this.playAnimation();
  }

  setSpeed(speed: number) {
    this.speed = 1 / speed;
  }

  /** simply pause and make sure there's no timeouts awaiting to finish.
   *
   */
  async pause() {
    this.pauseFlag = true;
    this.clearTimeOuts();
    this.setPlaying(false);
  }

  async jumpToEnd() {
    await this.jumpToFrame(this.memento.getLength() - 1);
    this.setCurrentRoles([]);
  }

  /** Simple jump to a specific frame, while checking edge cases.
   *
   * @param frame - the frame number to jump to
   */
  async jumpToFrame(frame: number) {
    if (!this.memento) {
      return;
    }
    if (frame >= this.memento.getLength()) {
      this.frame = this.memento.getLength();
      return;
    }
    if (frame < 0) {
      this.frame = 0;
      return;
    }
    this.frame = frame;
    await this.pause();
    this.setAllData(this.frame);
  }

  async jumpToStart() {
    await this.jumpToFrame(0);
  }

  async playNextFrame() {
    await this.jumpToFrame(this.frame + 1);
  }

  async playPreviousFrame() {
    await this.jumpToFrame(this.frame - 1);
  }

  clearTimeOuts() {
    // Since we use an array of timeouts, and enable many hot-swaps of functionalities on each page,
    // it is very possible you would do an action that changes some context, only for it to be overridden
    // right after because of a timeout that wasn't cleared.
    this.timeOutsArr.forEach((timeOut) => {
      clearTimeout(timeOut);
    });
    this.timeOutsArr = [];
  }

  setAllData(frame: number) {
    // implement in subclasses
  }

  initData(...args: any[]) {
    // implement in subclasses
  }

  setReference(ref: any) {
    // implement in subclasses
  }

  setCurrentRoles(roles: NodeRole[]) {
    // implement in subclasses
  }

  setPlaying(value: boolean) {
    // implement in subclasses
  }
}

export default AnimationController;
