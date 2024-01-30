import { FunctionComponent } from 'react';
import { modalState, movieState } from '@/recoil/globalAtom';
import { useRecoilState } from 'recoil';

const Modal: FunctionComponent = () => {
	const [_, setShowModal] = useRecoilState(modalState);
	return (
		<aside className='fixed w-full h-screen top-0 left-0 z-50 bg-black/90 p01- items-center justify-center'>
			<article className='w-[600px] h-full'>
				<h2>Modal</h2>
				<span className='absolute top-10 right-10 text-base text-white cursor-pointer font-bold' onClick={() => setShowModal(false)}>
					close
				</span>
			</article>
		</aside>
	);
};

export default Modal;
