import { Node } from "./types";

export function AddNode(
  parent: Node | null | undefined,
  child: Node | null | undefined
) {
  if (parent && child) {
    if (parent.children) {
      parent.children.push(child);
    } else {
      parent.children = [child];
    }
    child.parent = parent;
  }
}

export function DeleteNode(
  parent: Node | null | undefined,
  childToRemoveName: string | undefined
) {
  if (parent !== null && parent !== undefined) {
    parent.children?.map((child, index) => {
      if (child.name === childToRemoveName) {
        parent.children?.splice(index, 1);
      }
    });
  }
}
