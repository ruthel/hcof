export default function Container({
  as: Tag = "div",
  className = "",
  wide = false,
  children,
}) {
  const width = wide ? "max-w-[1500px]" : "max-w-[1180px]";

  return (
    <Tag className={`mx-auto w-full ${width} px-5 sm:px-6 lg:px-8 ${className}`.trim()}>
      {children}
    </Tag>
  );
}
