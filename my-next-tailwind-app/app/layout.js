import './globals.css';
import AuthClientWrapper from './components/AuthClientWrapper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQueryProvider
 from './components/ReactQueryProvider';
 import GuestIdProvider from './components/GuestIdProvider';

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
      <body>
        <AuthClientWrapper>
          <ReactQueryProvider>
          <GuestIdProvider>
          <main>{children}</main>
          <ToastContainer position="top-right" autoClose={3000} />
          </GuestIdProvider>
          </ReactQueryProvider>
        </AuthClientWrapper>
      </body>
    </html>
  );
}
