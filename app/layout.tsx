export const metadata = {
  title: 'MrJournal',
  description: 'Your friendly journaling app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
