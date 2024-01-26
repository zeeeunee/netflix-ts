import { NextPage } from 'next';
import Head from 'next/head';
import Header from '@/components/Header';

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>NETFLIX</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />
			<main>
				<h1>Main Page</h1>
			</main>
		</div>
	);
};
export default Home;
