import AnimationController from "../AnimationController";
import { HashTableNode } from "./HashTableNode";
import { AppDispatch } from "../../store/store";
import { HashTableMemento } from "./HashTableMemento";
import {
  ActionType,
  Events,
  NodeRole,
} from "../../components/Simulation/BinaryTree/BinaryTreeTypes";
import {
  setActions,
  setCodeRef,
  setRoles,
  setPlaying,
  setHead,
  setPassedNodes,
  setError,
} from "../../store/reducers/alghoritms/hashTable-reducer";
import { buildHashTable } from "../../components/Simulation/HashTable/Helpers/HashTableHelpers";
import {
  chainingDelete,
  chainingInsert,
  chainingSearch,
  search,
  insert,
} from "./HashTableAlgorithms";
import { LinkedListNode } from "../LinkedList/LinkedListNode";

export class HashTableAnimationController extends AnimationController<
  HashTableNode | undefined,
  string
> {
  private static hashTableController: HashTableAnimationController | null = null;

  private constructor(head: HashTableNode | undefined, dispatch: AppDispatch) {
    super(dispatch, new HashTableMemento(), head);
  }

  static getController(head: HashTableNode | undefined, dispatch: AppDispatch) {
    if (!HashTableAnimationController.hashTableController) {
      HashTableAnimationController.hashTableController = new HashTableAnimationController(
        head,
        dispatch
      );
    }
    return HashTableAnimationController.hashTableController;
  }

  setPlaying(value: boolean) {
    this.dispatch(setPlaying(value));
  }

  setHead(head: HashTableNode | undefined) {
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

  setHashFromInput(arr: { size: number; keys: number[]; method: string; A: number }) {
    const head = buildHashTable(arr, this);
    this.data = head;
    this.setHead(head);
    this.memento.clearSnapshots();
    this.setCurrentActions([]);
    this.setCurrentRoles([]);
    this.setPassedNodes([]);
  }

  initData(data: HashTableNode | undefined) {
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
    this.setPassedNodes((this.memento as HashTableMemento).getPassedNodes(index));
    if (actions.length > 0 && actions[0].action === ActionType.ERROR) {
      this.setError(actions[0]?.error || "ERROR");
    }
  }

  setError(error: string) {
    this.dispatch(setError(error));
  }

  //---------------Algorithms-----------

  async chainingSearch(value: number, size: number, A?: number) {
    await this.playAlgorithm(chainingSearch, this.memento, value, size, A);
  }

  async chainingInsert(value: number, size: number, A?: number) {
    await this.playAlgorithm(chainingInsert, this.memento, value, size, A);
  }

  async chainingDelete(value: number, size: number, A?: number) {
    await this.playAlgorithm(chainingDelete, this.memento, value, size, A);
    let x = this.data;
    const index = !A ? value % size : Math.floor(size * ((value * A) % 1));
    if (x) {
      while (x.value !== index && x.next !== undefined) {
        x = x.next;
      }
      x.listHead = LinkedListNode.deleteByValue(x.listHead, value);
    }
    this.initData(this.data);
  }

  async search(value: number, size: number) {
    await this.playAlgorithm(search, this.memento, value, size);
  }

  async insert(value: number, size: number) {
    await this.playAlgorithm(insert, this.memento, value, size);
  }
}
