import { InferSelectModel } from "drizzle-orm";
import { user, account, session, verification } from "./src/schema/auth-schema";

export type UserTable = InferSelectModel<typeof user>;
export type AccountTable = InferSelectModel<typeof account>;
export type SessionTable = InferSelectModel<typeof session>;
export type VerificationTable = InferSelectModel<typeof verification>;
