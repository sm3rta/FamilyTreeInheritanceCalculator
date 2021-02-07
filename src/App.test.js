import { inheritanceCalculation } from "./inhertitance-calculations";
import { Gender } from "./types";

test("inheritance 1", () => {
	const money = 6000;
	const Samir = {
		name: "Samir",
		gender: Gender.MALE,
		living: true,
		money: 0,
		parent: null,
	};

	const Nagwa = {
		name: "Nagwa",
		gender: Gender.FEMALE,
		living: true,
		money: 0,
		parent: null,
	};

	Samir.spouse = Nagwa;
	Nagwa.spouse = Samir;

	const Samy = {
		name: "Samy",
		gender: Gender.MALE,
		living: true,
		money: money,
		parent: Samir,
	};

	const Rasha = {
		name: "Rasha",
		gender: Gender.FEMALE,
		living: true,
		money: 0,
		parent: null,
	};

	Samy.spouse = Rasha;
	Rasha.spouse = Samy;

	Samir.children = Nagwa.children = [Samy];

	const Noha = {
		name: "Noha",
		gender: Gender.FEMALE,
		living: true,
		money: 0,
		parent: Samy,
	};

	const Hossam = {
		name: "Hossam",
		gender: Gender.MALE,
		living: true,
		money: 0,
		parent: Samy,
	};

	Samy.children = Rasha.children = [Noha, Hossam];

	inheritanceCalculation(Samy);

	[Samir, Nagwa, Rasha, Noha, Hossam].forEach((node) => {
		console.log(node.name, node.money);
	});

	// expect(parent.living).toEqual(false);
	// expect(parent.money).toEqual(0);
	expect(Samir.money).toEqual((1 / 6) * money);
	expect(Nagwa.money).toEqual((1 / 6) * money);
	expect(Rasha.money).toEqual((1 / 8) * money);
	const rest = money * (1 - (1 / 8 + 1 / 6 + 1 / 6));
	console.log("rest", rest);
	expect(Noha.money).toEqual((1 / 3) * rest);
	expect(Hossam.money).toEqual((2 / 3) * rest);
});
