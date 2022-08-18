import 'styles/scss/main.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import AppWrapper from 'components/App';
import store from 'redux/store';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </Provider>
  );
};

export default MyApp;
