import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import AuthProvider from "@/app/context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${inter.className} bg-orange-50`}>
        <div className="max-w-3xl mx-auto text-slate-50">
          <header className="p-6 border-b flex justify-between rounded-bl-lg rounded-br-lg bg-gradient-to-r from-pink-400 to-pink-500">
            <Link className="text-3xl font-bold" href="/">
              Moody
            </Link>
            <div className="w-1/4 flex justify-evenly mx-auto">
              <Link className="m-auto" href="/graph">
                graph
              </Link>
              <Link className="m-auto" href="/journal">
                journal
              </Link>
            </div>
            {session?.user ? (
              <Link
                href="/api/auth/signout"
                className="bg-blue-400 hover:bg-blue-500 py-2 px-4 rounded"
              >
                Sign out
              </Link>
            ) : (
              <Link
                href="/api/auth/signin"
                className="bg-blue-400 hover:bg-blue-500 py-2 px-4 rounded"
              >
                Sign in
              </Link>
            )}
          </header>
          <AuthProvider>
            <main className="h-fit">
              {session ? (
                <div className="p-4 text-slate-700 text-2xl">
                  Hi {session?.user?.name}!
                </div>
              ) : null}
              {children}
            </main>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
