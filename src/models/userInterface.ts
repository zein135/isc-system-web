
export interface User {
  id?: number;
  username: string;
  name: string;
  lastname: string;
  mothername: string;
  password: string;
  email: string;
  code: number;
  phone: string;
  degree: string;
  roles: string[]; //TODO: hacer que los roles del db.json sean roles y no strings
}