import { Node, Gender } from "./App";

// let node : Node = {
//     name: "yousif",
//     living: false,
//     money: 800,
//     gender: Gender.MALE,
//     spouse: {
//         name: "shahenda",
//         living: true,
//         money: 500,
//         spouse: undefined,
//         parent: null,
//         gender: Gender.FEMALE,
//         children: [],
//     },
//     children: [{
//         name: "x",
//         living: true,
//         money: 300,
//         spouse: null,
//         gender: Gender.FEMALE,
//         parent: null,
//         children: []
//     }],
//     parent: null
// }

export const inheritanceCalculation = (node: Node) => {
  // if person is not married
  if (!node.spouse) {
    node.parent.money += (2 / 3) * node.money;
    node.parent.spouse.money += (1 / 3) * node.money;
  } else {
    // if person is married and has children
    if (node.spouse && node.children.length) {
      let fatherShare: number = node.parent.money;
      let motherShare: number = node.parent.spouse.money;
      let spouseShare: number = node.spouse.money;
      if (node.spouse.gender === Gender.MALE) {
        spouseShare += 0.25 * node.money;
      } else {
        spouseShare += (1 / 8) * node.money;
      }
      fatherShare += (1 / 6) * node.money;
      motherShare += (1 / 6) * node.money;
      if (
        node.children.length === 1 &&
        node.children[0].gender === Gender.FEMALE
      ) {
        node.children[0].money += 0.5 * node.money;
        fatherShare += node.money - ((node.money * 2) / 6) * 0.5 * (1 / 8);
      } else if (
        node.children.length > 1 &&
        node.children.map((child) => child.gender === Gender.MALE).length === 0
      ) {
        const childrenNumber = node.children.length;
        node.children.map(
          (child) => (child.money += ((2 / 3) * node.money) / childrenNumber)
        );
        fatherShare += node.money - (((node.money * 2) / 6) * 2 * (1 / 8)) / 3;
      } else if (
        node.children.map((child) => child.gender === Gender.MALE).length
      ) {
        const maleCount = node.children.map(
          (child) => child.gender === Gender.MALE
        ).length;
        let noOfShares: number =
          maleCount * 2 + (node.children.length - maleCount);
        node.children.map((child) => {
          if (child.gender === Gender.MALE) {
            child.money +=
              (node.money - ((2 / 6) * (1 / 8) * node.money) / noOfShares) * 2;
          } else {
            child.money +=
              node.money - ((2 / 6) * (1 / 8) * node.money) / noOfShares;
          }
        });
        node.children[0].money += node.money - (2 / 6) * (1 / 8) * node.money;
      }
      // if person is married and has not children
    } else if (node.spouse && !node.children.length) {
      node.parent.spouse.money += (1 / 6) * node.money;
      // if person is female
      if (node.spouse.gender === Gender.MALE) {
        node.spouse.money += 0.5 * node.money;
        node.parent.money +=
          (1 / 6) * node.money + (node.money - (2 / 6) * 0.5 * node.money);
      } else {
          // if person is male
        node.spouse.money += 0.25 * node.money;
        node.parent.money +=
          (1 / 6) * node.money + (node.money - (2 / 6) * 0.25 * node.money);
      }
    }
  }
};
