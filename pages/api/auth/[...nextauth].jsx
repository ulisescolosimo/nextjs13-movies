import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "1dd3a65ee25a8f789c3e",
      clientSecret: "bc7a776e13bfa87e6e2a0cb5ff6daf3669165cdd",
    }),
    GoogleProvider({
      clientId: "826110589443-45pd0ketgct2utdrn9qq5g7fkcpn18i7.apps.googleusercontent.com",
      clientSecret: "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",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
}
export default NextAuth(authOptions)