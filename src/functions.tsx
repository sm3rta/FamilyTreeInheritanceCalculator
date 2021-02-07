import React, { Children } from "react";
import { Node } from "./types";

export function AddNode(parent: Node, child: Node) {
    parent.children?.push(child);
    child.parent = parent;
}

export function DeleteNode(parent: Node | null | undefined, childToRemoveName: string | undefined) {
    if (parent !== null && parent !== undefined) {
        parent.children?.map((child, index) => {
            if (child.name === childToRemoveName) {
                parent.children?.splice(index, 1);
            }
        });
    }
}
