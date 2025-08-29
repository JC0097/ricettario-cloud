import './globals.css'

export const metadata = { title: 'Ricettario (PDF) – Frade', description: 'Ricettario cloud con upload PDF' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it"><body><div className="container">{children}</div></body></html>
  )
}
