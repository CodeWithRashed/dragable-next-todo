import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
      }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Your Username...",
        },
        password: { label: "Password", type: "password",  placeholder: "Your Password...", },
      },
      async authorize(credentials: any): Promise<any | null> {
        const { username, password } = credentials;

        if (username === "validUsername" && password === "validPassword") {
          // If authentication succeeds, return the user object
          return { id: 1, name: "John Doe", email: "john@example.com" };
        }

        // If authentication fails, return null
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  }
};
