import { Memento } from "../Memento";
import { LinkedListNode } from "./LinkedListNode";

export class LinkedListMemento extends Memento<LinkedListNode | undefined, string> {
  constructor() {
    super("Search");
  }
}
