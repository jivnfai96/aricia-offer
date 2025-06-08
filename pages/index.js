import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function Home() {
  return (
    <div
      className={`${inter.className} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-decimal list-inside text-sm sm:text-base text-center sm:text-left font-mono space-y-2">
          <li>
            Get started by editing{" "}
            <code className="bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded font-semibold">
              pages/index.js
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
        <div className="flex gap-4 flex-col sm:flex-row items-center">
          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-neutral-700 dark:hover:bg-neutral-300 transition px-5 py-3 text-sm sm:text-base font-medium flex items-center gap-2"
          >
            <Image
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
              className="dark:invert"
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900 px-5 py-3 text-sm sm:text-base font-medium"
          >
            Read our docs
          </a>
        </div>
      </main>

      <footer className="row-start-3 flex flex-wrap gap-6 justify-center text-sm text-neutral-500 dark:text-neutral-400">
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
