import "../styles/globals.css";
import "../styles/calendar.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import SSRProvider from "react-bootstrap/SSRProvider";
import { CalendarContextProvider } from "../context/CalendarContext";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CalendarContextProvider>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </CalendarContextProvider>
  );
}

export default MyApp;
