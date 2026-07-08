import { Cormorant_Garamond, Montserrat } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '600', '700'], variable: '--font-cormorant' });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['300', '400', '600'], variable: '--font-montserrat' });

export const metadata = {
  title: 'Boda de Brandon & Mery Laura',
  description: 'Con inmensa alegría queremos invitarte a celebrar el día de nuestra boda este 18 de julio.',
  openGraph: {
    title: 'Nuestra Boda | Brandon & Mery Laura',
    description: '¡Toca aquí para abrir tu invitación y descubrir todos los detalles!',
    url: 'https://brandonmeryboda.vercel.app',
    siteName: 'Boda Brandon & Mery Laura',
    images: [
      {
        // Usaremos tu sello como imagen de portada para WhatsApp
        url: '/sello2.png', 
        width: 800,
        height: 600,
        alt: 'Sello de Lacre B&M',
      },
    ],
    locale: 'es_BO',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="font-sans bg-[#FAF8F5]">{children}</body>
    </html>
  );
}
