import { Gender, Node } from "./types";

const grandparent: Node = {
  name: "John Doe",
  gender: Gender.MALE,
  living: true,
  money: 500000,
  parent: null,
  spouse: {
    name: "Jane Doe",
    gender: Gender.FEMALE,
    living: true,
    money: 50000,
    parent: null,
  },
};

grandparent.children = [
  {
    name: "Emily",
    gender: Gender.FEMALE,
    living: true,
    money: 500000,
    parent: grandparent,
    spouse: {
      name: "Peter",
      gender: Gender.MALE,
      living: true,
      money: 500000,
      parent: null,
    },
  },
  {
    name: "Sophie",
    gender: Gender.FEMALE,
    living: true,
    money: 500000,
    parent: grandparent,
    children: [
      {
        name: "Ahmad",
        gender: Gender.MALE,
        living: true,
        money: 500000,
        parent: null,
      },
    ],
  },
  {
    name: "Ahmad",
    gender: Gender.MALE,
    living: true,
    money: 500000,
    parent: grandparent,
  },
];

const emily = grandparent.children[0];
emily.children = [
  {
    name: "Emily",
    gender: Gender.FEMALE,
    living: true,
    money: 500000,
    parent: emily,
  },
  {
    name: "Sophie",
    gender: Gender.FEMALE,
    living: false,
    money: 500000,
    parent: emily,
  },
  {
    name: "Ahmad",
    gender: Gender.MALE,
    living: true,
    money: 500000,
    parent: emily,
  },
];

export default grandparent;
