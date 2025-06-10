// src/components/ui/button.jsx
export function Button({ children, className = "", variant = "default", ...props }) {
  const base = "rounded-2xl font-semibold transition duration-200";
  const variants = {
    default: "bg-yellow-400 hover:bg-yellow-300 text-black",
    outline: "border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
