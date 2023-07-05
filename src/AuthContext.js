import {createContext, useState, useEffect} from 'react';
import { toast } from 'react-hot-toast';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {

	const router = useRouter();

	let [authTokens, setAuthTokens] = useState(null);
	let [user, setUser] = useState(null);

	useEffect(() => {
		setAuthTokens(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
		setUser(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
	}, [])

	let loginUser = async ( formData ) => {
		console.log('logging data in auth context', formData);

		let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token/`, {
			method: 'POST',
			headers: {
				'Content-Type':'application/json',
			},
			body: JSON.stringify({'email': formData.email, 'password': formData.password})
		})
		console.log(response);

		let data = await response.json();
		console.log(data);

		if (response.status === 200) {
			toast.success('Heck yes!');
			setAuthTokens(data);
			setUser(jwt_decode(data.access));
			localStorage.setItem('authTokens', JSON.stringify(data));
		} else {
			toast.error('Something went wrong. Sorry.');
		}
	}

	let logout = () => {
		setUser(null);
		setAuthTokens(null);
		localStorage.removeItem('authTokens');
	}

	let contextData = {
		user:user,
		loginUser:loginUser,
		logout:logout,
	}

	return (
		<AuthContext.Provider value={contextData}>
			{children}
		</AuthContext.Provider>
	)

}