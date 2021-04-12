import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRecoilValue } from 'recoil';
import * as body from '~/store/body';
import * as callbacks from '~/libs/callbacks';
import ColorPicker from 'react-simple-colorpicker';
import Switch from './Switch';
import './Preference.scss';

const Preference = props => {
  const preference = useRecoilValue(body.preference);
  const [ width, setWidth ] = useState(preference.width);
  const [ height, setHeight ] = useState(preference.height);
  const [ column, setColumn ] = useState(preference.column);
  const [ outerMargin, setOuterMargin ] = useState(preference.outerMargin);
  const [ innerMargin, setInnerMargin ] = useState(preference.innerMargin);
  const [ backgroundColor, setBackgroundColor ] = useState(preference.backgroundColor);
  const [ blockColor, setBlockColor ] = useState(preference.blockColor);
  const [ freeMode, setFreeMode ] = useState(preference.freeMode);
  const [ showBackgroundColor, setShowBackgroundColor ] = useState(false);
  const [ showBlockColor, setShowBlockColor ] = useState(false);

  /**
   * toggle color picker
   *
   * @param {String} type
   * @param {Event} e
   */
  function toggleColorPicker(type, e)
  {
    e.stopPropagation();
    switch(type)
    {
      case 'backgroundColor':
        if (showBlockColor) setShowBlockColor(false);
        if (!showBackgroundColor)
        {
          window.on('click.plePreferenceShowBackgroundColor', e => {
            if (e.target.closest('.ple-preference__color > div')) return;
            window.off('click.plePreferenceShowBackgroundColor');
            setShowBackgroundColor(false);
          });
        }
        else
        {
          window.off('click.plePreferenceShowBackgroundColor');
        }
        setShowBackgroundColor(!showBackgroundColor);
        break;
      case 'blockColor':
        if (showBackgroundColor) setShowBackgroundColor(false);
        if (!showBlockColor)
        {
          window.on('click.plePreferenceShowBlockColor', e => {
            if (e.target.closest('.ple-preference__color > div')) return;
            window.off('click.plePreferenceShowBlockColor');
            setShowBlockColor(false);
          });
        }
        else
        {
          window.off('click.plePreferenceShowBlockColor');
        }
        setShowBlockColor(!showBlockColor);
        break;
    }
  }

  /**
   * reset form
   */
  function onReset()
  {
    setWidth(preference.width);
    setHeight(preference.height);
    setColumn(preference.column);
    setOuterMargin(preference.outerMargin);
    setInnerMargin(preference.innerMargin);
    setBackgroundColor(preference.backgroundColor);
    setBlockColor(preference.blockColor);
    setFreeMode(preference.freeMode);
  }

  /**
   * on submit
   *
   * @param {Event} e
   */
  function onSubmit(e)
  {
    e.preventDefault();
    callbacks.run('update', {
      type: 'preference',
      value: {
        width,
        height,
        column,
        outerMargin,
        innerMargin,
        backgroundColor,
        blockColor,
        freeMode,
      },
    });
    props.onClose();
  }

  // lifecycles
  useEffect(() => {
    return () => {
      window.off('click.plePreferenceShowBackgroundColor');
      window.off('click.plePreferenceShowBlockColor');
    };
  }, []);

  return (
    <form className="ple-preference" onSubmit={onSubmit}>
      <div className="ple-preference__body">
        <h2 className="ple-preference__title">Preference</h2>
        <dl className="ple-preference__field">
          <dt><label htmlFor="preference_width">Width</label></dt>
          <dd>
            <div className="ple-preference__text">
              <input
                type="number"
                name="width"
                id="preference_width"
                min={1}
                max={999}
                value={width}
                onChange={e => setWidth(Number(e.target.value))}/>
              <span>px</span>
            </div>
          </dd>
        </dl>
        <dl className="ple-preference__field">
          <dt><label htmlFor="preference_height">Height</label></dt>
          <dd>
            <div className="ple-preference__text">
              <input
                type="number"
                name="height"
                id="preference_height"
                min={1}
                max={999}
                value={height}
                onChange={e => setHeight(Number(e.target.value))}/>
              <span>px</span>
            </div>
          </dd>
        </dl>
        <dl className="ple-preference__field">
          <dt><label htmlFor="preference_column">Column</label></dt>
          <dd>
            <div className="ple-preference__text">
              <input
                type="number"
                name="column"
                id="preference_column"
                min={1}
                max={99}
                value={column}
                onChange={e => setColumn(Number(e.target.value))}/>
              <span>ea</span>
            </div>
          </dd>
        </dl>
        <dl className="ple-preference__field">
          <dt><label htmlFor="preference_outerMargin">Outer Margin</label></dt>
          <dd>
            <div className="ple-preference__text">
              <input
                type="number"
                name="outerMargin"
                id="preference_outerMargin"
                min={0}
                max={999}
                value={outerMargin}
                onChange={e => setOuterMargin(Number(e.target.value))}/>
              <span>px</span>
            </div>
          </dd>
        </dl>
        <dl className="ple-preference__field">
          <dt><label htmlFor="preference_innerMargin">Inner Margin</label></dt>
          <dd>
            <div className="ple-preference__text">
              <input
                type="number"
                name="innerMargin"
                id="preference_innerMargin"
                min={0}
                max={999}
                value={innerMargin}
                onChange={e => setInnerMargin(Number(e.target.value))}/>
              <span>px</span>
            </div>
          </dd>
        </dl>
        <dl className="ple-preference__field">
          <dt><label htmlFor="preference_bgColor">Background Color</label></dt>
          <dd>
            <div className="ple-preference__color">
              <button
                type="button"
                title="Background Color"
                className={[showBackgroundColor && 'active'].filter(Boolean).join(' ')}
                style={{ '--color': backgroundColor }}
                onClick={e => toggleColorPicker('backgroundColor', e)}>
                {backgroundColor}
              </button>
              {showBackgroundColor && (
                <div>
                  <div>
                    <ColorPicker
                      color={backgroundColor}
                      onChange={color => setBackgroundColor(color)}/>
                  </div>
                </div>
              )}
            </div>
          </dd>
        </dl>
        <dl className="ple-preference__field">
          <dt><label htmlFor="preference_bgColor">Block Color</label></dt>
          <dd>
            <div className="ple-preference__color">
              <button
                type="button"
                title="Block Color"
                className={[showBlockColor && 'active'].filter(Boolean).join(' ')}
                style={{ '--color': blockColor }}
                onClick={e => toggleColorPicker('blockColor', e)}>
                {blockColor}
              </button>
              {showBlockColor && (
                <div>
                  <div>
                    <ColorPicker
                      color={blockColor}
                      onChange={color => setBlockColor(color)}/>
                  </div>
                </div>
              )}
            </div>
          </dd>
        </dl>
        <dl className="ple-preference__field">
          <dt><label htmlFor="preference_freeMode">Free Mode</label></dt>
          <dd>
            <Switch
              name="freeMode"
              id="preference_freeMode"
              checked={freeMode}
              onChange={sw => setFreeMode(sw)}/>
          </dd>
        </dl>
      </div>
      <nav className="ple-preference__nav">
        <span>
          <button type="button" onClick={onReset}>Reset</button>
        </span>
        <span>
          <button type="submit">Submit</button>
        </span>
      </nav>
    </form>
  );
}
Preference.displayName = 'Preference';
Preference.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Preference;