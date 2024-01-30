import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useRef, useEffect, useState, useMemo } from 'react';
import { auth } from '@/firebase';
interface IAuth {
	UserInfo: User | null;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	InitialLoading: { current: boolean };
}
interface AuthProviderProps {
	children: React.ReactNode;
}
const AuthContext = createContext<IAuth>({
	UserInfo: null,
	signUp: async () => {},
	signIn: async () => {},
	logout: async () => {},
	InitialLoading: { current: true }
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [UserInfo, setUserInfo] = useState<User | null>(null);
	const InitialLoading = useRef<boolean>(false);
	const router = useRouter();

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			//인증 상태가 변경될떄 해당 상태를 감지해서
			//전달받은 인증정보가 있으면
			if (user) {
				setUserInfo(user);
				router.push('/');
			} else {
				//전달받은 인증정보가 없으면
				setUserInfo(null);
				router.push('/login');
			}
			//한번이라도 인증로직이 실행되면 초기상태를 false로 변경
			setTimeout(() => (InitialLoading.current = true), 0);
		});
	}, []);

	const signUp = async (email: string, password: string) => {
		await createUserWithEmailAndPassword(auth, email, password)
			.then(userInfo => {
				setUserInfo(userInfo.user);
				router.push('/');
			})
			.catch(err => alert(err.message));
	};
	const signIn = async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password)
			.then(userInfo => {
				setUserInfo(userInfo.user);
				router.push('/');
			})
			.catch(err => alert(err.message));
	};
	const logout = async () => {
		signOut(auth)
			.then(() => {
				setUserInfo(null);
			})
			.catch(err => alert(err.message));
	};
	const memoedContext: IAuth = useMemo(() => ({ UserInfo, signIn, signUp, logout, InitialLoading }), [UserInfo]);
	return <AuthContext.Provider value={memoedContext}>{children}</AuthContext.Provider>;
};
export default function useAuth() {
	return useContext(AuthContext);
}
