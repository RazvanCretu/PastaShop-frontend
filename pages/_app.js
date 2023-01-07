import "../styles/globals.css";
import Theme from "../contexts/themeContext";
import Layout from "../components/Layout";
import { Provider } from "react-redux";
import { CacheProvider } from "@emotion/react";
import { ApolloProvider } from "@apollo/client";
import createEmotionCache from "../utils/emotionCache";
import store from "../store";
import client from "../utils/apolloClient";
import "@fontsource/roboto";

const clientEmotionCache = createEmotionCache();

function App({ Component, emotionCache = clientEmotionCache, pageProps }) {
  return (
    <CacheProvider value={emotionCache}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Theme>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Theme>
        </Provider>
      </ApolloProvider>
    </CacheProvider>
  );
}

export default App;
