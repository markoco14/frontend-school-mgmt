import Cookie from "js-cookie"
import jwt_decode from 'jwt-decode';
import { DecodedToken } from "../modules/auth/enitities/DecodedToken";


/**
 * Get a token from cookies
 * @param {string} type the tpye of token ('access' or 'refresh').
 * @return {string | undefined} The token or undefined if not found.
 */
export function getToken(type: "accessToken" | "refreshToken"): string | undefined {
	return Cookie.get(type);
}

/**
 * Set access and refresh tokens in cookies.
 * @param {string} accessToken The access token.
 * @param {string} refreshToken The refresh token.
 */
export function setToken({accessToken, refreshToken}: {accessToken: string, refreshToken: string}) {
  Cookie.set('accessToken', accessToken, { expires: 1 }); // Expires in 1 day
  Cookie.set('refreshToken', refreshToken, { expires: 7 }); // Expires in 7 days
}


/**
 * Remove access and refresh tokens from cookies
 */
export function removeToken() {
	Cookie.remove('accessToken');
	Cookie.remove('refreshToken');
}

export function isValidToken(token: string): number | undefined{
	try {
		const { exp } = jwt_decode<DecodedToken>(token)
		return exp
	} catch {
		return undefined
	}
}

/**
 * Check if a token is expired.
 * @param token The token to check.
 * @returns True if the token is expired, false otherwise.
 */
export function isTokenExpiredUtil(token: string): boolean {
  try {
    const { exp } = jwt_decode<DecodedToken>(token);
    if (!exp) {
      return true;
    }
    return Date.now() >= exp * 1000;
  } catch {
    return true;
  }
}

