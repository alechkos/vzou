import AnimationController from "../AnimationController";
import { LinkedListNode } from "./LinkedListNode";
import { AppDispatch } from "../../store/store";
import { LinkedListMemento } from "./LinkedListMemento";
import {
  setHead,
  setPlaying,
  setRoles,
  setCodeRef,
  setPassedNodes,
  setActions,
  setError,
  setLength,
  addNodeToHead,
  deleteNodeFromHead,
  addNodeToTail,
  deleteNodeFromTail,
} from "../../store/reducers/alghoritms/linkedList-reducer";
import { buildLinkedList } from "../../components/Simulation/LinkedList/Helpers/LinkedListHelpers";
import {
  ActionType,
  Events,
  NodeRole,
} from "../../components/Simulation/BinaryTree/BinaryTreeTypes";
import {
  searchWithAnimations,
  insertToHeadWithAnimations,
  deleteFromHeadWithAnimations,
  insertToTailWithAnimations,
  deleteFromTailWithAnimations,
} from "./LinkedListAlgorithms";

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

  setLengthOfList(length: number) {
    this.dispatch(setLength(length));
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

  initData(data: LinkedListNode | undefined) {
    this.setReference({ name: this.memento.getCurrentAlg(), line: 0 });
    this.setHead(data);
    this.setCurrentActions([]);
    this.setCurrentRoles([]);
    this.setPassedNodes([]);
  }

  setAllData(index: number) {
    const actions = this.memento.getActions(index);
    this.setHead(this.memento.getData(index));
    this.setCurrentActions(actions);
    this.setCurrentRoles(this.memento.getRoles(index));
    this.setReference(this.memento.getCodeRef(index));
    this.setPassedNodes((this.memento as LinkedListMemento).getPassedNodes(index));
    if (actions.length > 0 && actions[0].action === ActionType.ERROR) {
      this.setError(actions[0]?.error || "ERROR");
    }
  }

  setError(error: string) {
    this.dispatch(setError(error));
  }

  //---------------Algorithms-----------

  async search(value: number) {
    await this.playAlgorithm(searchWithAnimations, this.memento, value);
  }

  async insertToHead(value: number) {
    await this.playAlgorithm(insertToHeadWithAnimations, this.memento, value);
    setLength(LinkedListNode.getLengthOfList(this.data));
    this.dispatch(addNodeToHead(value));
  }

  async insertToTail(value: number) {
    await this.playAlgorithm(insertToTailWithAnimations, this.memento, value);
    setLength(LinkedListNode.getLengthOfList(this.data));
    this.dispatch(addNodeToTail(value));
  }

  async deleteFromHead(value: number) {
    await this.playAlgorithm(deleteFromHeadWithAnimations, this.memento, this);
    setLength(LinkedListNode.getLengthOfList(this.data));
    this.dispatch(deleteNodeFromHead());
  }

  async deleteFromTail(value: number) {
    await this.playAlgorithm(deleteFromTailWithAnimations, this.memento, this);
    const tail = LinkedListNode.getTailOfList(this.data);
    this.data = LinkedListNode.deleteNodeFromTail(this.data, tail);
    setLength(LinkedListNode.getLengthOfList(this.data));
    this.dispatch(deleteNodeFromTail());
    this.initData(this.data);
  }
}
