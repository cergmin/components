import React, {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import clsx from 'clsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import Checkbox from '@/components/Checkbox';
import highlightStyle from '@/resources/styles/highlight/light.js';
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

interface IComponentPropSelect extends IComponentPropCommon {
  valueEditor: 'select';
  value: any[];
}

type IComponentProp =
  | IComponentPropNoEdit
  | IComponentPropBoolean
  | IComponentPropString
  | IComponentPropSelect;

interface IPlaygroundProps {
  children: ReactNode;
  props?: IComponentProp[];
}

const Playground = ({ children, props }: IPlaygroundProps) => {
  const [childComponentsProps, setChildComponentsProps] = useState({});

  const updateChildComponentsProp = (key: string, value: any) => {
    setChildComponentsProps((state) => ({
      ...state,
      [key]: value,
    }));
  };

  useEffect(() => {
    props = props || [];

    setChildComponentsProps((state) => {
      const newState = { ...state };

      for (const prop of props) {
        let propName = prop.key;

        if (propName.slice(-1) === '?') {
          propName = propName.slice(0, -1);
        }

        if (prop.valueEditor.endsWith('select') && Array.isArray(prop.value)) {
          prop.selectedValueIndex = prop.value.indexOf(prop.defaultValue);

          prop.selectedValueIndex =
            prop.selectedValueIndex === -1 ? 0 : prop.selectedValueIndex;

          newState[propName] =
            prop.value.length > 0
              ? prop.value[prop.selectedValueIndex]
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
        <div className={s.demoContent}>{childrenWithProps}</div>
        <div className={s.demoResizer}>
          <span className={s.demoResizerText}>757</span>
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
                  valueEditor = `${childComponentsProps[propName]}`;
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
              }

              return (
                <tr key={prop.key}>
                  <td>
                    {propName}
                    {propNameSuffix}
                  </td>
                  <td>
                    <SyntaxHighlighter
                      className={s.propType}
                      language="tsx"
                      style={highlightStyle}
                      wrapLongLines>
                      {prop.tsType}
                    </SyntaxHighlighter>
                  </td>
                  <td>{prop.defaultValue}</td>
                  <td>{valueEditor}</td>
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
