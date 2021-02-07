import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import { Node } from "./types";

const transformTreeData = (treeRootNode: Node) => {
  const { name, children, ...rest } = treeRootNode;
  const treeRoot: RawNodeDatum = {
    name,
    children: children?.map((node) => transformTreeData(node)) ?? undefined,
    // @ts-ignore
    attributes: { ...rest },
  };

  return treeRoot;
};
export default transformTreeData;
