import React, { useRef, useEffect } from 'react';
import { render } from 'react-dom';
import PhotoLayoutEditor from '~/components/PhotoLayoutEditor';
import './normalize.scss';
import '~/css/main.scss';

/**
 * TODO: notes / 컴포넌트 props 관리
 *
 * 이 프로젝트는 리엑트 컴포넌트다. 확실히 리엑트 컴포넌트답게 만들어야 한다.
 * 완전히 폐쇄적으로 만든다면 컴포넌트답지 못할 것이다.
 * ple 컴포넌트 내부 state 값들이 상당히 많아서 전부 `props`로 내리기엔 쓸데없이 복잡해질 것이다.
 *
 * 그래서 내부에서 사용하는 값과 외부에서 관리하는값이 구분해서 `props`를 오픈할것인지 내부에서 폐쇄적으로 운영할것인지 정해야 한다.
 * 외부에서 직접 데이터를 관리하고 싶다면 `props`를 사용하고, 내부에다 맡기고 쉽게 사용하고 싶다면 내부에서 값이 굴러가도록 설계해야 할것이다.
 *
 * 데이터 부분도 `props`로 사용하여 외부에서 데이터를 관리할 수 있다면 파일업로드 기능을 빼버려도 될것이다.
 * 하지만 프로그레스 인터랙션 같은 부분들에 관한 값을 계속 넘겨줘야 할것이다. (이 부분에서 목록과 함께 업데이트 할것인지 새로운 `prop`을 만들어 업데이트 할것인지 고민이 좀 된다.)
 *
 * `props`가 변했는지는 `componentDidUpdate`같은 라이프사이클을 이용하여 하나하나 검사하여 변했으면 업데이트 해줘야 할것이다.
 */

function App()
{
  const _ref = useRef();
  useEffect(() => {
    _ref.current.base();
  });
  return (
    <PhotoLayoutEditor
      ref={_ref}
    />
  );
}


render(
  <App/>,
  document.getElementById('root')
);

// setTimeout(function() {
//   // console.log(containerRef);
//   console.log(_ple)
// }, 500);

// console.log(_ple);
