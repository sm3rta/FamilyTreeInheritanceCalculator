export enum Gender {
  MALE,
  FEMALE,
}

export interface Node {
  name: string;
  gender: Gender;
  living: boolean;
  money: number;
  spouse?: Node;
  children?: Node[];
  parent: Node | null;
}
