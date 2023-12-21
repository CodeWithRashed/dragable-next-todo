import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/userModels";
import { connect } from "@/db/dbConfig";
import bcryptjs from "bcryptjs";
export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: {
          label: "name",
          type: "text",
          placeholder: "Your Name...",
        },
        email: {
          label: "email",
          type: "text",
          placeholder: "Your Name...",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Your Password...",
        },
      },
      async authorize(credentials: any): Promise<any | null> {
        try {
          connect();
          const { username, password } = credentials;
          
    
          // Find user by email in your MongoDB database
          const user = await User.findOne({ email: username });
          console.log(user)
          // If the user doesn't exist or the password is incorrect, return null
          if (!user) {
            return Promise.resolve({ error: "User Not Found" });
          }
          if (user) {
            const validPassword = await bcryptjs.compare(
              password,
              user.password
            );
            if (!validPassword) {
              return Promise.resolve({ error: "Wrong Password" });
            }
            return Promise.resolve(user);
          }
        } catch (err: any) {
          console.log("email auth error");
        }

      },
    }),
  ],
  callbacks: {
    async signIn(user): Promise<any | null> {
      try {
        console.log(user);

        return Promise.resolve(true);
      } catch (error) {
        console.error("Google sign-in error:", error);
        return Promise.resolve(false);
      }
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
