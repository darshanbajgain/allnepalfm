import { cn } from "@/lib/utils";

const Loader = ({ size = "md", color = "primary", className, ...props }) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
        {
          "h-6 w-6 border-2": size === "sm",
          "h-10 w-10 border-4": size === "md",
          "h-16 w-16 border-[6px]": size === "lg",
        },
        {
          "text-primary": color === "primary",
          "text-secondary": color === "secondary",
          "text-accent": color === "accent",
        },
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;
