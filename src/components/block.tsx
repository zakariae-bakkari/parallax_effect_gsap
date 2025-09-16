export function Block({
  className,
  title,
  description,
  children,
}: {
  className?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`h-[100vh] w-[100vw] flex items-center justify-center flex-col p-4 md:p-8 relative ${className}`}
    >
      {children}
      <h2 className="text-white text-3xl md:text-4xl lg:text-6xl font-bold mb-2 md:mb-4 text-center px-4">
        {title}
      </h2>
      <p className="text-white text-sm md:text-lg lg:text-xl max-w-2xl text-center px-4">
        {description}
      </p>
    </div>
  );
}