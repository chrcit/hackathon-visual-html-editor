import { useEffect, useState } from "react";
import { useEditorStore } from "@/state/editor";
import { SliderInput } from "@/components/SliderInput";
import clsx from "clsx";

const cssUnits = ["px", "em", "rem", "vw", "vh", "vmin", "vmax", "%"];

const valueWithoutUnit = (value: string) => {
  const unit = cssUnits.find((unit) => value.endsWith(unit));
  if (!unit) return value;
  return value.replace(unit, "");
};

const validateDimension = (value: string | undefined) => {
  console.log(value);
  if (typeof value === "undefined" || value === "") return false;
  if (value === "auto" || value === "none") return true;
  const withoutUnit = valueWithoutUnit(value);
  const parsed = Number(withoutUnit);

  if (Number.isNaN(parsed)) return false;
  return parsed >= 0;
};

export default function StylesPanel({ selectedId }: { selectedId: string }) {
  const iframe = useEditorStore((state) => state.iframe);
  const iframeBody = iframe?.contentWindow?.document.body;

  const selectedNode = iframeBody?.querySelector(`[data-node-id="${selectedId}"]`) as HTMLElement;
  const styles = typeof window !== undefined && selectedNode ? window.getComputedStyle(selectedNode) : undefined;

  const [opacity, setOpacity] = useState(styles?.opacity ? styles?.opacity : "1");
  const [borderRadius, setBorderRadius] = useState(styles?.borderRadius ? styles?.borderRadius : undefined);
  const [width, setWidth] = useState<string | undefined>(styles?.width ? styles?.width : undefined);
  const [height, setHeight] = useState<string | undefined>(styles?.height ? styles?.height : undefined);
  const [minWidth, setMinWidth] = useState<string | undefined>(styles?.minWidth ? styles?.minWidth : undefined);
  const [minHeight, setMinHeight] = useState<string | undefined>(styles?.minHeight ? styles?.minHeight : undefined);
  const [maxWidth, setMaxWidth] = useState<string | undefined>(styles?.maxWidth ? styles?.maxWidth : undefined);
  const [maxHeight, setMaxHeight] = useState<string | undefined>(styles?.maxHeight ? styles?.maxHeight : undefined);

  useEffect(() => {
    if (selectedNode) {
      setOpacity((prev) => {
        if (prev !== null && typeof prev !== "undefined") {
          return prev;
        }
        return styles?.opacity ? styles?.opacity : "1";
      });
      setBorderRadius((prev) => {
        if (prev !== null && typeof prev !== "undefined") {
          return prev;
        }
        return styles?.borderRadius ? styles?.borderRadius : undefined;
      });
      setWidth((prev) => {
        if (prev !== null && typeof prev !== "undefined") {
          return prev;
        }
        return styles?.width ? styles?.width : undefined;
      });
      setHeight((prev) => {
        if (prev !== null && typeof prev !== "undefined") {
          return prev;
        }
        return styles?.height ? styles?.height : undefined;
      });
      setMinWidth((prev) => {
        if (prev !== null && typeof prev !== "undefined") {
          return prev;
        }
        return styles?.minWidth ? styles?.minWidth : undefined;
      });
      setMinHeight((prev) => {
        if (prev !== null && typeof prev !== "undefined") {
          return prev;
        }
        return styles?.minHeight ? styles?.minHeight : undefined;
      });
      setMaxWidth((prev) => {
        if (prev !== null && typeof prev !== "undefined") {
          return prev;
        }
        return styles?.maxWidth ? styles?.maxWidth : undefined;
      });
      setMaxHeight((prev) => {
        if (prev !== null && typeof prev !== "undefined") {
          return prev;
        }
        return styles?.maxHeight ? styles?.maxHeight : undefined;
      });
    }
  }, [
    selectedId,
    selectedNode,
    styles,
    setOpacity,
    setBorderRadius,
    setWidth,
    setHeight,
    setMinWidth,
    setMinHeight,
    setMaxWidth,
    setMaxHeight,
  ]);

  useEffect(() => {
    if (selectedNode) {
      if (borderRadius && validateDimension(borderRadius)) selectedNode.style.borderRadius = borderRadius;
      if (width && validateDimension(width)) selectedNode.style.width = width;
      if (height && validateDimension(height)) selectedNode.style.height = height;
      if (minWidth && validateDimension(minWidth)) selectedNode.style.minWidth = minWidth;
      if (minHeight && validateDimension(minHeight)) selectedNode.style.minHeight = minHeight;
      if (maxWidth && validateDimension(maxWidth)) selectedNode.style.maxWidth = maxWidth;
      if (maxHeight && validateDimension(maxHeight)) selectedNode.style.maxHeight = maxHeight;
    }
  }, [selectedNode, borderRadius, width, height, minWidth, minHeight, maxWidth, maxHeight]);

  return (
    <div>
      <section className="flex flex-col gap-3">
        <SliderInput
          step={1}
          label="Opacity"
          value={opacity ? parseFloat(opacity) * 100 : 100}
          onChange={(value) => {
            selectedNode.style.opacity = `${value / 100}`;
            setOpacity(`${value / 100}`);
          }}
        />
        <label htmlFor="corner" className="flex flex-row items-center gap-6">
          <div className="text-gray-400 text-sm ">Corner</div>
          <input
            type="text"
            name="corner"
            className={clsx(
              "bg-gray rounded-md flex-grow px-2 py-1 w-10 placeholder:text-black/40",
              validateDimension(borderRadius) ? "outline-0" : "outline-1 outline-red-200",
            )}
            placeholder="0"
            value={borderRadius}
            onChange={(e) => {
              setBorderRadius(e.target.value);
            }}
          />
        </label>
      </section>
      <hr className="h-[2px] bg-[#F2F2F2] my-5" />
      <section className="grid grid-cols-2 gap-3">
        <label htmlFor="width" className="flex flex-row items-center gap-2">
          <div className="text-gray-400 text-sm flex-1">Width</div>
          <input
            type="text"
            name="width"
            className={clsx(
              "bg-gray rounded-md flex-1 px-2 py-1 w-10 placeholder:text-black/40",
              validateDimension(width) ? "outline-0" : "outline outline-red-200",
            )}
            placeholder="0"
            value={width}
            onChange={(e) => {
              setWidth(e.target.value);
            }}
          />
        </label>
        <label htmlFor="height" className="flex flex-row items-center gap-2">
          <div className="text-gray-400 text-sm flex-1">Height</div>
          <input
            type="text"
            name="height"
            className={clsx(
              "bg-gray rounded-md flex-1 px-2 py-1 w-10 placeholder:text-black/40",
              validateDimension(height) ? "outline-0" : "outline outline-red-200",
            )}
            placeholder="0"
            value={height}
            onChange={(e) => {
              setHeight(e.target.value);
            }}
          />
        </label>
        <label htmlFor="minWidth" className="flex flex-row items-center gap-2">
          <div className="text-gray-400 text-sm flex-1">Min W</div>
          <input
            type="text"
            name="minWidth"
            className={clsx(
              "bg-gray rounded-md flex-1 px-2 py-1 w-10 placeholder:text-black/40",
              validateDimension(minWidth) ? "outline-0" : "outline outline-red-200",
            )}
            placeholder="0"
            value={minWidth}
            onChange={(e) => {
              setMinWidth(e.target.value);
            }}
          />
        </label>
        <label htmlFor="minHeight" className="flex flex-row items-center gap-2">
          <div className="text-gray-400 text-sm flex-1">Min H</div>
          <input
            type="text"
            name="minHeight"
            className={clsx(
              "bg-gray rounded-md flex-1 px-2 py-1 w-10 placeholder:text-black/40",
              validateDimension(minHeight) ? "outline-0" : "outline outline-red-200",
            )}
            placeholder="0"
            value={minHeight}
            onChange={(e) => {
              setMinHeight(e.target.value);
            }}
          />
        </label>
        <label htmlFor="maxWidth" className="flex flex-row items-center gap-2">
          <div className="text-gray-400 text-sm flex-1">Max W</div>
          <input
            type="text"
            name="maxWidth"
            className={clsx(
              "bg-gray rounded-md flex-1 px-2 py-1 w-10 placeholder:text-black/40",
              validateDimension(maxWidth) ? "outline-0" : "outline outline-red-200",
            )}
            placeholder="0"
            value={maxWidth}
            onChange={(e) => {
              setMaxWidth(e.target.value);
            }}
          />
        </label>
        <label htmlFor="maxHeight" className="flex flex-row items-center gap-2">
          <div className="text-gray-400 text-sm flex-1">Max H</div>
          <input
            type="text"
            name="maxHeight"
            className={clsx(
              "bg-gray rounded-md flex-1 px-2 py-1 w-10 placeholder:text-black/40",
              validateDimension(maxHeight) ? "outline-0" : "outline outline-red-200",
            )}
            placeholder="0"
            value={maxHeight}
            onChange={(e) => {
              setMaxHeight(e.target.value);
            }}
          />
        </label>
      </section>
    </div>
  );
}
