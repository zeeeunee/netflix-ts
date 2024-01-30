import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { auth } from '@/firebase';

//전역 Context에 전달할 인증정보 타입
interface IAuth {
	UserInfo: User | null;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	Errors: string | null;
	Loading: boolean;
}

//전역 Stateprovider에 전달할 Props타입
interface AuthProviderProps {
	children: React.ReactNode;
}

//firebase로부터 전달받아서 전역 Context에 전달할 객체모음
const AuthContext = createContext<IAuth>({
	UserInfo: null,
	signUp: async () => {},
	signIn: async () => {},
	signOut: async () => {},
	Errors: null,
	Loading: false
});
//전체 컴포넌트를 감싸줄 Wrapping컴포넌트 (전역데이터를 모든 컴포넌트에 전달하는 최상위 부모 컴포넌트)
export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [Loading, setLoading] = useState<boolean>(false);
	const [UserInfo, setUserInfo] = useState<User | null>(null);
	const [Errors, setErrors] = useState<string>('');
	const [InitialLoading, setInitialLoading] = useState<boolean>(true);
	const router = useRouter();

	useEffect(() => {
		//firebase로부터 전달되는 auth상태값이 변경될 때마다 해당 useEffect실행
		onAuthStateChanged(auth, user => {
			//인증상태가 변경 될 때마다 해당상태를 감지해서 전달 받은 인증정보가 있으면
			if (user) {
				setUserInfo(user);
				setLoading(false);
				router.push('/');
			} else {
				//전달받은 인증정보가 없으면
				setUserInfo(user);
				setLoading(true);
				router.push('/login');
			}
			//한번이라도 인증로직이 실행되면 초기상태를 false로 변경
			setInitialLoading(false);
		});
	}, [router]);

	//회원가입함수
	const signUp = async (email: string, password: string) => {
		setLoading(true);
		await createUserWithEmailAndPassword(auth, email, password)
			.then(userInfo => {
				setUserInfo(userInfo.user);
				router.push('/');
				setInitialLoading(false);
			})
			.catch(err => alert(err.message))
			.finally(() => setLoading(false));
	};
	//로그인함수
	const signIn = async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password)
			.then(userInfo => {
				setUserInfo(userInfo.user);
				router.push('/');
			})
			.catch(err => alert(err.message));
	};

	//로그아웃 함수
	const logout = async () => {
		signOut(auth)
			.then(() => {
				setUserInfo(null);
			})
			.catch(err => alert(err.message));
	};
	return <AuthContext.Provider value={{ UserInfo, signIn, signOut, signUp, Loading, Errors }}>{children}</AuthContext.Provider>;
};
