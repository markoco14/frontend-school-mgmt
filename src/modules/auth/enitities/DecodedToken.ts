export type DecodedToken = {
  exp: number;
  [key: string]: any;
};

// {
// "token_type": "access", // access | refresh
//   "exp": 1701158298,
//   "iat": 1700899098,
//   "jti": "9a0d2ef3ce704edf8261d2850716eef3",
//   "user_id": 1,
//   "name": "First name",
//   "role": "A ROLE",
//   "permissions": [
//     1,
//     3
//   ],
//   "email": "some-email@gmail.com"
// }