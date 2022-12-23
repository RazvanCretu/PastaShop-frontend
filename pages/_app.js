import "../styles/globals.css";
import Layout from "../components/Layout";
import { CacheProvider } from "@emotion/react";
import Theme from "../contexts/themeContext";
// import { theme } from "../utils/theme";
import createEmotionCache from "../utils/emotionCache";

const clientEmotionCache = createEmotionCache();

export default function App({
  Component,
  emotionCache = clientEmotionCache,
  pageProps,
}) {
  return (
    <CacheProvider value={emotionCache}>
      <Theme>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Theme>
    </CacheProvider>
  );
}
