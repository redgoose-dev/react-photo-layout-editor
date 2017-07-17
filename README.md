# react-photo-layout-editor

`Photo layout editor for react`

사진 레이아웃을 편집하는 웹 프로그램입니다.

Instagram blog( http://blog.instagram.com/ )에 있는 정렬된 이미지의 모습에 매료되어 저런 모습을 직접 편집하여 게시물로 올렸으면 좋겠다는 생각이 들어 만들게 되었습니다.  
블럭을 드래그 앤 드롭으로 위치와 크기를 편집하여 모던하게 정렬된 이미지나 레이아웃 만들 수 있습니다.


## Feature

PLE는 이런 특징들을 가지고 있습니다.

### 이미지 관리

사이드바에 이미지를 업로드하여 사진을 배치하기 전에 이미지를 담아둘 수 있습니다.

### 에디터 속성변경

블럭의 갯수나 사이즈, 여백등을 조절할 수 있습니다.

### 드래그 앤 드롭

이미지를 드래그하여 이미지를 블럭에 넣거나 블럭의 위치를 옮기거나 수정할 수 있습니다.

### 이미지 영역의 편집

블럭을 선택하고 펜 모양의 툴바(edit block)를 선택하면 편집창이 뜨면서 영역을 변경할 수 있습니다.

### 배경색 변경

블럭의 배경색을 바꿀 수 있습니다. 빈 블럭을 만들고 색상을 수정할 수 있습니다.


## Installation
cli로 설치할 프로젝트에서 다음과 같은 명령을 실행합니다.

### npm
`npm insatll --save react-photo-layout-editor`

### yarn
`yarn add react-photo-layout-editor`


## Usage
원하는곳에 컴포넌트를 삽입합니다.  
한페이지에 단독으로 사용하는것을 권장합니다.

```
import PhotoLayoutEditor from 'react-photo-layout-editor';

<PhotoLayoutEditor ref={(r) => { this._photoLayoutEditor = r }}/>
```


## Props

- body
  - setting
      - width: 100
      - height: 100
      - column: 5
      - outerMargin: 10
      - innerMargin: 10
      - freeMode: false
      - bgColor: 'rgba(255,255,255,1)'
  - blockColor: 'rgba(211,211,211,1)'
  - grid: []
- side
  - files: []
  - visible: true
- uploadScript: null
- uploadParamsConvertFunc: null



1. `git clone https://github.com/RedgooseDev/react-photo-layout-editor.git`
1. `cd react-photo-layout-editor`
1. `npm install`
1. `npm start`
1. in your browser, connect `http://localhost:4040`.
