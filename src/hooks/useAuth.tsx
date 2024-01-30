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
	return <AuthContext.Provider value={{ UserInfo, signIn, signOut, signUp, Loading, Errors }}>{children}</AuthContext.Provider>;
};
