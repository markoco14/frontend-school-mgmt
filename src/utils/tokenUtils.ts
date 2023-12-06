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
