interface User {
  id: number;
  firstName: string;
  lastName?: string | null;
  age?: number | null;

}

export { User }