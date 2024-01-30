import Head from 'next/head';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import { BounceLoader } from 'react-spinners';
import { useState } from 'react';
import logo from '@/public/logo.svg';
import { SubmitHandler, useForm } from 'react-hook-form';
import getData from '@/hooks/useAuth';
interface Inputs {
	email: string;
	password: string;
}
const Login: FunctionComponent = () => {
	const { signIn, signUp } = getData();
	const [IsLoading, setIsLoading] = useState<boolean>(true);
	const [Login, setLogin] = useState<boolean>(false);
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Inputs>();
	const join: SubmitHandler<Inputs> = async ({ email, password }) => {
		if (Login) {
			//Login(true) : 로그인함수 호출
			await signIn(email, password);
		} else {
			//Login(false) : 회원가입함수 호출
			await signUp(email, password);
		}
	};
	return (
		<main>
			<Head>
				<title>Nextflix | Login</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{/* frame */}
			<div className='flex justify-center items-center w-full h-screen relative overflow-hidden p-10 md:p-0'>
				{/* bg */}
				<Image
					src='https://rb.gy/p2hphi'
					fill
					priority
					alt='login Page'
					className='absolute w-full h-screen z-[1] opacity-50 object-cover hidden md:block'
					onLoadingComplete={() => setIsLoading(false)}
				/>

				{/* loader */}
				<BounceLoader
					size={100}
					loading={true}
					color='orange'
					className='absolute top-[50%] left-[50%] ml-[-50px] mt-[-50px] z-[2] opacity-100'
					cssOverride={{ position: 'absolute' }}
				/>

				{/* logo */}
				<Image width={150} height={150} src={logo} alt='nextflix' className='absolute left-4 top-4 cursor-pointer md:left-10 md:top-6 z-[3]' />

				{/* submit이벤트 발생시 hadleSubmit이 인증처리를 해주고 인증의 결과값을 등록된 콜백함수에 전달 */}
				<form
					onSubmit={handleSubmit(join)}
					className='w-[500px] absolute top-[50%] left-[50%] z-[5] bg-black/70 py-10 px-6 space-y-8 translate-x-[-50%] translate-y-[-50%]'>
					<h1 className='text-4xl font-semibold'>Sign In</h1>

					<div className='space-y-4'>
						<input
							type='text'
							placeholder='Email'
							className='input'
							{...register('email', { required: true, minLength: 5, maxLength: 20, pattern: /@/ })}
						/>
						{errors.email && <span>Enter a valid Email</span>}
						<input
							type='password'
							placeholder='Password'
							className='input'
							{...register('password', { required: true, minLength: 4, maxLength: 10, pattern: /[!@#$%^&*()]+[a-zA-Z]+[0-9]+/ })}
						/>
						{errors.password && <span>Enter a valid Password</span>}
					</div>
					{/* SignIn 버튼 클릭시 Login값 true로변경 */}
					<button className='w-full rounded bg-[red] py-3 font-semibold' onClick={() => setLogin(true)}>
						Sign In
					</button>
					<div className='text-[gray]'>
						New to Nextflix?
						{/* Sign Up 버튼 클릭시 Login 값 false로 변경 */}
						<button className='text-white ml-4 hover:underline' onClick={() => setLogin(false)}>
							Sign Up Now
						</button>
					</div>
				</form>
			</div>
		</main>
	);
};
export default Login;
