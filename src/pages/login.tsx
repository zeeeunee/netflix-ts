import Head from 'next/head';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import { BounceLoader } from 'react-spinners';
import { useState } from 'react';
import logo from '@/public/logo.svg';
import { SubmitHandler, useForm } from 'react-hook-form';

//npm i react-hook-form

interface Inputs {
	email: string;
	password: string;
}

const Login: FunctionComponent = () => {
	const [IsLoading, setIsLoading] = useState<boolean>(true);
	const [Login, setLogin] = useState<boolean>(false);

	//register: 원하는 input요소를 전개연산자로 등록해서 값을 관리
	//handleSubmit: submit이벤트 발생시 register에 등록된 input값들의 인증처리 함수
	//formState: 인증실패시 커스텀에러메세지를 등록할 수 있는 객체
	const {
		register,
		handleSubmit,
		formState: { errors } //formState객체값에서 다시 errors에 등록되어 있는 에러메세지만 추출
	} = useForm<Inputs>();
	return (
		<main>
			<Head>
				<title>Netflix | Login</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			{/* frame */}
			<div className='relative flex items-center justify-center w-full h-screen p-10 overflow-hidden md:p-0'>
				{/* bg */}
				<Image
					src='https://rb.gy/p2hphi'
					fill
					priority
					alt='login Page'
					className='w-full h-screen z-[1] opacity-50 object-cover hidden md:block'
					onLoadingComplete={() => setIsLoading(false)}
				/>

				{/* loader */}
				<BounceLoader
					size={100}
					loading={IsLoading}
					color='orange'
					className='absolute top-[50%] left-[50%] ml-[-50px] mt-[-50px] z-[2] opacity-100'
				/>

				{/* logo */}
				<Image width={150} height={150} src={logo} alt='nextflix' className='absolute left-4 top-4 cursor-pointer md:left-10 md:top-6 z-[3]' />

				<form className='relative z-[5] bg-black/70 py-10 px-6 space-y-8'>
					<h1 className='text-4xl font-semibold'>Sign In</h1>

					<div className='space-y-4'>
						<input type='email' placeholder='Email' className='input' />
						<input type='password' placeholder='Password' className='input' />
					</div>

					<button className='w-full rounded bg-[red] py-3 font-semibold'>Sign In</button>

					<div className='text-[gray]'>
						New to Netflix?
						<button className='ml-4 text-white hover:underline'>Sign Up Now</button>
					</div>
				</form>
			</div>
		</main>
	);
};
export default Login;
