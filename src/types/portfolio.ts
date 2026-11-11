export interface PortfolioConfig {
  accentColor: string;
  flagColor: string;
  showTurkistanFlag: boolean;
  flagStyle: 'waving' | 'flat' | 'badge' | 'emblem';
  isOverdrive: boolean;
  cursorCount: number;
  speedMultiplier: number;
  autoScrollToSec2: boolean;
  heroOutline: string;
  greeting: string;
  name: string;
  role: string;
  bio: string;
  btn1: string;
  btn2: string;
  portraitUrl: string;
  portraitCaption: string;
  stat1Val: string;
  stat1Lbl: string;
  stat2Val: string;
  stat2Lbl: string;
  stat3Val: string;
  stat3Lbl: string;
  log1Title: string;
  log1Desc: string;
  log2Title: string;
  log2Desc: string;
  log3Title: string;
  log3Desc: string;
  sec2Heading: string;
  phil1Title: string;
  phil1Desc: string;
  phil2Title: string;
  phil2Desc: string;
  phil3Title: string;
  phil3Desc: string;
}

export const DEFAULT_PORTFOLIO_CONFIG: PortfolioConfig = {
  accentColor: '#0099ff', // Sky blue / Azure matching Turkistan Kökbayraq
  flagColor: '#0099ff',
  showTurkistanFlag: true,
  flagStyle: 'waving',
  isOverdrive: true,
  cursorCount: 6,
  speedMultiplier: 0.85,
  autoScrollToSec2: false,
  heroOutline: 'تور بەت ياساش',
  greeting: 'سالام كۆپچىلىك',
  name: 'مەن قارلۇق ئۇيغۇر',
  role: 'بۇ بىر تور بەت ياساش قۇرالى',
  bio: 'مەن يۇقىرى تېخنىكىلاردىن پايدىلىنىپ بۇ ئۆزلۈكىدىن قۇرۇلىدىغان تور بەتنى ياساپ چىقتىم، سىلەرمۇ كۆرۈپ بېقىڭلار.',
  btn1: 'دەرھال ئاتلىنىش',
  btn2: 'كۆرۈپ بېقىڭ',
  portraitUrl: '',
  portraitCaption: '// SOVEREIGN SILICON AUTHOR • QARLUQ UYGHUR',
  stat1Val: '470K+',
  stat1Lbl: 'Lines of Code',
  stat2Val: '7-Layer',
  stat2Lbl: 'Memory Stack',
  stat3Val: '100%',
  stat3Lbl: 'First Principles',
  log1Title: 'مائۇسلارنىڭ رەڭگى',
  log1Desc: 'Multi-Agent Swarm Coordination & Cognitive Execution Pipelines.',
  log2Title: 'گىرافىكلار',
  log2Desc: 'Dynamic Neural Routing & Zero-Latency Context Synthesis.',
  log3Title: 'چىقىرىش كۆزنىكى',
  log3Desc: 'Deterministic Rust/C++ Execution Engines & Real-Time Telemetry.',
  sec2Heading: 'يۇقىرى تەرەققىيات ۋە زامانىۋىي كۆرۈنمە يۈز',
  phil1Title: 'ئاپتوماتلاش',
  phil1Desc: 'Every abstraction layer introduces latency and cognitive drift. We build custom memory allocators, agent orchestrators, and neural routers directly from bare metal up.',
  phil2Title: 'Agent نىڭ ئالاھىدە رولى',
  phil2Desc: 'Instead of monolithic prompts, specialized micro-agents collaborate in parallel—planning, verifying, and self-healing codebases 24 hours a day.',
  phil3Title: 'زامانىۋىي سۈنئىي ئەقىل',
  phil3Desc: 'High-frequency telemetry and deterministic state machines ensure sub-millisecond decision loops across distributed cloud and local silicon clusters.'
};

export interface AgentInfo {
  id: number;
  name: string;
  color: string;
}

export const AGENT_PALETTE: { name: string; color: string }[] = [
  { name: 'UI-ARCHITECT', color: '#0099ff' },
  { name: 'SYS-KERNEL', color: '#3b82f6' },
  { name: 'TYPE-ENGINE', color: '#10b981' },
  { name: 'SHADER-OP', color: '#f59e0b' },
  { name: 'GRID-SYNTH', color: '#a855f7' },
  { name: 'DATA-NODE', color: '#06b6d4' },
  { name: 'MEM-GRAPH', color: '#ec4899' },
  { name: 'CORE-RENDER', color: '#84cc16' }
];
