import PageSection from "./PageSection";

const roles = ["president", "secretary", "treasurer"];

export default function TeamSection({ t }) {
  return (
    <PageSection index="team" id="team" className="alt">
      <h2>{t("team.heading")}</h2>
      <p>{t("team.intro")}</p>
      <p className="mb-8 border-l-2 border-hcof-gold pl-4 text-sm text-hcof-muted">{t("team.demo")}</p>
      <div className="grid team-grid">
        {roles.map(role => (
          <article key={role} className="overflow-hidden border border-hcof-ink/15 bg-hcof-paper">
            <div className="relative">
              <img src={`/assets/team/${role}.svg`} alt={t("team.portrait")} width="480" height="480" className="aspect-square w-full object-cover" loading="lazy" />
              <span className="absolute bottom-3 left-3 bg-hcof-paper px-3 py-1 font-ui text-xs text-hcof-muted">{t("team.photoPlaceholder")}</span>
            </div>
            <div className="p-6">
              <p className="mb-2 font-ui text-xs font-semibold uppercase tracking-wider text-hcof-leaf">{t(`team.${role}.role`)}</p>
              <h3>{t(`team.${role}.name`)}</h3>
              <p className="mb-0 mt-4 text-sm leading-7 text-hcof-muted">{t(`team.${role}.bio`)}</p>
            </div>
          </article>
        ))}
      </div>
    </PageSection>
  );
}
