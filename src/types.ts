export type DomElement = {
  // unique identifier
  id: string;
  // html tag name
  htmlType: string;
  // html children
  children: DomElement[];
};

export type DomTree = DomElement[];
