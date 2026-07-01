import './globals.css'

export const metadata = {
  title: 'AI/AX 실전 바이브코딩 교육 | PROJECT 404',
  description: '우리 팀만의 업무 CRM, 바이브코딩으로 직접 만들기 — 사전 설문 및 교육 안내',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
