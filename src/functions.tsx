import React, { Children } from "react";
import { Node } from "./types";

export function AddNode(parent: Node | null | undefined, child: Node | null | undefined) {
    console.log("ss");
    if (parent !== null && parent !== undefined && child !== null && child !== undefined) {
        parent.children?.push(child);
        child.parent = parent;
    }
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
