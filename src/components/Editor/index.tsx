import { Inter } from "@next/font/google";
import { DomTreeInspector } from "@/components/DomTreeInpsector";
import EditorHeader from "@/components/EditorHeader";
import Previewer from "@/components/Previewer";
import StyleInsepctor from "@/components/StyleInsepctor";

const inter = Inter({ subsets: ["latin"] });

export default function EditorComponent({}) {
  return (
    <main className={`h-full w-full flex flex-col ${inter.className}`}>
      <header
        className="w-full flex items-center justify-center py-5 border-b-gray-dark border-b"
        aria-label="File Header"
      >
        <EditorHeader />
      </header>
      <div className="w-full flex flex-row flex-grow max-h-full h-full">
        <section className="min-w-[300px] max-h-full overflow-auto py-5 border-r-gray-dark border-r">
          <DomTreeInspector />
        </section>
        <section className="w-full h-full overflow-auto flex justify-center items-center">
          <Previewer />
        </section>
        <section className="min-w-[300px] max-h-full overflow-auto py-5 border-l-gray-dark border-l">
          <StyleInsepctor />
        </section>
      </div>
    </main>
  );
}
