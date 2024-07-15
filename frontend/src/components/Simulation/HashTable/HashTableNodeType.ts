export interface HashTableNodeType {
  id: number;
  value: number;
  prev?: HashTableNodeType;
  next?: HashTableNodeType;
}
