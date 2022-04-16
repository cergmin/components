import React, {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
  MouseEventHandler,
} from 'react';
import clsx from 'clsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Checkbox from '@/components/Checkbox';
import highlightStyle from '@/resources/styles/highlight/light.js';
import { throttle } from '@/utilities/throttle';
import s from './Playground.module.css';

interface IComponentPropCommon {
  key: string;
  tsType?: string;
  defaultValue?: string;
  valueEditor: string;
  value: any;
  selectedValueIndex?: number;
}

interface IComponentPropNoEdit extends IComponentPropCommon {
  valueEditor: 'noEdit';
  value: boolean | string;
}

interface IComponentPropBoolean extends IComponentPropCommon {
  valueEditor: 'boolean';
  value: boolean;
}

interface IComponentPropString extends IComponentPropCommon {
  valueEditor: 'string';
  value: string;
}

interface IComponentPropNumber extends IComponentPropCommon {
  valueEditor: 'number';
  value: number;
}

interface IComponentPropSelect extends IComponentPropCommon {
  valueEditor: 'select';
  value: any[];
}

interface IComponentPropNamedSelect extends IComponentPropCommon {
  valueEditor: 'namedSelect';
  value: [string, any][];
}

type IComponentProp =
  | IComponentPropNoEdit
  | IComponentPropBoolean
  | IComponentPropString
  | IComponentPropNumber
  | IComponentPropSelect
  | IComponentPropNamedSelect;

interface IPlaygroundProps {
  children: ReactNode;
  props?: IComponentProp[];
}

const Playground = ({ children, props }: IPlaygroundProps) => {
  const [childComponentsProps, setChildComponentsProps] = useState({});
  const [demoContentWidth, setDemoContentWidth] = useState<number>();
  const [isDemoResizing, setIsDemoResizing] = useState(false);
  const [startDemoResizePos, setStartDemoResizePos] = useState(0);
  const [startDemoWidth, setStartDemoWidth] = useState(0);
  const demoContentRef = useRef<HTMLDivElement>(null);
  const demoResizerRef = useRef<HTMLDivElement>(null);

  const updateChildComponentsProp = (key: string, value: any) => {
    setChildComponentsProps((state) => ({
      ...state,
      [key]: value,
    }));
  };

  const pointerDownResizerHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    setIsDemoResizing(true);
    setStartDemoResizePos(e.clientX);
    setStartDemoWidth(demoContentWidth);
  };

  const pointerUpResizerHandler = () => {
    if (isDemoResizing) {
      setIsDemoResizing(false);
      setDemoContentWidth(demoContentRef.current.offsetWidth);
    }
  };

  const pointerMoveResizerHandler = (e: MouseEvent) => {
    if (!isDemoResizing) {
      return;
    }

    const positionXOffset = e.clientX - startDemoResizePos;

    demoContentRef.current.style.width = `${
      startDemoWidth + positionXOffset
    }px`;
    demoResizerRef.current.querySelector('span').innerText =
      demoContentRef.current.clientWidth.toString();
  };

  const windowResizeHandler = throttle(() => {
    setDemoContentWidth(demoContentRef.current.offsetWidth);
  }, 100);

  useEffect(() => {
    if (!demoContentRef || !demoResizerRef) {
      return;
    }

    setDemoContentWidth(demoContentRef.current.offsetWidth);
  }, [demoContentRef, demoResizerRef]);

  useEffect(() => {
    document.addEventListener('pointerup', pointerUpResizerHandler);
    document.addEventListener('pointermove', pointerMoveResizerHandler);
    window.addEventListener('resize', windowResizeHandler);

    return () => {
      document.removeEventListener('pointerup', pointerUpResizerHandler);
      document.removeEventListener('pointermove', pointerMoveResizerHandler);
      window.removeEventListener('resize', windowResizeHandler);
    };
  }, [isDemoResizing]);

  useEffect(() => {
    props = props || [];

    setChildComponentsProps((state) => {
      const newState = { ...state };

      for (const prop of props) {
        let propName = prop.key;

        if (propName.slice(-1) === '?') {
          propName = propName.slice(0, -1);
        }

        if (prop.valueEditor === 'select' && Array.isArray(prop.value)) {
          prop.selectedValueIndex = prop.value.indexOf(prop.defaultValue);

          prop.selectedValueIndex =
            prop.selectedValueIndex === -1 ? 0 : prop.selectedValueIndex;

          newState[propName] =
            prop.value.length > 0
              ? prop.value[prop.selectedValueIndex]
              : undefined;
        } else if (
          prop.valueEditor === 'namedSelect' &&
          Array.isArray(prop.value)
        ) {
          prop.selectedValueIndex = 0;

          for (let i = 0; i < prop.value.length; i++) {
            if (prop.value[i].includes(prop.defaultValue)) {
              prop.selectedValueIndex = i;
              break;
            }
          }

          newState[propName] =
            prop.value.length > 0
              ? prop.value[prop.selectedValueIndex][1]
              : undefined;
        } else {
          newState[propName] = prop.value;
        }
      }

      return newState;
    });
  }, [props]);

  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, childComponentsProps);
    }

    return child;
  });

  return (
    <div className={s.playground}>
      <div className={s.demo}>
        <div
          className={s.demoContent}
          style={{ width: demoContentWidth }}
          ref={demoContentRef}>
          {childrenWithProps}
        </div>
        <div
          className={s.demoResizer}
          ref={demoResizerRef}
          onPointerDown={pointerDownResizerHandler}>
          <span className={s.demoResizerText}>{demoContentWidth}</span>
        </div>
      </div>
      <div className={s.propsTableWrapper}>
        <table className={s.propsTable}>
          <thead>
            <tr>
              <td>Name</td>
              <td>Type</td>
              <td>Default</td>
              <td>Value</td>
            </tr>
          </thead>
          <tbody>
            {props.map((prop) => {
              let propName: string = prop.key;
              let propNameSuffix: ReactNode;
              let valueEditor: ReactNode;

              if (prop.key.slice(-1) === '?') {
                propName = prop.key.slice(0, -1);
                propNameSuffix = (
                  <span
                    className={clsx(
                      s.propNameSuffix,
                      s.propNameSuffixNotRequired,
                    )}
                    title="Not required">
                    {prop.key.slice(-1)}
                  </span>
                );
              } else {
                propNameSuffix = (
                  <span
                    className={clsx(s.propNameSuffix, s.propNameSuffixRequired)}
                    title="Required">
                    *
                  </span>
                );
              }

              switch (prop.valueEditor) {
                case 'noEdit':
                  valueEditor = (
                    <SyntaxHighlighter
                      className={s.propType}
                      language="json"
                      style={highlightStyle}
                      wrapLongLines>
                      {JSON.stringify(
                        childComponentsProps[propName],
                        null,
                        '  ',
                      ) ?? ''}
                    </SyntaxHighlighter>
                  );
                  break;

                case 'boolean':
                  valueEditor = (
                    <Checkbox
                      checked={childComponentsProps[propName]}
                      onChange={(e) =>
                        updateChildComponentsProp(propName, e.target.checked)
                      }
                    />
                  );
                  break;

                case 'string':
                  valueEditor = (
                    <input
                      className={s.textInput}
                      type="text"
                      value={childComponentsProps[propName]}
                      onChange={(e) =>
                        updateChildComponentsProp(propName, e.target.value)
                      }
                    />
                  );
                  break;

                case 'number':
                  valueEditor = (
                    <input
                      className={s.textInput}
                      type="number"
                      value={childComponentsProps[propName]}
                      onChange={(e) =>
                        updateChildComponentsProp(
                          propName,
                          parseFloat(e.target.value),
                        )
                      }
                    />
                  );
                  break;

                case 'select':
                  valueEditor = (
                    <select
                      className={s.selectInput}
                      value={prop.selectedValueIndex}
                      onChange={(e) => {
                        const index = parseInt(e.target.value);
                        prop.selectedValueIndex = index;
                        updateChildComponentsProp(propName, prop.value[index]);
                      }}>
                      {prop.value.map((value, i) => (
                        <option key={i} value={i}>
                          {`${value}`}
                        </option>
                      ))}
                    </select>
                  );
                  break;

                case 'namedSelect':
                  valueEditor = (
                    <select
                      className={s.selectInput}
                      value={prop.selectedValueIndex}
                      onChange={(e) => {
                        const index = parseInt(e.target.value);
                        prop.selectedValueIndex = index;
                        updateChildComponentsProp(
                          propName,
                          prop.value[index][1],
                        );
                      }}>
                      {prop.value.map((value, i) => (
                        <option key={value[0]} value={i}>
                          {`${value[0]}`}
                        </option>
                      ))}
                    </select>
                  );
                  break;
              }

              return (
                <tr key={prop.key}>
                  <td data-column="Name">
                    {propName}
                    {propNameSuffix}
                  </td>
                  <td data-column="Type">
                    <SyntaxHighlighter
                      className={s.propType}
                      language="tsx"
                      style={highlightStyle}
                      wrapLongLines>
                      {prop.tsType}
                    </SyntaxHighlighter>
                  </td>
                  <td data-column="Default">{prop.defaultValue}</td>
                  <td data-column="Value">{valueEditor}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Playground;
