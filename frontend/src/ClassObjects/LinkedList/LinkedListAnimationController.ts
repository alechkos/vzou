import AnimationController from "../AnimationController";
import { LinkedListNode } from "./LinkedListNode";
import { AppDispatch } from "../../store/store";
import { LinkedListMemento } from "./LinkedListMemento";
import {setHead, setPlaying, setRoles, setCodeRef, setPassedNodes, setActions} from "../../store/reducers/alghoritms/linkedList-reducer";
import { buildLinkedList } from "../../components/Simulation/LinkedList/Helpers/LinkedListHelpers";
import {Events, NodeRole} from "../../components/Simulation/BinaryTree/BinaryTreeTypes";

export class LinkedListAnimationController extends AnimationController<
  LinkedListNode | undefined,
  string
> {
  private static linkedListController: null | LinkedListAnimationController = null;

  private constructor(head: LinkedListNode | undefined, dispatch: AppDispatch) {
    super(dispatch, new LinkedListMemento(), head);
  }

  static getController(head: LinkedListNode | undefined, dispatch: AppDispatch) {
    if (!LinkedListAnimationController.linkedListController)
      LinkedListAnimationController.linkedListController = new LinkedListAnimationController(
        head,
        dispatch
      );
    return LinkedListAnimationController.linkedListController;
  }

  setPlaying(value: boolean) {
    this.dispatch(setPlaying(value));
  }

  setHead(head: LinkedListNode | undefined) {
    this.dispatch(setHead(head));
  }

  setCurrentRoles(roles: NodeRole[]) {
    this.dispatch(setRoles(roles));
  }

  setCurrentActions(actions: Events) {
    this.dispatch(setActions(actions));
  }

  setReference(ref: any) {
    this.dispatch(setCodeRef(ref));
  }

  setPassedNodes(passedNodes: number[]) {
    this.dispatch(setPassedNodes(passedNodes));
  }

  setListFromInput(arr: number[]) {
    const head = buildLinkedList(arr);
    this.data = head;
    this.setHead(head);
    this.memento.clearSnapshots();
    this.setCurrentActions([]);
    this.setCurrentRoles([]);
    this.setPassedNodes([]);
  }


}
