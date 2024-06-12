import { Inter } from "next/font/google";
import "./globals.css";
import { MantineProvider, createTheme } from "@mantine/core";
import { CartProvider } from "@/context/CartContext";
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Way Out",
  description: "Way Out - The best way to stand out in the crowd!",
};
const theme = createTheme({
  /** Put your mantine theme override here */
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider
          defaultColorScheme="auto"
          theme={theme}>
          <CartProvider>
            {children}
          </CartProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
