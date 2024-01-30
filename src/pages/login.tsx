import Head from 'next/head';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import { BounceLoader } from 'react-spinners';
import { useState } from 'react';

const Login: FunctionComponent = () => {
	const [IsLoading, setIsLoading] = useState(true);
	return (
		<main>
			<Head>
				<title>Nextflix | Login</title>
				<link rel='icon' href='/public/favicon.ico' />
			</Head>

			<div className='relative w-full h-screen overflow-hidden'>
				<Image
					src='https://rb.gy/p2hphi'
					fill
					priority
					alt='login Page'
					className='w-full h-screen z-[1] opacity-50 object-cover'
					onLoadingComplete={() => setIsLoading(false)}
				/>

				<BounceLoader
					size={100}
					loading={IsLoading}
					color='orange'
					className='absolute top-[50%] left-[50%] ml-[-50px] mt-[-50px] z-[2] opacity-100'
				/>
			</div>
		</main>
	);
};
export default Login;
