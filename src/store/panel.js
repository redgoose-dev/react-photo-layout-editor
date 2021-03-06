import { atom } from 'recoil';

export const open = atom({
  key: 'panelOpen',
  default: true,
});

export const files = atom({
  key: 'panelFiles',
  default: [],
});

/**
 * 파일 업로드할때 필요한 값들
 *
 * @param {String} url 서버에 파일을 업로드 스크립트 url
 * @param {String} formKey `formData`객체에서 업로드 파일항목 파라메터 이름
 */
export const upload = atom({
  key: 'baseUpload',
  default: null,
});
