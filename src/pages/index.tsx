import { NextPage } from 'next';
import Head from 'next/head';
import Header from '@/components/Header';

const Home: NextPage = () => {
	return (
		//w-screen:100vw, h-screen:100vh, w-full:100%, h-full:100%
		<div className='relative h-screen'>
			<Head>
				<title>NETFLIX</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />
			<main className='relative'>
				<h1>Main Page</h1>
			</main>
		</div>
	);
};
export default Home;
