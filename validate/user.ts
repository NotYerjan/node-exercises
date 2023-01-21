import { Static, Type } from "@sinclair/typebox";

export const userSchema = Type.Object(
  {
    user_name: Type.String(),
    email: Type.RegEx(/^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/),
  },
  { additionalProperties: false }
);

export type UserData = Static<typeof userSchema>;
