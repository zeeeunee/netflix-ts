import { link } from 'fs';
import { Movie } from '../../types';
import Image from 'next/image';
import { baseURL } from '../../url';

interface Props {
	title: string;
	movies: Movie[];
}

const List = ({ movies, title }: Props) => {
	return (
		<article className='relative z-[5] mt-10 '>
			<h2 className='pl-2 mb-5 text-lg md:text-xl lg:text-2xl'>{title}</h2>
			<ul className='flex'>
				{movies.map((movie, idx) => {
					return (
						<li
							key={movie.id}
							className='min-w-[180px] min-h-[80px] relative cursor-pointer md:min-w-[200px] md:min-h-[100px] lg:min-w-[240px] lg:min-h-[120px] '>
							<Image src={`${baseURL}w300${movie.backdrop_path}`} alt={`${movie.title || movie.name}`} fill className='object-cover' />
						</li>
					);
				})}
			</ul>
		</article>
	);
};

export default List;
