import { Node } from "./types";

export function AddNode(parent: Node | null | undefined, child: Node | null | undefined, type: string) {
    if (parent && child) {
        if (type === "child") {
            if (parent.children) {
                parent.children.push(child);
            } else {
                parent.children = [child];
            }
            child.parent = parent;
        } else {
            parent.spouse = child;
        }
    }
}

export function DeleteNode(parent: Node | null | undefined, childToRemoveName: string | undefined) {
    if (parent !== null && parent !== undefined) {
        parent.children?.forEach((child, index) => {
            if (child.name === childToRemoveName) {
                parent.children?.splice(index, 1);
            }
        });
    }
}
