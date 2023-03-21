import clsx from "clsx";
import { useEffect, useState } from "react";

const validatedStyle = (style: string | undefined) => {
  if (typeof style === "undefined") {
    return false;
  }

  return style.trim().length > 0;
};

export default function StyleInput({
  name,
  validator,
  value,
  onValidatedChange,
}: {
  name: string;
  validator: (value: string) => boolean;
  value?: string;
  onValidatedChange: (value: string) => void;
}) {
  const [style, setStyle] = useState(value);

  useEffect(() => {
    setStyle((prev) => {
      if (prev !== null && typeof prev !== "undefined") {
        return prev;
      }

      return style;
    });
  }, [style, setStyle]);

  useEffect(() => {
    if (typeof style !== "undefined" && validator(style)) {
      onValidatedChange(style);
    }
  }, [style, validator, onValidatedChange]);

  return (
    <input
      type="text"
      name={name}
      className={clsx(
        "bg-gray rounded-md flex-1 px-2 py-1 w-10 placeholder:text-black/40",
        typeof style !== "undefined" && validator(style) ? "outline outline-red-200" : "outline-0",
      )}
      placeholder="0"
      value={style}
      onChange={(e) => {
        setStyle(e.target.value);
      }}
    />
  );
}
