import {createContext, useState, useEffect} from 'react';
import { toast } from 'react-hot-toast';
import jwt_decode from 'jwt-decode';

type AuthUser = {
	name: string;
}

type IAuthContext = {
	user: AuthUser | null;
	logout: any;
	loginUser: any;
}

const AuthContext = createContext<IAuthContext>({
	user: null,
	logout: null,
	loginUser: null,
});

export default AuthContext;

export const AuthProvider = ({children}: any) => {

	let [authTokens, setAuthTokens] = useState<any>(null);
	let [user, setUser] = useState<any>(null);

	let loginUser = async ( formData: any ) => {

		let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token/`, {
			method: 'POST',
			headers: {
				'Content-Type':'application/json',
			},
			body: JSON.stringify({'email': formData.email, 'password': formData.password})
		})

		let data = await response.json();

		if (response.status === 200) {
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

	useEffect(() => {
		let updateToken = async () => {
			let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token/refresh/`, {
				method: 'POST',
				headers: {
					'Content-Type':'application/json',
				},
				body: JSON.stringify({'refresh': authTokens.refresh})
			})

			let data = await response.json();

			if (response.status === 200) {
				setAuthTokens(data);
				setUser(jwt_decode(data.access));
				localStorage.setItem('authTokens', JSON.stringify(data));
			} else {
				toast.error('Something went wrong. Sorry.');
				logout();
			}
		}
		const fourMinutes = 1000 * 60 * 4;
		if (!user || !authTokens) {
			setAuthTokens(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
			setUser(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
		} else {
			const interval = setInterval(() => {
				if (authTokens) {
					updateToken();
				}
			}, fourMinutes)
			return () => clearInterval(interval);
		}

		
	}, [authTokens, user])

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