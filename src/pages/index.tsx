import Head from 'next/head';
import type { NextPage } from 'next';
import Header from '@/components/Header';
import requests from '@/utils/request';
import { Movie } from '../../types';
import Banner from '@/components/Banner';
import List from '@/components/List';

//npm i tailwind-scrollbar tailwind-scrollbar-hide
//확장기능중에 Headwind 는 tailwind 기능중에서 최적화된 순서에 맞게 구문 순서 자동 재배치 ctrl+alt+T

interface Props {
	original: Movie[];
	top: Movie[];
	sf: Movie[];
	drama: Movie[];
	fantasy: Movie[];
	comedy: Movie[];
	action: Movie[];
}

//Page 컴포넌트에대한 타입은 Next에서 이미 제공하고 있는 함수관련 타입을 쓰고 있고 제네릭으로 props를 전달하고 있기 때문에
//함수의 파라미터에 중복해서 타입을 전달할 필요가 없음
//하지만 NexPage라는 기본 제공타입을 연결하지 않는다면 파라미터에 타입지정은 필수
const Home: NextPage<Props> = (props: Props) => {
	console.log(props);
	return (
		<div className='relative w-full h-screen overflow-x-hidden scrollbar-thin scrollbar-thumb-[red] scrollbar-track-[transparent]'>
			<Head>
				<title>NETFLIX</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='relative'>
				<Header />
				<Banner original={props.original} />
				{/* <List movies={props.sf} title={'Science Fiction'} />
				<List movies={props.drama} title={'Drama'} /> */}
				{Object.values(props).map((category, idx) => (
					<List key={idx} movies={category} title={Object.keys(props)[idx]} />
				))}
			</main>
		</div>
	);
};

//인증요청을 할떄마다 서버쪽에 pre-render page데이터와 클라이언트에 요청된 데이터를 매번 매칭시키기 위해서는
//SSR방식으로 client에서 요청이 들어올때다 매번 서버에서 변경된 데이터로 다시 pre-build내보내기 위함
//CSR방식을 쓰지 않는 이유는 비록 SSR방식이 요청이 들어올때마다 재 build를 해서 pre-render하긴 하지만 어쨌든 서버에서 완성된 데이터를 넘겨주는 것이므로 SEO방식에 좋음
//설사 새로운 데이터로 새롭게 서버쪽에 pre-render할때 시간이 오래 걸린다고 하더라도 이미 첨 빌드때 만들어놓은 화면을 계속 유지하다가 데이터변경이 완료되면 하이드레이션되는 구조이므로 CSR방식보다는 SSR방식이 여러모로 유리
export const getServerSideProps = async () => {
	//Promie.all([promise, promise]).then(()=> 배열에 인수로 전달된 모든 promise객체의 상태가 fullfiled, rejected가 되야지만 이곳 then구문이 동기적으로 실행됨)
	const [original, top, sf, drama, fantasy, comedy, action] = await Promise.all([
		fetch(requests.original).then(res => res.json()),
		fetch(requests.top).then(res => res.json()),
		fetch(requests.sf).then(res => res.json()),
		fetch(requests.drama).then(res => res.json()),
		fetch(requests.fantasy).then(res => res.json()),
		fetch(requests.comedy).then(res => res.json()),
		fetch(requests.action).then(res => res.json())
	]);
	return {
		props: {
			original: original.results,
			top_rated: top.results,
			sf: sf.results,
			drama: drama.results,
			fantasy: fantasy.results,
			comedy: comedy.results,
			action: action.results
		}
	};
};

export default Home;
//SSR(Server Side Rendering) (페이지 접속할때마다 서버쪽에서 매번새로운 데이터를 prerender후 재활용)
//ISR(Incremental Static Regeneration) (일정주기마다 서버에서 데이터 refetching한 데이터를 prerender 후 재활용)
//SSG(Static Sited Generation) (처음 빌드시 서버에서 한번만 prerender 재활용)
