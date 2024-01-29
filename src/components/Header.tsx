import Image from 'next/image';
import logo from '@/public/logo.svg';

const Header = () => {
	return (
		<header className='w-[100%]'>
			<div className='w-[100%] flex  items-center space-x-2 p-5'>
				<h1>
					<Image src={logo} alt='netflix' width={100} height={100} className='cursor-point' />
				</h1>
				<ul className='w-full flex justify-between items-center space-x-2'>
					<li className='headerLink'>menu</li>
					<li className='headerLink'>menu</li>
					<li className='headerLink'>menu</li>
				</ul>
			</div>
		</header>
	);
};
export default Header;
