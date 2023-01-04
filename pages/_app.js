import "../styles/globals.css";
import Layout from "../components/Layout";
import { CacheProvider } from "@emotion/react";
import Theme from "../contexts/themeContext";
// import { theme } from "../utils/theme";
import createEmotionCache from "../utils/emotionCache";
import "@fontsource/roboto";
import { Provider } from "react-redux";
import store from "../store";
import { ApolloProvider } from "@apollo/client";
import client from "../utils/apolloClient";

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
