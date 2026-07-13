import type { Experience, Project, SkillCategory, SocialLink, Stat } from "@/types";

export const siteConfig = {
  brandName: "ArtFlow Studio",
  brandLogo: "/artflow-studio-logo.png",
  email: "mehdiwork514@gmail.com",
  phone: "09912429235",
  telegram: "IDMehdisalimiyan",
  telegramUrl: "https://t.me/IDMehdisalimiyan",
};

export const stats: Stat[] = [
  { id: "experience", value: "4+", icon: "briefcase" },
  { id: "projects", value: "15+", icon: "folder" },
  { id: "skills", value: "15+", icon: "code" },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "webDesign",
    level: 90,
    color: "#6366f1",
    icon: "web",
    items: [
      { id: "html", level: 95, color: "#E44D26", icon: "html" },
      { id: "css", level: 92, color: "#264DE4", icon: "css" },
      { id: "javascript", level: 88, color: "#F7DF1E", icon: "javascript" },
      { id: "react", level: 85, color: "#61DAFB", icon: "react" },
      { id: "nextjs", level: 82, color: "#FFFFFF", icon: "nextjs" },
      { id: "nodejs", level: 78, color: "#68A063", icon: "nodejs" },
      { id: "python", level: 75, color: "#3776AB", icon: "python" },
      { id: "database", level: 80, color: "#336791", icon: "database" },
    ],
  },
  {
    id: "videoEditing",
    level: 88,
    color: "#F43F5E",
    icon: "video",
  },
  {
    id: "photoshop",
    level: 85,
    color: "#31A8FF",
    icon: "photoshop",
  },
  {
    id: "woodArt",
    level: 80,
    color: "#D97706",
    icon: "wood",
  },
  {
    id: "posterDesign",
    level: 87,
    color: "#A855F7",
    icon: "poster",
  },
  {
    id: "teaserEditing",
    level: 86,
    color: "#06B6D4",
    icon: "teaser",
  },
  {
    id: "smartAutomation",
    level: 88,
    color: "#10B981",
    icon: "automation",
  },
  {
    id: "telegramBots",
    level: 85,
    color: "#0EA5E9",
    icon: "bot",
  },
  {
    id: "n8n",
    level: 84,
    color: "#FF6D5A",
    icon: "n8n",
  },
];

export const projects: Project[] = [
  {
    id: "moghufe",
    hideTechnologies: true,
    live: "https://moghufe-rashti.com",
    image: "/projects/moghufe-logo.png",
    gradient: "from-amber-700/50 via-amber-900/40 to-stone-900/60",
    accent: "#D97706",
  },
  {
    id: "portfolio",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    live: "https://artflow-portfolio1.netlify.app",
    gradient: "from-violet-600/40 via-indigo-500/30 to-cyan-500/40",
    accent: "#8B5CF6",
  },
];

export const experiences: Experience[] = [
  { id: "1", period: "۱۴۰۲ — اکنون", type: "work" },
  { id: "4", period: "۱۴۰۳ — اکنون", type: "work" },
  { id: "5", period: "۱۴۰۳ — اکنون", type: "work" },
  { id: "2", period: "۱۴۰۳ — اکنون", type: "work" },
  { id: "3", period: "۱۳۹۹ — اکنون", type: "work" },
];

export const socialLinks: SocialLink[] = [
  { name: "Telegram", url: "https://t.me/IDMehdisalimiyan", icon: "telegram" },
  { name: "GitHub", url: "https://github.com", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
  { name: "Twitter", url: "https://twitter.com", icon: "twitter" },
];

export const navLinkIds = [
  "home",
  "about",
  "skills",
  "projects",
  "experience",
  "contact",
] as const;

export const codeSnippets = [
  `const Portfolio = () => {
  const skills = [
    'React', 'Next.js',
    'UI/UX Design'
  ];

  return (
    <Hero name="Mohammad Mahdi" />
  );
};`,
  `function createWebsite() {
  const design = craftUI();
  const code = writeCleanCode();
  const deploy = launchSite();

  return { design, code, deploy };
}`,
  `// طراحی سایت حرفه‌ای
export default function Home() {
  return (
  <main className="premium">
    <Header />
    <Projects />
  </main>
  );
}`,
  `// Telegram Bot + n8n Automation
bot.on('message', async (ctx) => {
  const order = await n8n.trigger(
    'order-workflow', ctx.message
  );
  return ctx.reply(order.status);
});`,
];
