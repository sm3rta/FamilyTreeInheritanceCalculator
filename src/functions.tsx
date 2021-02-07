import React from "react";
import { Node } from "./App";

export function AddNode(props: Node) {
    let newChild = {
        name: props.name,
        gender: props.gender,
        living: props.living,
        money: props.money,
        spouse: props.spouse,
        children: props.children,
        parent: props.parent,
    };
    return newChild;
}
