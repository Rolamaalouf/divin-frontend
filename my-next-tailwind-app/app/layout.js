import "./globals.css";
import AuthClientWrapper from './components/AuthClientWrapper';

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
      <AuthClientWrapper>
          {children}
        </AuthClientWrapper>
      </body>
    </html>
  );
}

