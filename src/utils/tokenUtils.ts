import Cookie from "js-cookie"
// import { jwt_decode } from 'jwt-decode';

// type DecodedToken = {
// 	exp: number;
// 	[key: string]: any;
// }

/**
 * Get a token from cookies
 * @param {string} type the tpye of token ('access' or 'refresh').
 * @return {string | undefined} The token or undefined if not found.
 */
export function getToken(type: "accessToken" | "refreshToken"): string | undefined {
	return Cookie.get(type);
}

