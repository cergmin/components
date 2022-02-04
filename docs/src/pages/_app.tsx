import packageJSON from '../../../package.json';
import type { AppProps } from 'next/app';
import DefaultLayout from '@/layouts/DefaultLayout';
import '@/resources/styles/colors.css';
import '@/resources/styles/light-theme.css';
import '@/resources/styles/reset.css';
import '@/resources/styles/visually-hidden.css';
import '@/resources/styles/main.css';

function App({ Component, pageProps }: AppProps) {
  const libVersion = packageJSON.version || 'unknown';

  return (
    <DefaultLayout libVersion={libVersion}>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}

export default App;
