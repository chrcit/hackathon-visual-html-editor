import { useEditorStore } from "@/state/editor";

export default function EditorHeader() {
  const filename = useEditorStore((state) => state.filename);
  const iframe = useEditorStore((state) => state.iframe);

  // TODO: Remove possible client styles

  const download = () => {
    if (iframe && iframe.contentDocument) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(new Blob([iframe.contentDocument.documentElement.outerHTML]));
      link.download = filename ?? "file.html";
      link.click();
    }
  };

  return (
    <div className="flex flex-col gap-2 text-center">
      <h1 className="font-semibold">{filename ?? "File Name"}</h1>
      {iframe && (
        <button className="text-xs text-slate-400" onClick={download}>
          Download
        </button>
      )}
    </div>
  );
}
