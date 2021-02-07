import { Node, Gender } from "./types";

export const inheritanceCalculation = (node: Node) => {
	// if person is not married
	if (!node.spouse) {
		// if person is not married and has parents
		if (node.parent) {
			if (node.parent.gender === Gender.MALE) {
				node.parent.money += (2 / 3) * node.money;
				if (node.parent.spouse) {
					node.parent.spouse.money += (1 / 3) * node.money;
				}
			} else {
				node.parent.money += (1 / 3) * node.money;
				if (node.parent.spouse) {
					node.parent.spouse.money += (2 / 3) * node.money;
				}
			}

			console.log("the person not married and has parents");
		}
		// if person is not married and has no parents
	} else {
		// if person is married and has children
		if (node.spouse && node.children?.length) {
			console.log("person has spouse and children");
			if (node.parent) {
				if (node.parent.spouse) {
					console.log("Enyered");
					let fatherShare = node.parent.spouse?.money;
					console.log(fatherShare);
					console.log(node.parent.spouse?.money);
					let motherShare = node.parent.money;
					if (node.parent.gender === Gender.MALE) {
						fatherShare = node.parent.money;
						motherShare = node.parent.spouse?.money;
					}
					let spouseShare = node.spouse.money;
					if (node.spouse.gender === Gender.MALE) {
						spouseShare += 0.25 * node.money;
					} else {
						spouseShare += (1 / 8) * node.money;
					}
					fatherShare += (1 / 6) * node.money;
					console.log(fatherShare);
					console.log(node.parent.money);
					console.log(node.parent.spouse.money);

					if (node.parent.spouse) {
						motherShare += (1 / 6) * node.money;
					} else {
						fatherShare += (1 / 6) * node.money;
					}
					if (node.children.length === 1 && node.children[0].gender === Gender.FEMALE) {
						node.children[0].money += 0.5 * node.money;
						fatherShare += node.money - ((node.money * 2) / 6) * 0.5 * (1 / 8);
						console.log("if person is married and has one daughter");
					} else if (
						node.children.length > 1 &&
						node.children.map((child) => child.gender === Gender.MALE).length === 0
					) {
						const childrenNumber = node.children.length;
						node.children.map((child) => (child.money += ((2 / 3) * node.money) / childrenNumber));
						fatherShare += node.money - (((node.money * 2) / 6) * 2 * (1 / 8)) / 3;
						console.log("if person is married and has more than one daughter");
					} else if (node.children.map((child) => child.gender === Gender.MALE).length) {
						const maleCount = node.children.filter((child) => child.gender === Gender.MALE).length;
						let noOfShares: number = maleCount * 2 + (node.children.length - maleCount);
						console.log(noOfShares);
						node.children.map((child) => {
							if (child.gender === Gender.MALE) {
								child.money += ((node.money - (2 / 6) * (1 / 8) * node.money) / noOfShares) * 2;
							} else {
								child.money += (node.money - (2 / 6) * (1 / 8) * node.money) / noOfShares;
							}
							console.log(
								`every child takes ${child.money} and his gender is ${child.gender} cause MALE takes twice the share of FEMALE`,
							);
						});
						if (node.parent.gender === Gender.MALE) {
							node.parent.money = fatherShare;
							node.parent.spouse.money = motherShare;
						} else {
							node.parent.money = motherShare;
							node.parent.spouse.money = fatherShare;
						}
					}
				} else {
					let parentShare = node.parent.money;
					let spouseShare = node.spouse.money;
					parentShare += (1 / 6) * node.money;

					if (node.spouse.gender === Gender.MALE) {
						spouseShare += 0.25 * node.money;
					} else {
						spouseShare += (1 / 8) * node.money;
					}
					if (node.children.length === 1 && node.children[0].gender === Gender.FEMALE) {
						node.children[0].money += 0.5 * node.money;
						parentShare += node.money - ((node.money * 1) / 6) * 0.5 * (1 / 8);
						console.log("if person is married and has one daughter");
					} else if (
						node.children.length > 1 &&
						node.children.map((child) => child.gender === Gender.MALE).length === 0
					) {
						const childrenNumber = node.children.length;
						node.children.map((child) => (child.money += ((2 / 3) * node.money) / childrenNumber));
						parentShare += node.money - ((((node.money * 1) / 6) * 2) / 3) * (1 / 8);
						console.log("if person is married and has more than one daughter");
					} else if (node.children.map((child) => child.gender === Gender.MALE).length) {
						const maleCount = node.children.map((child) => child.gender === Gender.MALE).length;
						let noOfShares: number = maleCount * 2 + (node.children.length - maleCount);
						parentShare += node.money - (((node.money * 2) / 6) * 2 * (1 / 8)) / 3;
						console.log(noOfShares);
						node.children.map((child) => {
							if (child.gender === Gender.MALE) {
								child.money += (node.money - ((2 / 6) * (1 / 8) * node.money) / noOfShares) * 2;
							} else {
								child.money += node.money - ((2 / 6) * (1 / 8) * node.money) / noOfShares;
							}
							parentShare += node.money - ((((node.money * 1) / 6) * 2) / 3) * (1 / 8);
							console.log(
								`every child takes ${child.money} and his gender is ${child.gender} cause MALE takes twice the share of FEMALE`,
							);
						});

						node.parent.money = parentShare;
					}
				}
			}
			// if person is married and has children
			console.log("if person is married and has children");
			// if person is married and has not children
		} else if (node.spouse && node.children?.length === 0) {
			if (node.parent) {
				if (node.parent.spouse) {
					node.parent.spouse.money += (1 / 6) * node.money;
				}
				// if person is female
				if (node.spouse.gender === Gender.MALE) {
					node.spouse.money += 0.5 * node.money;
					node.parent.money += (1 / 6) * node.money + (node.money - (2 / 6) * 0.5 * node.money);
				} else {
					// if person is male
					node.spouse.money += 0.25 * node.money;
					node.parent.money += (1 / 6) * node.money + (node.money - (2 / 6) * 0.25 * node.money);
				}
			}
		}
	}
	return node;
};
