import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import * as body from '~/store/body';

const Preference = () => {
  const storePreference = useRecoilState(body.preference);
  const [ preference, setPreference ] = storePreference;

  console.log(preference);

  function onChangeValue()
  {

  }

  return (
    <form className="ple-preference">
      <div className="ple-preference__body">
        <h2 className="ple-preference__title">Preference</h2>
        <dl className="ple-preference__field">
          <dt><label htmlFor="preference_width">Width</label></dt>
          <dd>
            <input
              type="number"
              name="width"
              id="preference_width"
              onChange={onChangeValue}/>
          </dd>
        </dl>
        <dl>
          <dt><label htmlFor="preference_height">Height</label></dt>
          <dd>
            <input
              type="number"
              name="height"
              id="preference_height"
              onChange={onChangeValue}/>
          </dd>
        </dl>
        <dl>
          <dt><label htmlFor="preference_column">Column</label></dt><dd>
            <input
              type="number"
              name="column"
              id="preference_column"
              onChange={onChangeValue}/>
          </dd>
        </dl>
        <dl>
          <dt><label htmlFor="preference_outerMargin">Outer margin</label></dt>
          <dd>
            <input
              type="number"
              name="outerMargin"
              id="preference_outerMargin"
              onChange={onChangeValue}/>
          </dd>
        </dl>
        <dl>
          <dt><label htmlFor="preference_innerMargin">Inner margin</label></dt>
          <dd>
            <input
              type="number"
              name="innerMargin"
              id="preference_innerMargin"
              onChange={onChangeValue}/>
          </dd>
        </dl>
        <dl>
          <dt><label htmlFor="preference_bgColor">BG color</label></dt>
          <dd>
            <input
              type="text"
              name="bgColor"
              id="preference_bgColor"
              onChange={onChangeValue}
              onClick={() => {}}/>
            <div>color-picker</div>
          </dd>
        </dl>
        <dl>
          <dt><label htmlFor="preference_freeMode">Free mode</label></dt>
          <dd>
            <label>
              <input
                type="radio"
                name="freeMode"
                id="preference_freeMode"
                onChange={onChangeValue}/>
              <span>true</span>
            </label>
            <label>
              <input
                type="radio"
                name="freeMode"
                onChange={onChangeValue}/>
              <span>false</span>
            </label>
          </dd>
        </dl>
      </div>
    </form>
  );
}

export default Preference;