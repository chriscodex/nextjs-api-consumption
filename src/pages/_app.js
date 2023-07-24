import { ProviderAuth } from 'hooks/useAuth';
import { ShoppingCartProvider } from '@hooks/useShoppingCart';
import { AppContextProvider } from 'context/appContext';
import '@styles/tailwind.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AppContextProvider>
        <ShoppingCartProvider>
          <ProviderAuth>
            <Component {...pageProps} />
          </ProviderAuth>
        </ShoppingCartProvider>
      </AppContextProvider>
    </>
  );
}

export default MyApp;
