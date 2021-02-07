import { Gender, Node } from "./types";

const mockData: Node = {
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

mockData.children = [
  {
    name: "Emily",
    gender: Gender.MALE,
    living: true,
    money: 500000,
    parent: mockData,
  },
  {
    name: "Sophie",
    gender: Gender.MALE,
    living: true,
    money: 500000,
    parent: mockData,
  },
  {
    name: "Ahmad",
    gender: Gender.MALE,
    living: true,
    money: 500000,
    parent: mockData,
  },
];

const emily = mockData.children[0];
emily.children = [
  {
    name: "Emily",
    gender: Gender.MALE,
    living: true,
    money: 500000,
    parent: emily,
  },
  {
    name: "Sophie",
    gender: Gender.MALE,
    living: true,
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

export default mockData;
