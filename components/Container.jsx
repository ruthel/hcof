export default function Container({ as: Tag = "div", className = "", children }) {
  return (
    <Tag className={`mx-auto w-full max-w-[1180px] px-5 sm:px-6 lg:px-8 ${className}`.trim()}>
      {children}
    </Tag>
  );
}
