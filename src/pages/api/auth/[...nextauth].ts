import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { CmsApi } from '@/api/cms-api';
import { ERROR_TOKEN, ROUTES } from '@/constant';

const handleRefreshToken = async (token: any) => {
  try {
    const tokenData = await CmsApi.refreshToken({
      refresh_token: token.refreshToken,
    });
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expiresIn: accessTokenExpires,
    } = tokenData.data;
    // const accessTokenExpirationTime =
    //   (jwt_decode<JwtPayload>(accessToken).exp as number) * 1000 - 10;
    return {
      ...token,
      accessToken,
      accessTokenExpires,
      refreshToken: refreshToken ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log('error', error);
    return {
      ...token,
      error: ERROR_TOKEN,
    };
  }
};

export const nextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@domain.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials) {
            return null;
          }
          const res = await CmsApi.login({
            email: credentials.email,
            password: credentials.password,
            requestFrom: 'CMS',
          });

          if (res) {
            const {
              access_token: accessToken,
              refresh_token: refreshToken,
              expiresIn: expiresIn,
            } = res.data.token;

            const { id, email, username } = res.data.user;
            return {
              id,
              email,
              username,
              accessToken,
              expiresIn,
              refreshToken,
            };
            //return new object user contain token
          }
          return null; //if the data is null, return null
        } catch (e: any) {
          console.log('error', e);
          //if the server response is an error, throw an error with the message from the server
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token, account }) {
      if (user && account) {
        token.accessToken = user.accessToken;
        token.userId = user.id;
        token.email = user.email;
        token.username = user.username;
        token.expiresIn = user.expiresIn;
        token.refreshToken = user.refreshToken;
        return token;
      }
      const expirationTime = token.exp * 1000; // Lấy giá trị thời gian hết hạn từ token
      const currentTime = Date.now();
      if (expirationTime && expirationTime - currentTime > 0) {
        // Kiểm tra nếu token vẫn còn hợp lệ

        return await handleRefreshToken(token);
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken;
        session.user.userId = token.userId;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.error = token.error;
      }

      return session;
    },
  },

  pages: {
    signIn: ROUTES.LOGIN,
  },

  secret: 'hi',
};

export default NextAuth(nextAuthOptions);
