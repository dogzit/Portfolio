import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from "@react-pdf/renderer";
import { BIO, PROJECTS, SKILLS, TIMELINE, CONTACT_LINKS } from "@/lib/data";

const COLORS = {
  ink: "#0a0a14",
  body: "#374151",
  muted: "#6b7280",
  hairline: "#e5e7eb",
  accent: "#2563eb",
  accentSoft: "#dbeafe",
  white: "#ffffff",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 36,
    paddingHorizontal: 40,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: COLORS.body,
    backgroundColor: COLORS.white,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  headerLeft: { flexDirection: "column" },
  name: {
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    color: COLORS.ink,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 10.5,
    color: COLORS.accent,
    marginTop: 3,
    fontFamily: "Helvetica-Bold",
  },
  headerRight: {
    flexDirection: "column",
    alignItems: "flex-end",
    fontSize: 8.5,
    color: COLORS.muted,
  },
  contactLine: { marginBottom: 1.5 },

  rule: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.hairline,
    marginTop: 10,
    marginBottom: 12,
  },

  // Sections
  sectionTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.5,
    color: COLORS.accent,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  sectionBlock: { marginBottom: 13 },

  summary: { fontSize: 10, color: COLORS.body, lineHeight: 1.45 },
  tagline: {
    fontSize: 9,
    color: COLORS.muted,
    fontStyle: "italic",
    marginTop: 4,
  },

  // Skills grid
  skillsGrid: { flexDirection: "row", flexWrap: "wrap" },
  skillCategory: { width: "50%", marginBottom: 6, paddingRight: 8 },
  skillCategoryName: {
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: COLORS.ink,
    marginBottom: 2,
  },
  skillList: { fontSize: 9, color: COLORS.body, lineHeight: 1.4 },

  // Projects
  project: { marginBottom: 8 },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 2,
  },
  projectTitle: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    color: COLORS.ink,
  },
  projectMeta: {
    fontSize: 8.5,
    color: COLORS.muted,
    fontFamily: "Helvetica-Bold",
  },
  projectTagline: {
    fontSize: 8.5,
    color: COLORS.accent,
    marginBottom: 2,
  },
  projectDescription: {
    fontSize: 9,
    color: COLORS.body,
    lineHeight: 1.4,
  },
  projectTags: {
    fontSize: 8,
    color: COLORS.muted,
    marginTop: 2,
    fontFamily: "Helvetica-Oblique",
  },

  // Timeline
  timelineItem: { marginBottom: 6, flexDirection: "row" },
  timelinePeriod: {
    width: 78,
    fontSize: 8.5,
    color: COLORS.muted,
    fontFamily: "Helvetica-Bold",
    paddingTop: 1,
  },
  timelineBody: { flex: 1 },
  timelineTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: COLORS.ink,
  },
  timelineSubtitle: {
    fontSize: 8.5,
    color: COLORS.accent,
    marginBottom: 1,
  },
  timelineDescription: { fontSize: 9, color: COLORS.body, lineHeight: 1.4 },

  footer: {
    position: "absolute",
    bottom: 18,
    left: 40,
    right: 40,
    fontSize: 7.5,
    color: COLORS.muted,
    textAlign: "center",
    fontFamily: "Helvetica-Oblique",
  },
});

const SUMMARY_PROJECTS = PROJECTS.slice(0, 6);
const SUMMARY_TIMELINE = TIMELINE.slice(-4); // most recent

function contact(icon: string): string {
  const link = CONTACT_LINKS.find((l) => l.icon === icon);
  return link?.username ?? "";
}

function contactHref(icon: string): string {
  const link = CONTACT_LINKS.find((l) => l.icon === icon);
  return link?.href ?? "#";
}

export function ResumeDocument() {
  return (
    <Document
      title="Zolbayar — Resume"
      author="Zolbayar"
      subject="Full-Stack Developer Resume"
    >
      <Page size="A4" style={styles.page}>
        {/* ── Header ───────────────────────────────────────────────────── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>Zolbayar</Text>
            <Text style={styles.subtitle}>Full-Stack Developer · Team Lead</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.contactLine}>
              <Link src={contactHref("mail")} style={{ color: COLORS.body }}>
                {contact("mail")}
              </Link>
            </Text>
            <Text style={styles.contactLine}>{contact("phone")}</Text>
            <Text style={styles.contactLine}>
              <Link
                src={contactHref("github")}
                style={{ color: COLORS.accent }}
              >
                github.com/dogzit
              </Link>
            </Text>
            <Text style={styles.contactLine}>Ulaanbaatar, Mongolia</Text>
          </View>
        </View>
        <View style={styles.rule} />

        {/* ── Summary ──────────────────────────────────────────────────── */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summary}>{BIO.story}</Text>
          <Text style={styles.tagline}>&ldquo;{BIO.tagline}&rdquo;</Text>
        </View>

        {/* ── Stack ────────────────────────────────────────────────────── */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Stack</Text>
          <View style={styles.skillsGrid}>
            {SKILLS.map((cat) => (
              <View key={cat.name} style={styles.skillCategory}>
                <Text style={styles.skillCategoryName}>{cat.name}</Text>
                <Text style={styles.skillList}>
                  {cat.skills.map((s) => s.name).join(" · ")}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Selected Work ────────────────────────────────────────────── */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Selected Work</Text>
          {SUMMARY_PROJECTS.map((p) => (
            <View key={p.id} style={styles.project} wrap={false}>
              <View style={styles.projectHeader}>
                <Text style={styles.projectTitle}>{p.title}</Text>
                <Text style={styles.projectMeta}>
                  {p.year} · {p.status}
                </Text>
              </View>
              <Text style={styles.projectTagline}>{p.tagline}</Text>
              <Text style={styles.projectDescription}>{p.description}</Text>
              <Text style={styles.projectTags}>{p.tags.join(" · ")}</Text>
            </View>
          ))}
        </View>

        {/* ── Journey ──────────────────────────────────────────────────── */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>Journey</Text>
          {SUMMARY_TIMELINE.map((t) => (
            <View key={t.title} style={styles.timelineItem} wrap={false}>
              <Text style={styles.timelinePeriod}>{t.period}</Text>
              <View style={styles.timelineBody}>
                <Text style={styles.timelineTitle}>{t.title}</Text>
                <Text style={styles.timelineSubtitle}>{t.subtitle}</Text>
                <Text style={styles.timelineDescription}>{t.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.footer} fixed>
          Generated from zolbayar.dev — current as of {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </Text>
      </Page>
    </Document>
  );
}
