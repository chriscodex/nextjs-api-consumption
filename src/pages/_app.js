import { ProviderAuth } from 'hooks/useAuth';
import '@styles/tailwind.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ProviderAuth>
        <Component {...pageProps} />
      </ProviderAuth>
    </>
  );
}

export default MyApp;
