import Container from "./Container";

export default function PageSection({ index, className, id, children }) {
  return (
    <section id={id} className={className || undefined} data-section={index}>
      <Container>
        <div className="localized-section">{children}</div>
      </Container>
    </section>
  );
}
