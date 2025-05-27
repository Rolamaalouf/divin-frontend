// app/layout.js (or wherever your RootLayout lives)
import './globals.css';
import AuthClientWrapper from './components/AuthClientWrapper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQueryProvider from './components/ReactQueryProvider';
import GuestIdProvider from './components/GuestIdProvider';
import LayoutWrapper from './components/LayoutWrapper';
import { CartPopupProvider } from './context/CartPopupContext';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  title: 'Wine Store',
  description: 'Premium wine selection',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     
      <body className="min-h-screen flex flex-col">
        <ReactQueryProvider>
            <GuestIdProvider>
            <AuthClientWrapper>
              <LayoutWrapper>
                <CartPopupProvider>
                  <main className="flex-1">
                    {children}
                  </main>
                </CartPopupProvider>
              </LayoutWrapper>
              <ToastContainer position="top-right" autoClose={3000} />
          </AuthClientWrapper>
              </GuestIdProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
