import '../styles/globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-gradient-to-r from-indigo-900 to-blue-700 py-8 shadow">
          <h1 className="text-4xl font-extrabold text-white text-center tracking-tight drop-shadow-lg">
            Personal Finance Visualizer
          </h1>
        </header>
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="dashboard-container">{children}</div>
        </main>
      </body>
    </html>
  );
}