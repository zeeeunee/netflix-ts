import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useRef, useEffect, useState, useMemo } from 'react';
import { auth } from '@/firebase';

//전역 Context에 전달할 인증정보 타입
interface IAuth {
	UserInfo: User | null;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	InitialLoading: { current: boolean };
}

//전역State provider에 전달할 Props 타입
interface AuthProviderProps {
	children: React.ReactNode;
}
//firebase로부터 전달받아서 전역Context에 전달할 객체모음
const AuthContext = createContext<IAuth>({
	UserInfo: null,
	signUp: async () => {},
	signIn: async () => {},
	logout: async () => {},
	InitialLoading: { current: true }
});
//전체 컴포넌트를 감싸줄 Wrapping컴포넌트 (전역데이터를 모든 컴포넌트에 전달하는 최상위 부모 컴포넌트)
export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [UserInfo, setUserInfo] = useState<User | null>(null);
	//초기에 한번 로딩완료되면 더이상 바뀔일이 없는 값인데 굳이 state에 담아서 불필요한 재렌더링을 방지하기 위해 useRef에 담아줌
	const InitialLoading = useRef<boolean>(true);
	const router = useRouter();
	useEffect(() => {
		//firebase로부터 전달되는 Auth상태값이 변경될때마다 해당 useEffect실행
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
			setTimeout(() => (InitialLoading.current = false), 0);
		});
	}, []); //의존성 배열에서 router제거 (그렇지 않으면 무한로딩 오류)

	//회원가입함수
	const signUp = async (email: string, password: string) => {
		await createUserWithEmailAndPassword(auth, email, password)
			.then(userInfo => {
				setUserInfo(userInfo.user);
				router.push('/');
			})
			.catch(err => alert(err.message));
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

	//새로고침시 같은 로그인 정보값이면 해당 값을 다시 연산하지 않도록 메모이제이션처리해서 전역 context에 넘기고
	const memoedContext: IAuth = useMemo(() => ({ UserInfo, signIn, signUp, logout, InitialLoading }), [UserInfo]);

	//로그인정보값이 들어와있을때에만 화면 출력
	//실시간으로 적용되는 IntialLoading값을 전역 context에 담음
	return <AuthContext.Provider value={memoedContext}>{children}</AuthContext.Provider>;
};
export default function useAuth() {
	return useContext(AuthContext);
}
