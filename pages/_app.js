import '../styles/globals.css'
import { CookiesProvider } from 'react-cookie'
import { Helmet } from 'react-helmet';
import { Provider } from 'mobx-react';
import entities from '../src/entities';

function App({ Component, pageProps }) {
  
  return (
    <Provider {...entities}>
        <Helmet>
          <title>SimsDynastyTree</title>
          <link rel="icon" type="image/ico" href="/favicon/favicon_32x32.ico" />
        </Helmet>
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
    </Provider>
  );
};

export default App;