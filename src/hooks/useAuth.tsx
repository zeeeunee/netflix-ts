import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { auth } from '@/firebase';

interface IAuth {
	UserInfo: User | null;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	Errors: string | null;
	Loading: boolean;
}

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthContext = createContext<IAuth>({
	UserInfo: null,
	signUp: async () => {},
	signIn: async () => {},
	signOut: async () => {},
	Errors: null,
	Loading: false
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
	return <AuthContext.Provider value={{ UserInfo, signIn, signOut, signUp, Loading, Errors }}>{children}</AuthContext.Provider>;
};
