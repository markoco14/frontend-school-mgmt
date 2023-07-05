import {createContext, useState, useEffect} from 'react';
import { toast } from 'react-hot-toast';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';

type AuthUser = {
	name: string;
}

type IAuthContext = {
	user: AuthUser;
	logout: Function;
	loginUser: Function;
}

const AuthContext = createContext({
	user: null,
	logout: () => console.log('function'),
	loginUser: () => console.log('function'),
});

export default AuthContext;

export const AuthProvider = ({children}: any) => {

	const router = useRouter();

	let [authTokens, setAuthTokens] = useState<any>(null);
	let [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(false);

	

	let loginUser = async ( formData: any ) => {
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

	

	useEffect(() => {
		let updateToken = async () => {
			console.log('updating token')
			let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token/refresh/`, {
				method: 'POST',
				headers: {
					'Content-Type':'application/json',
				},
				body: JSON.stringify({'refresh': authTokens.refresh})
			})

			let data = await response.json();

			if (response.status === 200) {
				toast.success('Heck yes!');
				setAuthTokens(data);
				setUser(jwt_decode(data.access));
				localStorage.setItem('authTokens', JSON.stringify(data));
				console.log('updated token')
			} else {
				toast.error('Something went wrong. Sorry.');
				logout();
			}
		}
		setAuthTokens(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
		setUser(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)

		setInterval(() => {
			if (authTokens) {
				updateToken();
			}
		}, 5000)
	}, [authTokens, loading])

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