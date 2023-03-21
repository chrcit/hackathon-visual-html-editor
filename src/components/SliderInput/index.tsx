import * as Label from "@radix-ui/react-label";
import * as Slider from "@radix-ui/react-slider";
import clsx from "clsx";

interface SliderInputProps {
  id?: string;
  label?: string;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
}

export const SliderInput = ({
  id = "input-value",
  label = "Label",
  step = 1,
  value = 0,
  onChange,
}: SliderInputProps) => {
  return (
    <div className={clsx("flex items-center gap-6")}>
      <Label.Root className={clsx("text-sm font-normal", "shrink-0")} htmlFor={id}>
        {label}
      </Label.Root>

      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-[20px]"
        value={[value]}
        onValueChange={(value) => onChange?.(value[0])}
        max={100}
        step={step}
        aria-label="Volume"
      >
        <Slider.Track className="bg-black/10 relative flex-grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-black rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-4 h-4 bg-white focus:outline-none border-2 border-black/70 hover:border-black rounded-xl" />
      </Slider.Root>
    </div>
  );
};
