import Image from 'next/image';
import logo from '@/public/logo.svg';

const Header = () => {
	return (
		<header className='w-[100%]'>
			<div className='w-[100%] flex  items-center space-x-2 p-5'>
				<h1>
					<Image src={logo} alt='netflix' width={100} height={100} className='cursor-pointer' />
				</h1>
				{/* tailwind에서는 반응형 작업시 mobile first */}
				<ul className='space-x-r2 hidden md:flex'>
					<li className='headerLink'>menu</li>
					<li className='headerLink'>menu</li>
					<li className='headerLink'>menu</li>
				</ul>
			</div>
		</header>
	);
};
export default Header;
