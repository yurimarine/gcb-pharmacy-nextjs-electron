import "./globals.css";
import Providers from "./providers";
import GlobalSpinner from "./components/GlobalSpinner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <GlobalSpinner />
          {children}
        </Providers>
      </body>
    </html>
  );
}
