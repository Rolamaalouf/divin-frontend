import "./globals.css";
import { AuthProvider } from './context/AuthContext';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  // Optional additional parameters:
  maximumScale: 1,
  userScalable: false
}

export const metadata = {
  title: 'Wine Store',
  description: 'Premium wine selection',
  // Remove any viewport-related entries from here
}



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <AuthProvider>
      {children}
    </AuthProvider>
      </body>
    </html>
  );
}

