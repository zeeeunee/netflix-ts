import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

//해당 코드는 firebase객체를 직접 가져와서 설정값을 초기화한뒤
//초기화설정이 완료된 firebase객체 자체를 export
//원하는 컴포넌트에서 firebase객체를 import시 안쪽의 로그인, 로그아웃, 정보값 확인가능
const firebaseConfig = {
	apiKey: 'AIzaSyDEmfkAFDYtHsXDqb2Iq8xnKAHoZQ6CZ_g',
	authDomain: 'zeeeunee-3fe83.firebaseapp.com',
	projectId: 'zeeeunee-3fe83',
	storageBucket: 'zeeeunee-3fe83.appspot.com',
	messagingSenderId: '359740253583',
	appId: '1:359740253583:web:7d97acff66ce43cf2917fa',
	measurementId: 'G-34D4NFL6L0'
};

firebase.initializeApp(firebaseConfig);

export default firebase;
