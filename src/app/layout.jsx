import { Raleway } from "next/font/google";
import { Providers } from "./providers";
import { Overlay } from "./overlay";

import "./globals.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "FisiomFulness",
  description: "Sitio web para ofrecer servicios de fisioterapia",
};

const raleway = Raleway({
  weight: ["200", "300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${raleway.className} `}>
        <Providers>
          <Overlay>{children}</Overlay>
          <Toaster
            position="top-right"
            toastOptions={{
              // Define default options
              className: "",
              duration: 5000,
              style: {
                background: "#363636",
                color: "#fff",
              },

              // Default options for specific types
              success: {
                duration: 3000,
                theme: {
                  primary: "green",
                  secondary: "black",
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
