import { useState, useCallback } from 'react';

/**
 * use toggle
 * boolean 값을 토글링을 도와주는 state 인터페이스
 *
 * @param {Boolean} init
 * @return {Array}
 */
export default function useToggle(init = false)
{
  const [ value, setValue ] = useState(init);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [ value, toggle ];
}
