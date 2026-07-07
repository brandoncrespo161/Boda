import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '600', '700'], variable: '--font-cormorant' });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-montserrat' });

export const metadata = {
  title: 'Boda Brandon & Mery Laura',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="font-sans bg-[#FAF8F5]">{children}</body>
    </html>
  );
}
