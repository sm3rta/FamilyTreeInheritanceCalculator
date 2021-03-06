import { Node } from "./types";

export function addNode(parent: Node | null | undefined, child: Node | null | undefined, type: string) {
	if (parent && child) {
		if (type === "child") {
			if (parent.children) {
				parent.children.push(child);
				if (parent.spouse) parent.spouse.children = parent.children;
			} else {
				parent.children = [child];
			}
			child.parent = parent;
		} else {
			parent.spouse = child;
			child.spouse = parent;
			child.children = parent.children;
		}
	}
}

export function deleteNode(node?: Node | null) {
	if (node?.parent?.children) {
		const index = node?.parent.children.findIndex((child) => child === node);
		node?.parent.children.splice(index, 1);
	}
}
