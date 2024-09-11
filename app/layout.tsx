import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from './NavBar';
import { Container, Theme, ThemePanel } from '@radix-ui/themes';
import { AuthProvider } from './auth/Provider';
import QueryClientProvider from './QueryClientProvider';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'Next.js Project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
      <QueryClientProvider>
        <AuthProvider>
          <Theme accentColor="violet" radius="small">
            <NavBar />
            <main>    
              <Container>
                {children}
              </Container>    
            </main>
            {/*<ThemePanel /> Esto es para poder configurar el Tema con interfaz.*/}
          </Theme>
        </AuthProvider>
      </QueryClientProvider>
      </body>
    </html>
  )
}
