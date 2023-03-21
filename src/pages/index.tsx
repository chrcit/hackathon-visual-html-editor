import Head from "next/head";
import EditorComponent from "@/components/Editor";

export default function Home() {
  return (
    <>
      <Head>
        <title>HTMLFlow</title>
        <meta name="description" content="Visual HTML & CSS Editor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <EditorComponent />
    </>
  );
}
