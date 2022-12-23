import "../styles/globals.css";
import Layout from "../components/Layout";
import { CacheProvider } from "@emotion/react";
import Theme from "../contexts/themeContext";
// import { theme } from "../utils/theme";
import createEmotionCache from "../utils/emotionCache";
import "@fontsource/roboto";
import { Provider } from "react-redux";
import store from "../store";

const clientEmotionCache = createEmotionCache();

function App({ Component, emotionCache = clientEmotionCache, pageProps }) {
  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <Theme>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Theme>
      </Provider>
    </CacheProvider>
  );
}

export default App;
