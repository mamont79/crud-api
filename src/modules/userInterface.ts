interface User {
  id: number;
  username: string;
  age: number;
  hobbies: Array<string> | Array<null>;
}

export { User };
