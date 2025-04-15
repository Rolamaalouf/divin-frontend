// layout.js or layout.jsx
import './globals.css';
import AuthClientWrapper from './components/AuthClientWrapper';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export const metadata = {
  title: 'Wine Store',
  description: 'Premium wine selection'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthClientWrapper>
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </AuthClientWrapper>
      </body>
    </html>
  );
}
