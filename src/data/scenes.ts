import { SceneStep } from '@/types';

export const SCENES: SceneStep[] = [
  {
    id: 1,
    triggerProgress: 0.0,
    title: "THE BEGINNING",
    subtitle: "One Platform. Every Home Service.",
    category: "Genesis",
    description: "In an interconnected world, your home is your sanctuary. Discover a revolutionary ecosystem designed for effortless living.",
    cameraPos: [0, 0, 18],
    cameraTarget: [0, 0, 0],
    mode: 'logo'
  },
  {
    id: 2,
    triggerProgress: 0.05,
    title: "FUTURISTIC CITY",
    subtitle: "Serving Homes Across Every City",
    category: "Coverage",
    description: "An interconnected grid of millions of homes, smart villas, and commercial spaces powered by high-speed verified service routing.",
    cameraPos: [0, 32, 48],
    cameraTarget: [0, 2, 0],
    mode: 'city'
  },
  {
    id: 3,
    triggerProgress: 0.10,
    title: "HOUSE SELECTION",
    subtitle: "Every Home Needs Care",
    category: "Architecture",
    description: "Modern architectural luxury meets intelligent care. High-performance residences require meticulous, precision maintenance.",
    cameraPos: [14, 12, 16],
    cameraTarget: [0, 3, 0],
    mode: 'villa'
  },
  {
    id: 4,
    triggerProgress: 0.15,
    title: "FRONT GATE",
    subtitle: "Problems Can Happen Anytime",
    category: "Smart Access",
    description: "Sensory gates unlock. Even in the most sophisticated smart properties, mechanical, electrical, and plumbing anomalies emerge without notice.",
    cameraPos: [0, 3, 9],
    cameraTarget: [0, 2, 0],
    mode: 'gate'
  },
  {
    id: 5,
    triggerProgress: 0.20,
    title: "LUXURY BATHROOM",
    subtitle: "Shower & Basin Precision Care",
    category: "Hydro-Dynamics",
    description: "Architectural overview of the second-floor master bath featuring sculpted oval stone vessel basin, chrome pop-up drain, floating backlit vanity, and frameless glass rain shower.",
    cameraPos: [2.4, 5.2, 3.0],
    cameraTarget: [2.4, 4.8, -1.5],
    mode: 'bathroom'
  },
  {
    id: 6,
    triggerProgress: 0.25,
    title: "MASTER BEDROOM",
    subtitle: "Smart Climate, Ambient Lighting & Electrical Grid",
    category: "Comfort & Wiring",
    description: "Centered on the second-floor king platform bed with fluted oak slat feature wall, suspended brass globe pendant lights, bedside smart USB power plates, and integrated architectural electrical conduits.",
    cameraPos: [-2.9, 5.2, 3.0],
    cameraTarget: [-2.9, 4.8, -1.5],
    mode: 'bedroom'
  },
  {
    id: 7,
    triggerProgress: 0.30,
    title: "GOURMET KITCHEN",
    subtitle: "Plumbing & Appliance Diagnostics",
    category: "Plumbing",
    description: "Panoramic view of the ground-floor culinary suite showcasing the Calacatta marble waterfall island, minimalist barstools, triple cone pendant lighting, and European built-in appliances.",
    cameraPos: [3.0, 2.2, 5.2],
    cameraTarget: [3.0, 1.3, -0.5],
    mode: 'kitchen'
  },
  {
    id: 8,
    triggerProgress: 0.35,
    title: "LIVING ROOM",
    subtitle: "AC Not Cooling? Need Fast Repairs?",
    category: "Climate",
    description: "Full ground-floor living suite with modular linen sectional, low-profile coffee table, fluted oak media wall, 75-inch OLED display, and smart climate control.",
    cameraPos: [-3.0, 2.2, 5.2],
    cameraTarget: [-3.0, 1.3, -0.5],
    mode: 'living'
  },
  {
    id: 9,
    triggerProgress: 0.40,
    title: "AC CLOSEUP",
    subtitle: "Certified AC Professionals Available Nearby",
    category: "Diagnostics",
    description: "Component-level diagnostics reveal capacitor degradation. 14 background-checked master HVAC engineers are within a 3-mile radius.",
    cameraPos: [1.2, 8.7, 0.5],
    cameraTarget: [1.2, 8.4, -1.0],
    mode: 'ac_zoom'
  },
  {
    id: 10,
    triggerProgress: 0.45,
    title: "X-RAY HOUSE",
    subtitle: "HomeEase Covers Everything",
    category: "Infrastructure",
    description: "Villa envelope dissolves into translucent glass. Unveil all concealed veins: electrical wiring conduits, copper plumbing, and HVAC ventilation.",
    cameraPos: [11, 10, 15],
    cameraTarget: [0, 4, 0],
    mode: 'xray'
  },
  {
    id: 11,
    triggerProgress: 0.50,
    title: "AI HOUSE SCAN",
    subtitle: "AI Powered Home Analysis",
    category: "AI Intelligence",
    description: "High-frequency holographic laser grid calculates full home structural and appliance integrity. Real-time Home Health Score: 78/100.",
    cameraPos: [0, 9, 14],
    cameraTarget: [0, 3.5, 0],
    mode: 'scan'
  },
  {
    id: 12,
    triggerProgress: 0.55,
    title: "SERVICES EXPLOSION",
    subtitle: "60+ Services. One Platform.",
    category: "Ecosystem",
    description: "Plumbing, Electrical, Painting, Cleaning, Carpentry, Renovation, Pest Control, Smart Home, Security, Solar, Landscaping, and Emergency.",
    cameraPos: [0, 8, 16],
    cameraTarget: [0, 3, 0],
    mode: 'services'
  },
  {
    id: 13,
    triggerProgress: 0.60,
    title: "PROVIDER NETWORK",
    subtitle: "Verified Professionals Near You",
    category: "Trust & Safety",
    description: "100% background-checked, insured, certified, and equipped with industrial-grade tooling. Every provider carries a 5-star standard badge.",
    cameraPos: [8, 7, 13],
    cameraTarget: [0, 3, 0],
    mode: 'network'
  },
  {
    id: 14,
    triggerProgress: 0.65,
    title: "SMART MATCHING",
    subtitle: "AI Finds The Best Professional For You",
    category: "Algorithmic Dispatch",
    description: "Neural matching engine factors proximity, equipment inventory, customer satisfaction ratings, and immediate road traffic in real time.",
    cameraPos: [0, 11, 13],
    cameraTarget: [0, 3, 0],
    mode: 'matching'
  },
  {
    id: 15,
    triggerProgress: 0.70,
    title: "PRICING ENGINE",
    subtitle: "No Hidden Charges",
    category: "Transparency",
    description: "Upfront deterministic price algorithm: Base Rate + Distance Cost + Job Complexity + Urgency Multiplier + Applicable Taxes = Guaranteed Fixed Quote.",
    cameraPos: [6, 8, 11],
    cameraTarget: [0, 3, 0],
    mode: 'pricing'
  },
  {
    id: 16,
    triggerProgress: 0.72,
    title: "BOOKING FLOW",
    subtitle: "Book In Seconds",
    category: "Frictionless UX",
    description: "One-tap instant confirmation. Dispatch pulse radiates across the metropolitan mesh network; provider confirms arrival slot in under 8 seconds.",
    cameraPos: [0, 7, 12],
    cameraTarget: [0, 3, 0],
    mode: 'booking'
  },
  {
    id: 17,
    triggerProgress: 0.75,
    title: "LIVE TRACKING",
    subtitle: "Track Professionals In Real Time",
    category: "Live Telemetry",
    description: "Follow your assigned specialist with live GPS telemetry, dynamic turn-by-turn route updates, and millisecond-accurate ETA predictions.",
    cameraPos: [4, 9, 14],
    cameraTarget: [0, 2, 0],
    mode: 'tracking'
  },
  {
    id: 18,
    triggerProgress: 0.80,
    title: "SERVICE COMPLETION",
    subtitle: "Problem Solved",
    category: "Resolution",
    description: "Specialist arrives on time. Precision components installed and thoroughly tested. Warning indicators flip to pristine emerald green.",
    cameraPos: [0, 6, 11],
    cameraTarget: [0, 3, 0],
    mode: 'complete'
  },
  {
    id: 19,
    triggerProgress: 0.82,
    title: "BEFORE & AFTER",
    subtitle: "Professional Results",
    category: "Craftsmanship",
    description: "Inspect the immaculate transformation. From leaking valves and tripping breakers to pristine, whisper-quiet luxury performance.",
    cameraPos: [7, 7, 10],
    cameraTarget: [0, 3, 0],
    mode: 'before_after'
  },
  {
    id: 20,
    triggerProgress: 0.85,
    title: "CUSTOMER REVIEWS",
    subtitle: "Trusted By Thousands",
    category: "Social Proof",
    description: "4.96/5.0 average customer satisfaction score across 140,000+ completed appointments. Read verified homeowner testimonials.",
    cameraPos: [-6, 8, 12],
    cameraTarget: [0, 3, 0],
    mode: 'reviews'
  },
  {
    id: 21,
    triggerProgress: 0.88,
    title: "MOBILE APP",
    subtitle: "Everything In Your Pocket",
    category: "Mobile First",
    description: "The complete power of HomeEase engineered for iOS and Android. Bookings, live camera video consultations, in-app chat, and biometric payments.",
    cameraPos: [0, 6, 10],
    cameraTarget: [0, 3, 0],
    mode: 'mobile'
  },
  {
    id: 22,
    triggerProgress: 0.90,
    title: "DASHBOARD SHOWCASE",
    subtitle: "Built For Scale",
    category: "Enterprise Grade",
    description: "Integrated command consoles tailored for Homeowners, Service Providers, and City Administrators with unified real-time analytics.",
    cameraPos: [0, 9, 13],
    cameraTarget: [0, 3.5, 0],
    mode: 'dashboards'
  },
  {
    id: 23,
    triggerProgress: 0.93,
    title: "PREMIUM MEMBERSHIP",
    subtitle: "HomeEase Premium",
    category: "VIP Tier",
    description: "Gold tier residence protection: zero dispatch fees, 15-minute emergency response priority, annual preventative tune-ups, and 3-year warranty.",
    cameraPos: [10, 8, 12],
    cameraTarget: [0, 3, 0],
    mode: 'gold'
  },
  {
    id: 24,
    triggerProgress: 0.96,
    title: "SMART CITY FUTURE",
    subtitle: "The Future Of Home Services",
    category: "Next Generation",
    description: "Predictive IoT sensors diagnose equipment wear before failure occurs, dispatching maintenance automatically before your morning coffee.",
    cameraPos: [0, 24, 34],
    cameraTarget: [0, 2, 0],
    mode: 'smart_city'
  },
  {
    id: 25,
    triggerProgress: 1.0,
    title: "HOMEEASE",
    subtitle: "One Platform. Every Home Service.",
    category: "Get Started",
    description: "Experience the pinnacle of home care. Schedule your first appointment in seconds or join our elite network of verified professionals.",
    cameraPos: [0, 16, 26],
    cameraTarget: [0, 3, 0],
    mode: 'final'
  }
];
