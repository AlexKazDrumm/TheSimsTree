import '../styles/globals.css'
import { CookiesProvider } from 'react-cookie'
import { Helmet } from 'react-helmet';
import { Provider } from 'mobx-react';
import entities from '../src/entities';
import Script from 'next/script';

function App({ Component, pageProps }) {
  return (
    <Provider {...entities}>
        <Helmet>
          <title>SimsDynastyTree</title>
          <link rel="icon" type="image/ico" href="/favicon/favicon_120x120_2.ico" />
        </Helmet>

        {/* Yandex.Metrika */}
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

              ym(95752996, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `,
          }}
        />
        <noscript><div><img src="https://mc.yandex.ru/watch/95752996" style={{position: 'absolute', left: '-9999px'}} alt="" /></div></noscript>

        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-DZV9329HG1"
        />
        <Script
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-DZV9329HG1');
            `,
          }}
        />

        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
    </Provider>
  );
};

export default App;