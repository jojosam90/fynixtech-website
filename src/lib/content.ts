export interface Bi {
  en: string;
  zh: string;
}

export const brand: Bi = { en: "Fynix Tech", zh: "Fynix Tech" };
export const brandShort: Bi = { en: "Fynix Tech", zh: "Fynix Tech" };

export const nav: { label: Bi; href: string; children?: { label: Bi; href: string }[]; tagline?: Bi }[] = [
  { label: { en: "Home", zh: "首页" }, href: "#home" },
  {
    label: { en: "Case Center", zh: "案例中心" },
    href: "#cases",
    tagline: { en: "300+ engineers, tailor-made products that deliver real value", zh: "300+开发人员，量身定制，给您提供有价值的产品" },
    children: [
      { label: { en: "Custom UI Mall", zh: "高定UI商城" }, href: "#cases" },
      { label: { en: "AI Big Data", zh: "AI大数据" }, href: "#cases" },
      { label: { en: "Smart IoT", zh: "智慧物联网" }, href: "#cases" },
      { label: { en: "Local Services", zh: "本地服务" }, href: "#cases" },
      { label: { en: "Social Networking", zh: "社交交友" }, href: "#cases" },
      { label: { en: "Education & Training", zh: "教育培训" }, href: "#cases" },
      { label: { en: "Data Visualization", zh: "可视化智慧大屏" }, href: "#cases" },
      { label: { en: "Instant Messaging", zh: "聊天即时通讯" }, href: "#cases" },
      { label: { en: "Online Gaming", zh: "线上电玩城" }, href: "#cases" },
      { label: { en: "Other Cases", zh: "其他优秀案例" }, href: "#cases" },
    ],
  },
  {
    label: { en: "Solutions", zh: "解决方案" },
    href: "#solutions",
    tagline: { en: "Whatever your industry, we tailor a solution to fit", zh: "不管是哪个行业，我们都可以提供定制化的解决方案" },
    children: [{ label: { en: "Industry Solutions", zh: "行业方案" }, href: "#solutions" }],
  },
  { label: { en: "Contact Us", zh: "联系我们" }, href: "#contact" },
];

export const heroSlides: { title: Bi; subtitle: Bi; cta: Bi; gradient: string; image: string }[] = [
  {
    title: { en: "Custom App Development", zh: "定制应用开发" },
    subtitle: { en: "Cross-industry custom development backed by multiple shipped cases, from concept to app-store launch.", zh: "跨行业定制化开发，多个落地案例保驾护航，从需求到上线全程护航。" },
    cta: { en: "Consult Now", zh: "立即咨询" },
    gradient: "from-[#0146ad] via-[#0a3d91] to-[#00224f]",
    image: "/hero/app-development.jpg",
  },
  {
    title: { en: "IoT & Hardware Integration", zh: "物联网软硬件集成" },
    subtitle: { en: "Hardware-software integration for smart devices, sensors, and connected systems that scale with your product.", zh: "软硬件一体化集成，打造智能设备、传感网络与互联系统，随业务同步扩展。" },
    cta: { en: "Consult Now", zh: "立即咨询" },
    gradient: "from-[#013a8f] via-[#062c66] to-[#1a1a2e]",
    image: "/hero/iot-hardware-integration.jpg",
  },
  {
    title: { en: "Enterprise Management Systems", zh: "企业管理系统开发" },
    subtitle: { en: "Enterprise-grade digital transformation platforms — ERP, CRM, OA — AI-powered and tailored to how your teams actually work.", zh: "企业级数字化转型系统 ——ERP、CRM、OA，AI 驱动，贴合团队真实工作流程定制开发。" },
    cta: { en: "Consult Now", zh: "立即咨询" },
    gradient: "from-[#082047] via-[#0146ad] to-[#00489e]",
    image: "/hero/management-systems.jpg",
  },
];

export const caseCategories: Bi[] = [
  { en: "All", zh: "全部" },
  { en: "Custom UI Mall", zh: "高定UI商城" },
  { en: "AI Big Data", zh: "AI大数据" },
  { en: "Smart IoT", zh: "智慧物联网" },
  { en: "Local Services", zh: "本地服务" },
  { en: "Social Networking", zh: "社交交友" },
  { en: "Education", zh: "教育培训" },
  { en: "Data Visualization", zh: "可视化大屏" },
  { en: "Messaging", zh: "即时通讯" },
  { en: "Online Gaming", zh: "线上电玩城" },
];

export const caseItems: { title: Bi; tag: Bi; image: string }[] = [
  { title: { en: "SummitPeak APP", zh: "峰山林APP" }, tag: caseCategories[3], image: "/cases/summitpeak-app.jpg" },
  { title: { en: "WaveTone APP", zh: "声纵原创音乐APP" }, tag: caseCategories[5], image: "/cases/wavetone-app.jpg" },
  { title: { en: "AuroraLearn APP", zh: "曜光智教APP" }, tag: caseCategories[6], image: "/cases/auroralearn-app.jpg" },
  { title: { en: "FleetView APP", zh: "驭途物流APP" }, tag: caseCategories[7], image: "/cases/fleetview-app.jpg" },
  { title: { en: "ZenoPOS APP", zh: "云芒零售收银APP" }, tag: caseCategories[1], image: "/cases/zenopos-app.jpg" },
  { title: { en: "HomeHub APP", zh: "家芯智联APP" }, tag: caseCategories[3], image: "/cases/homehub-app.jpg" },
  { title: { en: "MedConnect APP", zh: "医联问诊APP" }, tag: caseCategories[4], image: "/cases/medconnect-app.jpg" },
  { title: { en: "PulseTalk APP", zh: "脉讯社交APP" }, tag: caseCategories[8], image: "/cases/pulsetalk-app.jpg" },
  { title: { en: "ArcadeHub APP", zh: "潮玩电玩APP" }, tag: caseCategories[9], image: "/cases/arcadehub-app.jpg" },
];

export const solutions: { title: Bi; desc: Bi; stat: Bi; image: string }[] = [
  {
    title: { en: "App Development", zh: "APP定制开发" },
    desc: {
      en: "Cross-industry custom development backed by multiple shipped cases, from concept to app-store launch.",
      zh: "跨行业定制化开发，多个落地案例保驾护航，从需求到上线全程护航。",
    },
    stat: { en: "500+ Engineers", zh: "500+ 技术团队" },
    image: "/solutions/app-development.jpg",
  },
  {
    title: { en: "IoT Development", zh: "物联网开发" },
    desc: {
      en: "Hardware-software integration for smart devices, sensors, and connected systems that scale with your product.",
      zh: "软硬件一体化集成，打造智能设备、传感网络与互联系统，随业务同步扩展。",
    },
    stat: { en: "20+ IP Patents", zh: "20+ 项专利" },
    image: "/solutions/iot-development.jpg",
  },
  {
    title: { en: "Management Systems", zh: "管理系统开发" },
    desc: {
      en: "Enterprise-grade digital transformation platforms — ERP, CRM, OA — AI-powered and tailored to how your teams actually work.",
      zh: "企业级数字化转型系统 ——ERP、CRM、OA，AI 驱动，贴合团队真实工作流程定制开发。",
    },
    stat: { en: "5000+ Deployments", zh: "5000+ 部署案例" },
    image: "/solutions/management-systems.jpg",
  },
];

export const footerContact = {
  phone: "+65 9123 7341",
  email: "jojosam@fynixtech.sg",
  address: { en: "57 UBI AVENUE 1 #04-009 Singapore 408936", zh: "57 UBI AVENUE 1 #04-009 Singapore 408936" },
};
