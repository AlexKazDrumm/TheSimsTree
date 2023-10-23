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
          {/* <link rel="icon" href="https://realibi.kz/file/963267.png" /> */}
        </Helmet>
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
    </Provider>
  );
};

export default App;