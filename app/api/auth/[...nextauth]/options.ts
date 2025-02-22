import type {NextAuthOptions} from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    } as any),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    } as any),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {label: 'Username', type: 'text', placeholder: 'jsmith'},
        password: {label: 'Password', type: 'password', placeholder: 'password'},
      },
      async authorize(credentials) {
        const user = {id: "1", name: 'J Smith', email: '', password: 'nextauth'};

        if (credentials?.username === user.name && credentials?.password === user.password) {
            return user;
        }
        else {
            return null;
        }
      },
    }),
  ],
  
};
