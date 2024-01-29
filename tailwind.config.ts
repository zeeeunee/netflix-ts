import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		// screens: {
		// 	md: { max: '768px' } //기본 설정인 min-width를 제거하고 max-width로 미디어쿼리 설정
		// },
		extend: {
			//extend안쪽에 내가 쓰고 있는 커스텀 속성을 입력시
			//기존의 tailwind preset을 유지하면서 마나의 preset을 추가
			screens: {
				mmd: { max: '768px' } //기본 설정인 min-width를 제거하고 max-width로 미디어쿼리 설정
			},
			spacing: {
				//1단위를 1rem단위로 변경
				r1: '1rem',
				r2: '2rem'
			},
			backgroundImage: {
				gradient1: 'linear-gradient(to bottom, rgba(20,20,20,0), rgba(20,20,20,1))'
			}
		}
	},

	plugins: []
};
export default config;
