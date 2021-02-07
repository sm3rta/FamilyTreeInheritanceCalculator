import { Node, Gender } from "./types";

export const inheritanceCalculation = (node: Node) => {
  // if person is not married
  if (!node.spouse) {
      // if person is not married and has parents
    if (node.parent) {
      node.parent.money += (2 / 3) * node.money;
      node.parent.spouse.money += (1 / 3) * node.money;
      console.log("the person not married and has parents");
    }
      // if person is not married and has no parents
    console.log("the person not married and has no parents");
  } else {
    // if person is married and has children
    if (node.spouse && node.children.length) {
      if (node.parent) {
        let fatherShare = node.parent.money;
        let motherShare = node.parent.spouse.money;
        let spouseShare = node.spouse.money;
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
        console.log("if person is married and has one daughter")
        } else if (
          node.children.length > 1 &&
          node.children.map((child) => child.gender === Gender.MALE).length ===
            0
        ) {
          const childrenNumber = node.children.length;
          node.children.map(
            (child) => (child.money += ((2 / 3) * node.money) / childrenNumber)
          );
          fatherShare +=
            node.money - (((node.money * 2) / 6) * 2 * (1 / 8)) / 3;
        console.log("if person is married and has more than one daughter")

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
                (node.money - ((2 / 6) * (1 / 8) * node.money) / noOfShares) *
                2;
            } else {
              child.money +=
                node.money - ((2 / 6) * (1 / 8) * node.money) / noOfShares;
            }
            console.log(`every child takes ${child.money} and his gender is ${child.gender} cause MALE takes twice the share of FEMALE`);
          });  
        }
      } else {
        if (
          node.parent?.children.length > 1 &&
          node.parent?.children.map((child) => child.gender === Gender.MALE)
            .length
        ) {
          const noOfBrothers = node.parent.children.map(
            (child) => child.gender === Gender.MALE
          ).length;
          let spouseShare = node.spouse.money;
          let sharePartnerPercentage: number;
          if (node.spouse.gender === Gender.MALE) {
            sharePartnerPercentage = 0.25;
            spouseShare += sharePartnerPercentage * node.money;
          } else {
            sharePartnerPercentage = 1/8;
            spouseShare += sharePartnerPercentage * node.money;
          }
          if (
            node.children.length === 1 &&
            node.children[0].gender === Gender.FEMALE
          ) {
            node.children[0].money += 0.5 * node.money;
            node.parent.children.map((child) => {
              if (child.gender === Gender.MALE) {
                child.money += (node.money - 0.5 * node.money) / noOfBrothers;
              }
            });
          } else if (
            node.children.length > 1 &&
            node.children.map((child) => child.gender === Gender.MALE)
              .length === 0
          ) {
            const childrenNumber = node.children.length;
            node.children.map(
              (child) =>
                (child.money += ((2 / 3) * node.money) / childrenNumber)
            );
            node.parent.children.map((child) => {
              if (child.gender === Gender.MALE) {
                child.money +=
                  (node.money - (2 / 3) * node.money) / noOfBrothers;
              }
            });
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
                  (node.money -
                    (sharePartnerPercentage * node.money) / noOfShares) *
                  2;
              } else {
                child.money +=
                  node.money -
                  (sharePartnerPercentage * node.money) / noOfShares;
              }
            });
          }
        }
      }
    // if person is married and has children
    console.log("if person is married and has children")
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
  return node;
};
