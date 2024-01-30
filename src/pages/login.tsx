import Head from 'next/head';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import { BounceLoader } from 'react-spinners';
import { useState } from 'react';
import logo from '@/public/logo.svg';
import { SubmitHandler, useForm } from 'react-hook-form';
import getData from '@/hooks/useAuth';

//npm i react-hook-form

interface Inputs {
	email: string;
	password: string;
}

const Login: FunctionComponent = () => {
	const { signIn, signUp } = getData();
	console.log(signIn);
	const [IsLoading, setIsLoading] = useState<boolean>(true);
	const [Login, setLogin] = useState<boolean>(false);
	const [LoginVal, setLoginVal] = useState({ email: '', password: '' });

	//register: 원하는 input요소를 전개연산자로 등록해서 값을 관리
	//handleSubmit: submit이벤트 발생시 register에 등록된 input값들의 인증처리 핸들러함수를 콜백으로 전달받음
	//formState: 인증실패시 커스텀에러메세지를 등록할 수 있는 객체
	const {
		register,
		handleSubmit,
		formState: { errors } //formState객체값에서 다시 errors에 등록되어 있는 에러메세지만 추출
	} = useForm<Inputs>();

	//인증 성공시 handleSubmit에 의해서 자동으로 실행될 콜백함수
	const join: SubmitHandler<Inputs> = async ({ email, password }) => {
		console.log('email', email);
		console.log('password', password);
		if (Login) {
			//로그인실행
			await signIn(email, password);
		} else {
			//회원가입 실행
			await signUp(email, password);
		}
	};

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
				<Image width={150} height={150} src={logo} alt='netflix' className='absolute left-4 top-4 cursor-pointer md:left-10 md:top-6 z-[3]' />

				{/* submit이벤트 발생시 handleSubmit이 인증처리를 해주고 인증의 결과값을 등록된 콜백함수에 전달 */}
				<form onSubmit={handleSubmit(join)} className='relative z-[5] bg-black/70 py-10 px-6 space-y-8'>
					<h1 className='text-4xl font-semibold'>Sign In</h1>

					<div className='space-y-4'>
						<input
							type='text'
							placeholder='Email'
							className='input'
							{...register('email', { required: true, minLength: 5, maxLength: 20, pattern: /@/ })} //정규표현식 @포함
						/>
						{/* 인증 실패시 비구조할당으로 뽑아낸 errors객체에 전달한 property명으로 에러값 전달 */}
						{errors.email && <span>Enter a valid Email</span>}
						<input
							type='password'
							placeholder='Password'
							className='input'
							{...register('password', { required: true, minLength: 4, maxLength: 10, pattern: /[!@#$%^&*()]+[a-zA-Z]+[0-9]+/ })}
							//특수문자+영문+숫자+이어지는값 순으로 작성
						/>
						{errors.password && <span>Enter a valid Password</span>}
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
