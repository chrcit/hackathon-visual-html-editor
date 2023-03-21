import clsx from "clsx";

type ExampleComponentProps = {
  className?: string;
  isFancy: boolean;
};

export const ExampleComponent = ({ className, isFancy }: ExampleComponentProps) => {
  return (
    <div className={clsx("font-bold text-sm px-4 py-2 bg-gray-50 rounded-lg", className)}>
      {isFancy && "This is a fancy component"}
    </div>
  );
};
