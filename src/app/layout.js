import { Control } from "./Control";
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Web tutorials",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const resp = await fetch( `${process.env.NEXT_PUBLIC_API_URL}topics`, { cache: 'no-store'});
  const topics = await resp.json();

  return (
    <html lang="en">
      <body>
        <h1 className="title"><Link href='/'>WEB</Link></h1>
        <ol className="list">
          {topics.map( (topic)=> {
            return <li key={ topic.id }>
              <Link href={ `/read/${topic.id}` }>{ topic.title }</Link>
            </li>
          })}
        </ol>
        {children}
        <Control />
      </body>
    </html>
  );
}
