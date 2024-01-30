import Head from 'next/head';
import Image from 'next/image';
import { FunctionComponent } from 'react';

const Login: FunctionComponent = () => {
	return (
		<main>
			<Head>
				<title>Nextflix | Login</title>
				<link rel='icon' href='/public/favicon.ico' />
			</Head>

			<Image src='https://rb.gy/p2hphi' fill priority alt='login Page' className='w-full h-screen z-[10] opacity-50 object-cover' />
		</main>
	);
};

export default Login;
