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
  addValuesForHash,
  deleteValuesFromHash,
} from "../../store/reducers/alghoritms/hashTable-reducer";
import { buildHashTable } from "../../components/Simulation/HashTable/Helpers/HashTableHelpers";
import {
  chainingDelete,
  chainingInsert,
  chainingSearch,
  search,
  insert,
  deleteNode,
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

  async search(value: number, size: number, double?: string) {
    await this.playAlgorithm(search, this.memento, value, size, double);
  }

  async insert(value: number, size: number, double?: string) {
    await this.playAlgorithm(insert, this.memento, value, size, double);
    let i = value % size;
    let tempI = i;
    let flag = false;
    let hashNode = this.data;

    let y: HashTableNode | undefined = this.data;
    let id = 0;

    //Get max Id
    while (y) {
      if (id < y.id) id = y.id;
      let temp = y.listHead;
      while (temp) {
        if (id < temp.id) id = temp.id;
        temp = temp.next;
      }
      y = y.next;
    }

    id += 1;

    let j = 0;
    while (i < size) {
      hashNode = this.data;
      if (hashNode) {
        while (j < i && hashNode.next !== undefined) {
          hashNode = hashNode.next;
          j++;
        }
        if (hashNode?.listHead === undefined) {
          hashNode!.listHead = LinkedListNode.addNodeToHead(hashNode?.listHead, value, id);
          this.dispatch(addValuesForHash(value));
          flag = true;
        } else {
          if (!double) {
            i++;
            i %= size;
          } else {
            let k = 1 + (value % (size - 2));
            i = (k + i * k) % size;
          }
        }
        if (tempI === i || flag) break;
      }
      j = 0;
    }
    this.initData(this.data);
  }

  async delete(value: number, size: number, double?: string) {
    await this.playAlgorithm(deleteNode, this.memento, value, size, double);
    let i = value % size;
    let temp = i;
    let flag = false;
    let hashNode = this.data;

    let j = 0;
    while (i < size) {
      hashNode = this.data;
      if (hashNode) {
        while (j < i && hashNode.next !== undefined) {
          hashNode = hashNode.next;
          j++;
        }
        if (hashNode.listHead?.value === value) {
          hashNode!.listHead = LinkedListNode.deleteNodeFromHead(hashNode?.listHead);
          this.dispatch(deleteValuesFromHash(value));
          flag = true;
        } else {
          if (!double) {
            i++;
            i %= size;
          } else {
            let k = 1 + (value % (size - 2));
            i = (k + i * k) % size;
          }
        }
        if (temp === i || flag) break;
      }
      j = 0;
    }
    this.initData(this.data);
  }
}
