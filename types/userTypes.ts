export interface UserTypes {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  profileImg?: string;
  role: "admin" | "user";
  isSuspend: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
