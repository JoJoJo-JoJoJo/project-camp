import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL!
});

export const { useSession, signIn, signUp, signOut } = authClient;
