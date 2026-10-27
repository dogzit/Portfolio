import path from "node:path";
import {
  Document,
  Page,
  Text,
  View,
  Link,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";
import {
  BIO,
  PROJECTS,
  SKILLS,
  EDUCATION,
  EXPERIENCE,
  AWARDS,
  CONTACT_LINKS,
} from "@/lib/data";
import type { ResumeEntry } from "@/types";

/* The built-in Helvetica has no Cyrillic, which turned Наадам into "0040<"
   and тойрох хуудас into mojibake. Inter covers Latin and Cyrillic, including
   the Mongolian ө, and is bundled rather than fetched so a cold start can't
   fail on the network. */
const FONT_DIR = path.join(process.cwd(), "src/lib/fonts");
Font.register({
  family: "Inter",
  fonts: [
    { src: path.join(FONT_DIR, "Inter-400.ttf"), fontWeight: 400 },
    { src: path.join(FONT_DIR, "Inter-600.ttf"), fontWeight: 600 },
    { src: path.join(FONT_DIR, "Inter-700.ttf"), fontWeight: 700 },
  ],
});
// Long tokens like repo names shouldn't be hyphenated mid-word.
Font.registerHyphenationCallback((word) => [word]);

const COLORS = {
  ink: "#211d19",
  body: "#3d362f",
  muted: "#6f675d",
  hairline: "#d9d2c6",
  accent: "#8a5436",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 26,
    paddingHorizontal: 38,
    fontFamily: "Inter",
    fontSize: 8.6,
    lineHeight: 1.36,
    color: COLORS.body,
    backgroundColor: "#ffffff",
  },

  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  name: { fontSize: 21, lineHeight: 1.2, fontWeight: 700, color: COLORS.ink, letterSpacing: -0.5 },
  role: { fontSize: 9.5, lineHeight: 1.3, color: COLORS.accent, fontWeight: 600 },
  contactBlock: { alignItems: "flex-end" },
  contactLine: { fontSize: 8.2, color: COLORS.muted },

  summary: { marginTop: 6, fontSize: 8.6, color: COLORS.body },

  sectionTitle: {
    marginTop: 7.5,
    marginBottom: 3,
    paddingBottom: 2.5,
    borderBottomWidth: 0.7,
    borderBottomColor: COLORS.hairline,
    fontSize: 7.8,
    fontWeight: 700,
    letterSpacing: 1.1,
    textTransform: "uppercase",
    color: COLORS.ink,
  },

  entry: { marginBottom: 4 },
  compactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  compactOrg: { fontWeight: 400, color: COLORS.accent },
  entryHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  entryTitle: { fontSize: 9, fontWeight: 700, color: COLORS.ink, flex: 1, paddingRight: 8 },
  entryPeriod: { fontSize: 7.8, color: COLORS.muted },
  entryOrg: { fontSize: 8.2, color: COLORS.accent, marginBottom: 1 },

  bulletRow: { flexDirection: "row", paddingLeft: 1, marginTop: 0.5 },
  bulletDot: { width: 7, fontSize: 8.6, color: COLORS.muted },
  bulletText: { flex: 1, fontSize: 8.4 },

  stackRow: { flexDirection: "row", marginBottom: 2 },
  stackLabel: { width: 74, fontSize: 8.2, fontWeight: 700, color: COLORS.ink },
  stackList: { flex: 1, fontSize: 8.2, color: COLORS.body },

  footer: {
    position: "absolute",
    bottom: 16,
    left: 38,
    right: 38,
    fontSize: 7,
    color: COLORS.muted,
    textAlign: "center",
  },
});

const RESUME_PROJECT_IDS = [
  "lost-found",
  "surguuli",
  "sidequest",
  "naadam",
];
const RESUME_PROJECTS = RESUME_PROJECT_IDS.map((id) =>
  PROJECTS.find((p) => p.id === id),
).filter((p): p is NonNullable<typeof p> => Boolean(p));

function contact(icon: string) {
  const link = CONTACT_LINKS.find((l) => l.icon === icon);
  return { label: link?.username ?? "", href: link?.href ?? "#" };
}

function Bullets({ items }: { items: string[] }) {
  return (
    <>
      {items.map((b) => (
        <View key={b} style={styles.bulletRow}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{b}</Text>
        </View>
      ))}
    </>
  );
}

function Entry({ entry }: { entry: ResumeEntry }) {
  // With no bullets there is nothing to elaborate, so title and org share a
  // line instead of the entry taking three.
  if (entry.bullets.length === 0) {
    return (
      <View style={styles.compactRow} wrap={false}>
        <Text style={styles.entryTitle}>
          {entry.title}
          {entry.org ? <Text style={styles.compactOrg}> — {entry.org}</Text> : null}
        </Text>
        {entry.period ? <Text style={styles.entryPeriod}>{entry.period}</Text> : null}
      </View>
    );
  }

  return (
    <View style={styles.entry} wrap={false}>
      <View style={styles.entryHead}>
        <Text style={styles.entryTitle}>{entry.title}</Text>
        {entry.period ? <Text style={styles.entryPeriod}>{entry.period}</Text> : null}
      </View>
      {entry.org ? <Text style={styles.entryOrg}>{entry.org}</Text> : null}
      <Bullets items={entry.bullets} />
    </View>
  );
}

export function ResumeDocument() {
  const mail = contact("mail");
  const phone = contact("phone");
  const github = contact("github");

  return (
    <Document
      title="Zolbayar — Resume"
      author="Zolbayar"
      subject="Full-Stack Developer Resume"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>Zolbayar</Text>
            <Text style={styles.role}>Full-Stack Developer</Text>
          </View>
          <View style={styles.contactBlock}>
            <Text style={styles.contactLine}>
              <Link src={mail.href} style={{ color: COLORS.muted }}>
                {mail.label}
              </Link>
            </Text>
            <Text style={styles.contactLine}>{phone.label}</Text>
            <Text style={styles.contactLine}>
              <Link src={github.href} style={{ color: COLORS.accent }}>
                github.com/dogzit
              </Link>
            </Text>
            <Text style={styles.contactLine}>{BIO.location}</Text>
          </View>
        </View>

        <Text style={styles.summary}>
          17-year-old full-stack developer in Ulaanbaatar, building things my
          school, my university client and my classmates actually use: a
          clearance portal that retired paper forms for 109 staff, a
          lost-and-found platform a university now runs itself, and a classroom
          quiz game. Top 10 of 32 at the Open Parliament Hackathon.
        </Text>

        <Text style={styles.sectionTitle}>Education</Text>
        {EDUCATION.map((e) => (
          <Entry key={e.title} entry={e} />
        ))}

        <Text style={styles.sectionTitle}>Experience</Text>
        {EXPERIENCE.map((e) => (
          <Entry key={e.title} entry={e} />
        ))}

        <Text style={styles.sectionTitle}>Selected Projects</Text>
        {RESUME_PROJECTS.map((p) => (
          <View key={p.id} style={styles.entry} wrap={false}>
            <View style={styles.entryHead}>
              <Text style={styles.entryTitle}>
                {p.title} — {p.tagline}
              </Text>
              <Text style={styles.entryPeriod}>
                {p.year} · {p.status}
              </Text>
            </View>
            <Text style={styles.entryOrg}>{p.tags.slice(0, 5).join(" · ")}</Text>
            <Bullets items={p.bullets ?? []} />
          </View>
        ))}

        <Text style={styles.sectionTitle}>Leadership & Awards</Text>
        {AWARDS.map((a) => (
          <Entry key={a.title} entry={a} />
        ))}

        <Text style={styles.sectionTitle}>Skills</Text>
        {SKILLS.map((cat) => (
          <View key={cat.name} style={styles.stackRow}>
            <Text style={styles.stackLabel}>{cat.name}</Text>
            <Text style={styles.stackList}>
              {cat.skills.map((s) => s.name).join(" · ")}
            </Text>
          </View>
        ))}

        <Text style={styles.footer} fixed>
          github.com/dogzit ·{" "}
          {new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
        </Text>
      </Page>
    </Document>
  );
}
