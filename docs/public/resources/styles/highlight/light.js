export default {
  'code[class*="language-"]': {
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: '4',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
  },
  'pre[class*="language-"]::-moz-selection': {
    background: '#C1DEF1',
  },
  'pre[class*="language-"] ::-moz-selection': {
    background: '#C1DEF1',
  },
  'code[class*="language-"]::-moz-selection': {
    background: '#C1DEF1',
  },
  'code[class*="language-"] ::-moz-selection': {
    background: '#C1DEF1',
  },
  'pre[class*="language-"]::selection': {
    background: '#C1DEF1',
  },
  'pre[class*="language-"] ::selection': {
    background: '#C1DEF1',
  },
  'code[class*="language-"]::selection': {
    background: '#C1DEF1',
  },
  'code[class*="language-"] ::selection': {
    background: '#C1DEF1',
  },
  linenumber: {
    pointerEvents: 'none',
    minWidth: 'calc(2ch + 1rem)',
    paddingRight: '1rem',
    color: '#777',
    fontStyle: 'normal',
  },
  comment: {
    color: '#008000',
    fontStyle: 'italic',
  },
  prolog: {
    color: '#008000',
    fontStyle: 'italic',
  },
  doctype: {
    color: '#008000',
    fontStyle: 'italic',
  },
  cdata: {
    color: '#008000',
    fontStyle: 'italic',
  },
  namespace: {
    Opacity: '.7',
  },
  string: {
    color: 'var(--red-700)',
  },
  punctuation: {
    color: 'var(--gray-900)',
  },
  operator: {
    color: '#393A34',
  },
  url: {
    color: '#36acaa',
  },
  symbol: {
    color: '#36acaa',
  },
  number: {
    color: '#36acaa',
  },
  boolean: {
    color: '#36acaa',
  },
  variable: {
    color: '#36acaa',
  },
  constant: {
    color: '#36acaa',
  },
  inserted: {
    color: '#36acaa',
  },
  atrule: {
    color: '#0000ff',
  },
  keyword: {
    color: 'var(--orange-700)',
  },
  'attr-value': {
    color: 'var(--orange-700)',
  },
  '.language-json .token.boolean': {
    color: '#0000ff',
  },
  '.language-json .token.number': {
    color: '#0000ff',
  },
  'code[class*="language-css"]': {
    color: '#0000ff',
  },
  function: {
    color: '#393A34',
  },
  deleted: {
    color: '#9a050f',
  },
  selector: {
    color: '#800000',
  },
  important: {
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  'class-name': {
    color: 'var(--cyan-700)',
  },
  'maybe-class-name': {
    color: 'var(--cyan-800)',
  },
  builtin: {
    color: 'var(--cyan-800)',
  },
  '.language-json .token.property': {
    color: 'var(--cyan-800)',
  },
  tag: {
    color: 'var(--orange-700)',
  },
  'attr-name': {
    color: 'var(--blue-700)',
  },
  property: {
    color: 'var(--blue-700)',
  },
  regex: {
    color: '#ff0000',
  },
  entity: {
    color: '#ff0000',
  },
};
