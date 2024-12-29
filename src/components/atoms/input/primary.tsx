// src/components/molecules/input/InputPrimary.tsx
import { cn } from "@/lib/utils";
import { Input } from "./default"; // Adjust the import based on your structure

// Define the props interface based on common input attributes
interface InputPrimaryProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string; // Add title as an optional prop
}

// Define the InputPrimary functional component
const InputPrimary: React.FC<InputPrimaryProps> = ({
  className,
  title,
  ...rest
}) => {
  return (
    <>
      {title && (
        <label className="block text-sm font-medium text-gray-700 !dark:text-gray-200">
          {title}
        </label>
      )}{" "}
      {/* Conditional rendering of the title */}
      <Input
        {...rest}
        className={cn("", className)} // Changed placeholder class for dark mode
      />
    </>
  );
};

export default InputPrimary;
