import { useState } from "react";

const readFile = (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string); // Lying to TS here. readAsText returns a string but TS thinks it can return an ArrayBuffer
    };

    reader.onerror = reject;

    reader.readAsText(file);
  });
};

const mergeHtmlAndCss = async (html?: File, css?: File) => {
  const [readHtml, readCss] = await Promise.all(
    [html, css].map((file) => {
      if (file) {
        return readFile(file);
      }

      return null;
    }),
  );

  if (readHtml) {
    const template = document.createElement("template");
    template.innerHTML = readHtml;

    const previewerStyles = document.createElement("style");
    previewerStyles.innerHTML = previewerStyleBlock;
    template.content.appendChild(previewerStyles);

    if (readCss) {
      const style = document.createElement("style");
      style.innerHTML = readCss;
      template.content.appendChild(style);
    }

    return template.innerHTML;
  }

  return null;
};

const supportedTypes = ["text/css", "text/html"];

const previewerStyleBlock = `
    .is-hovered {
        outline: 1px solid red;
    }

    .is-selected {
        outline: 1px solid blue;
    }
`;

export default function Uploader({
  filesParsedHandler,
  children,
}: {
  filesParsedHandler: ({ domString, filename }: { domString: string; filename: string | undefined }) => void;
  children: React.ReactNode;
}) {
  const [error, setError] = useState<string | null>(null);

  return (
    <div
      className="h-full w-full"
      onDrop={(e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);

        if (files.length > 2) {
          setError("Too many files");
          return;
        }

        const unsupportedFiles = files.some((file) => !supportedTypes.includes(file.type));

        if (unsupportedFiles) {
          setError("Unsupported file type");
          return;
        }

        const html = files?.find((file) => file.type === "text/html");
        const css = files?.find((file) => file.type === "text/css");

        mergeHtmlAndCss(html, css).then((merged) => {
          if (merged) {
            filesParsedHandler({ domString: merged, filename: html?.name });
          }
        });
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      {error ? (
        <div className="text-red-500 space-y-3 text-center">
          <p>{error}</p>
          <button
            className="bg-slate-100 text-black p-3"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setError(null);
            }}
          >
            Reset
          </button>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
