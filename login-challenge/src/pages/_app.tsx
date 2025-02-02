import { AccountProvider } from '../contexts/AccountContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: any) {
  return (
    <AccountProvider>
      <Component {...pageProps} />
    </AccountProvider>
  );
}

export default MyApp;