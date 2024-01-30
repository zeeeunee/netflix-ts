import Image from 'next/image';
import { Movie } from '../../types';
import { useState, useEffect, useRef } from 'react';
import { baseURL } from '../url';
import { FaInfoCircle, FaPlay } from 'react-icons/fa';
import { FunctionComponent } from 'react';

interface Props {
	original: Movie[];
}

const Banner: FunctionComponent<Props> = ({ original }) => {
	//useRef에는 초기값이 없을 수가 없으므로 직접 수동으로 지정해야 되기 때문
	//useState와 다르게 useRef는 unionType을 지정하지 않더라도 인수로 지정한 초기값을 자동으로 unionType설정처리
	const loading = useRef<HTMLDivElement>(null);
	//useState는 초기값을 집어넣지 않더라도 추후 담기는 값을 인지해서 타입추론
	//useState는 에외사항에 대한 값을 무조건 unionType으로 지정해야함
	const [Movie, setMovie] = useState<Movie | null>(null);

	useEffect(() => {
		const randomNum = Math.floor(Math.random() * original.length);
		setMovie(original[randomNum]);
	}, [original]);

	return (
		<section className='relative flex flex-col h-[60vh] justify-end px-4 pt-40 pb-5 space-y-4 md:h-[70vh] md:pd-15 md:space-y-8 lg:space-y-14 lg:h-[85vh] lg:pb-20'>
			{Movie && (
				<>
					{/* pic Frame */}
					<div className='absolute top-0 left-0 z-[1] w-full h-full opacity-70 '>
						<Image
							src={`${baseURL}original${Movie.backdrop_path}`}
							//alt값은 기본적으로 문자만 전달받도록 타입이 강제되어 있으므로
							//템플릿 리터널안쪽에서 변수값이 문자로 반환되도록 처리
							alt={`${Movie.name || Movie.original_title}`}
							fill
							priority
							quality={70}
							sizes='(max-width:768px) 100vw, (max-width:1200) 70vw, 100vw'
							className='object-cover'
							onLoadingComplete={() => loading.current?.remove()}
						/>
					</div>
					{/* gradient layer */}
					<div className='absolute z-[2] top-0 left-0 w-full h-full bg-gradient1'></div>

					{/* loading bar */}
					<div
						ref={loading}
						className='w-[40px] h-[40px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-4 border-[orange] border-t-[transparent] rounded-[50%] z-[3] animate-ani-rotation'></div>

					{/* title */}
					<h1 className='relative z-[3] text-2xl font-bold md:text-6xl'>{Movie?.title || Movie?.name}</h1>

					{/* overview */}
					<p className='relative z-[3] text-xs md:text-lg lg:text-2xl '>{Movie?.overview}</p>

					{/* buton */}
					<nav className='relative z-[3] flex gap-3 '>
						<button className='bannerButton bg-[red]'>
							<FaPlay />
							Play
						</button>
						<button className='bannerButton'>
							<FaInfoCircle />
							More Info
						</button>
					</nav>
				</>
			)}
		</section>
	);
};

export default Banner;
