// Template library for different industries
const templates = {
  plumber: `# Professional Plumbing Services in [CITY]

When you need reliable plumbing services in [CITY], choosing the right professional can make all the difference. Local homeowners and businesses trust experienced plumbers who understand the unique challenges of the [CITY] area.

## Why Choose Local Plumbing Services

Our team serves the [CITY] community with pride, offering 24/7 emergency services and scheduled maintenance. From fixing leaky faucets to complete pipe replacements, we handle every job with professionalism and care.

## Services We Offer in [CITY]

- Emergency plumbing repairs
- Drain cleaning and maintenance
- Water heater installation and repair
- Pipe repair and replacement
- Bathroom and kitchen plumbing
- Commercial plumbing services

Contact us today for a free estimate on your [CITY] plumbing needs.`,

  roofer: `# Expert Roofing Services in [CITY]

Your roof protects your most valuable investment. Homeowners in [CITY] deserve quality roofing services from professionals who understand local weather conditions and building codes.

## Trusted Roofing Contractors Serving [CITY]

With years of experience serving the [CITY] area, our team provides comprehensive roofing solutions for residential and commercial properties. We use only the highest quality materials and proven installation techniques.

## Complete Roofing Services

- Roof inspections and maintenance
- Shingle and tile replacement
- Emergency roof repairs
- Complete roof installations
- Gutter installation and cleaning
- Storm damage restoration

Get your free roofing inspection in [CITY] today.`,

  carwash: `# Premium Car Wash Services in [CITY]

Keep your vehicle looking its best with professional car wash services in [CITY]. Our state-of-the-art facility and experienced team deliver exceptional results every time.

## The Best Car Wash Experience in [CITY]

Drivers throughout [CITY] choose us for our attention to detail and commitment to quality. We offer everything from quick express washes to premium detailing services.

## Our Services

- Express exterior wash
- Full-service interior and exterior
- Premium hand wax treatments
- Professional detailing
- Paint protection services
- Monthly membership plans

Visit our [CITY] location today and see the difference professional care makes.`,

  dentist: `# Family Dentistry in [CITY]

Your family deserves a dental practice that provides comprehensive care in a comfortable environment. Our [CITY] dental office welcomes patients of all ages.

## Comprehensive Dental Care for [CITY] Families

We combine modern technology with personalized care to ensure the best outcomes for our [CITY] patients. From routine cleanings to advanced procedures, we're here for your family's dental health.

## Our Dental Services

- Preventive care and cleanings
- Cosmetic dentistry
- Teeth whitening
- Dental implants
- Root canal therapy
- Emergency dental care

Schedule your appointment at our [CITY] office today.`,

  trainer: `# Personal Training in [CITY]

Transform your fitness journey with professional personal training in [CITY]. Our certified trainers create customized workout programs designed for your specific goals.

## Achieve Your Fitness Goals in [CITY]

Whether you're looking to lose weight, build muscle, or improve overall health, our [CITY] personal trainers provide the expertise and motivation you need to succeed.

## Training Services

- One-on-one personal training
- Small group fitness classes
- Nutrition coaching and meal planning
- Sport-specific training
- Weight loss programs
- Strength and conditioning

Start your fitness transformation with [CITY]'s premier personal training service.`,

  electrician: `# Licensed Electricians Serving [CITY]

Electrical work requires expertise, precision, and safety. [CITY] residents and businesses trust our licensed electricians for all their electrical needs.

## Professional Electrical Services in [CITY]

Our team of certified electricians brings years of experience to every job in [CITY]. We handle projects of all sizes with the same attention to safety and quality.

## Electrical Services We Provide

- Electrical repairs and troubleshooting
- Panel upgrades and replacements
- Lighting installation
- Outlet and switch installation
- Ceiling fan installation
- Emergency electrical services

Call our [CITY] electricians for prompt, professional service.`,

  locksmith: `# 24/7 Locksmith Services in [CITY]

Locked out? Need new locks? Our professional locksmiths serve [CITY] with fast, reliable service day or night.

## Your Trusted [CITY] Locksmith

We provide comprehensive locksmith services throughout [CITY] with mobile technicians ready to help. Whether it's an emergency lockout or scheduled security upgrades, we're here.

## Locksmith Services Available

- Emergency lockout service
- Lock rekeying and replacement
- Key duplication
- High-security lock installation
- Automotive locksmith services
- Commercial security systems

Available 24/7 throughout [CITY] - call now for immediate assistance.`,

  hvac: `# HVAC Services in [CITY]

Maintain home comfort year-round with professional HVAC services in [CITY]. Our technicians keep your heating and cooling systems running efficiently.

## Heating & Cooling Experts for [CITY]

[CITY] residents trust us for reliable HVAC installation, repair, and maintenance. We work on all makes and models, ensuring your home stays comfortable in every season.

## HVAC Services Offered

- AC repair and installation
- Furnace repair and replacement
- Preventive maintenance plans
- Duct cleaning and sealing
- Thermostat installation
- Emergency HVAC service

Contact your local [CITY] HVAC specialists for a free estimate.`,

  realestate: `# Real Estate Services in [CITY]

Looking to buy or sell property in [CITY]? Our experienced real estate agents provide expert guidance throughout the entire process.

## Your [CITY] Real Estate Experts

With in-depth knowledge of the [CITY] market, we help clients find their dream homes and achieve top dollar when selling. Our personalized approach ensures your real estate goals become reality.

## Real Estate Services

- Residential home sales
- Property listings and marketing
- Buyer representation
- Market analysis and pricing
- Negotiation expertise
- Investment property guidance

Let's discuss your [CITY] real estate needs today.`,

  autorepair: `# Auto Repair Services in [CITY]

Keep your vehicle running smoothly with trusted auto repair services in [CITY]. Our certified mechanics provide honest, quality service you can depend on.

## Reliable Auto Repair in [CITY]

[CITY] drivers choose us for transparent pricing, expert diagnostics, and quality repairs. We service all makes and models with genuine parts and skilled workmanship.

## Complete Auto Services

- Engine diagnostics and repair
- Brake service and replacement
- Oil changes and maintenance
- Transmission repair
- Electrical system service
- State inspections

Schedule your service appointment at our [CITY] location today.`,

  lawyer: `# Experienced Legal Representation in [CITY]

When you need skilled legal counsel in [CITY], trust our experienced attorneys to protect your rights and advocate for your interests.

## Dedicated Legal Services for [CITY] Residents

Our law firm serves individuals and businesses throughout [CITY] with personalized attention and aggressive representation. We understand local courts and legal procedures.

## Practice Areas

- Personal injury law
- Family law and divorce
- Criminal defense
- Estate planning and probate
- Business law
- Real estate transactions

Contact our [CITY] law office for a confidential consultation.`,

  chiropractor: `# Chiropractic Care in [CITY]

Find relief from pain and improve your overall wellness with professional chiropractic services in [CITY]. Our experienced chiropractors provide natural, effective treatment.

## Your [CITY] Wellness Partner

We help [CITY] patients achieve optimal health through comprehensive chiropractic care, spinal adjustments, and personalized treatment plans tailored to your needs.

## Chiropractic Services

- Spinal adjustments and manipulation
- Sports injury treatment
- Auto accident injury care
- Massage therapy
- Rehabilitation exercises
- Nutritional counseling

Schedule your adjustment at our [CITY] chiropractic clinic today.`,

  veterinarian: `# Veterinary Care in [CITY]

Your pets deserve the best medical care. Our [CITY] veterinary clinic provides compassionate, comprehensive services for dogs, cats, and exotic pets.

## Trusted Veterinarians Serving [CITY] Pets

With state-of-the-art facilities and experienced veterinarians, we offer everything from routine wellness exams to advanced surgical procedures for [CITY] area pets.

## Veterinary Services

- Wellness exams and vaccinations
- Surgery and dental care
- Emergency and critical care
- Pet boarding and grooming
- Diagnostic imaging
- Prescription medications

Bring your pet to [CITY]'s most trusted veterinary clinic.`,

  landscaping: `# Professional Landscaping in [CITY]

Transform your outdoor space with expert landscaping services in [CITY]. Our team creates beautiful, sustainable landscapes that enhance your property value.

## [CITY]'s Premier Landscaping Company

From design to installation and maintenance, we provide complete landscaping solutions for [CITY] homeowners and businesses who demand excellence.

## Landscaping Services

- Landscape design and installation
- Lawn care and maintenance
- Tree and shrub planting
- Hardscaping and patios
- Irrigation systems
- Seasonal cleanup

Get your free landscaping estimate for your [CITY] property.`,

  cleaning: `# Professional Cleaning Services in [CITY]

Enjoy a spotless home or office with reliable cleaning services in [CITY]. Our trained professionals deliver thorough, consistent cleaning you can trust.

## Trusted Cleaning Company in [CITY]

[CITY] residents and businesses choose us for our attention to detail, eco-friendly products, and flexible scheduling. We treat every space with the care it deserves.

## Cleaning Services Available

- Residential house cleaning
- Commercial office cleaning
- Deep cleaning services
- Move-in/move-out cleaning
- Post-construction cleanup
- Recurring maintenance plans

Book your [CITY] cleaning service today and relax.`,

  pestcontrol: `# Pest Control Services in [CITY]

Protect your home or business from unwanted pests with professional pest control in [CITY]. Our licensed technicians provide safe, effective solutions.

## Effective Pest Management for [CITY]

We eliminate and prevent pest problems throughout [CITY] using environmentally responsible methods and proven treatments that keep your property pest-free.

## Pest Control Solutions

- Termite inspection and treatment
- Rodent control and exclusion
- Bed bug elimination
- Ant and roach treatment
- Wildlife removal
- Preventive maintenance plans

Call [CITY]'s trusted pest control experts today.`,

  moving: `# Moving Services in [CITY]

Make your move stress-free with professional moving services in [CITY]. Our experienced movers handle your belongings with care and precision.

## Reliable Movers Serving [CITY]

Whether you're moving across town or across the country, [CITY] residents trust us for efficient, affordable moving services with zero hidden fees.

## Moving Services Offered

- Local and long-distance moves
- Packing and unpacking services
- Loading and unloading
- Furniture assembly
- Storage solutions
- Commercial relocations

Get your free moving quote for [CITY] today.`,

  photographer: `# Wedding Photography in [CITY]

Preserve your special day with stunning wedding photography in [CITY]. Our experienced photographers capture every precious moment with artistic excellence.

## [CITY]'s Premier Wedding Photographers

We document [CITY] weddings with a perfect blend of traditional and contemporary styles, delivering timeless images you'll treasure forever.

## Photography Services

- Full-day wedding coverage
- Engagement photo sessions
- Bridal portraits
- Digital image delivery
- Custom albums and prints
- Videography packages

Book your [CITY] wedding photography consultation today.`,

  salon: `# Hair Salon & Spa in [CITY]

Look and feel your best with professional salon services in [CITY]. Our talented stylists and estheticians provide personalized beauty treatments in a relaxing atmosphere.

## [CITY]'s Favorite Salon & Spa

From haircuts and color to facials and massage, we offer comprehensive beauty services that help [CITY] clients look and feel amazing.

## Salon Services

- Haircuts and styling
- Hair coloring and highlights
- Keratin treatments
- Facials and skincare
- Manicures and pedicures
- Massage therapy

Schedule your appointment at our [CITY] salon today.`,

  restaurant: `# Best Dining Experience in [CITY]

Discover exceptional cuisine at [CITY]'s favorite restaurant. Our talented chefs prepare fresh, flavorful dishes using locally sourced ingredients.

## Fine Dining in [CITY]

Whether it's a romantic dinner, family celebration, or business lunch, [CITY] diners choose us for outstanding food, excellent service, and inviting ambiance.

## What We Offer

- Farm-to-table cuisine
- Extensive wine selection
- Private dining rooms
- Catering services
- Daily chef specials
- Weekend brunch

Make your reservation at [CITY]'s premier restaurant.`,

  gym: `# Fitness Center in [CITY]

Achieve your fitness goals at [CITY]'s premier gym and fitness center. Our modern facility and expert trainers provide everything you need to succeed.

## Your [CITY] Fitness Destination

Join [CITY]'s most welcoming gym community with state-of-the-art equipment, diverse class offerings, and supportive trainers who help you reach your potential.

## Fitness Amenities

- Cardio and strength equipment
- Group fitness classes
- Personal training
- Locker rooms and showers
- Childcare services
- 24/7 access options

Start your fitness journey at our [CITY] gym today.`,

  daycare: `# Childcare Services in [CITY]

Give your child the best start with quality daycare in [CITY]. Our nurturing environment and educational programs support your child's development.

## Trusted Daycare Serving [CITY] Families

[CITY] parents trust us for safe, engaging childcare with experienced teachers, age-appropriate curriculum, and a loving atmosphere where children thrive.

## Childcare Programs

- Infant care (6 weeks+)
- Toddler programs
- Preschool education
- Before and after school care
- Summer camp programs
- Healthy meals included

Enroll your child in [CITY]'s top-rated daycare center.`,

  poolservice: `# Pool Service & Repair in [CITY]

Keep your pool sparkling clean with professional pool service in [CITY]. Our experienced technicians provide reliable maintenance and expert repairs.

## Complete Pool Care for [CITY]

[CITY] pool owners trust us for weekly cleaning, chemical balancing, equipment repair, and everything needed to maintain a beautiful, safe swimming pool.

## Pool Services

- Weekly cleaning and maintenance
- Chemical testing and balancing
- Pool equipment repair
- Pump and filter service
- Pool opening and closing
- Renovation and resurfacing

Schedule your [CITY] pool service today.`,

  inspector: `# Home Inspection Services in [CITY]

Make informed real estate decisions with professional home inspections in [CITY]. Our certified inspectors provide thorough, unbiased assessments.

## Trusted Home Inspectors in [CITY]

[CITY] home buyers and sellers rely on our detailed inspections, comprehensive reports, and expert guidance to understand property condition and potential issues.

## Inspection Services

- Pre-purchase home inspections
- Pre-listing inspections
- New construction inspections
- Radon and mold testing
- Termite inspections
- Commercial building inspections

Book your [CITY] home inspection today.`,

  insurance: `# Insurance Agency in [CITY]

Protect what matters most with comprehensive insurance solutions in [CITY]. Our independent agents find the best coverage at competitive rates.

## Your [CITY] Insurance Experts

We serve [CITY] individuals, families, and businesses with personalized insurance guidance and access to multiple carriers for optimal coverage and savings.

## Insurance Products

- Auto insurance
- Homeowners insurance
- Life insurance
- Business insurance
- Health insurance
- Umbrella policies

Get your free insurance quote from our [CITY] agency.`,

  accountant: `# Accounting Services in [CITY]

Simplify your finances with professional accounting services in [CITY]. Our experienced CPAs provide tax preparation, bookkeeping, and financial consulting.

## Trusted Accountants Serving [CITY]

[CITY] individuals and businesses rely on our expertise for accurate tax filings, strategic planning, and year-round financial guidance that maximizes your bottom line.

## Accounting Services

- Tax preparation and planning
- Bookkeeping and payroll
- Business consulting
- Audit representation
- Financial statements
- QuickBooks setup

Contact our [CITY] accounting firm today.`,

  tutoring: `# Tutoring Services in [CITY]

Help your child succeed with professional tutoring in [CITY]. Our qualified tutors provide personalized instruction that builds confidence and improves grades.

## Academic Excellence in [CITY]

[CITY] students achieve their full potential with our one-on-one tutoring, test prep programs, and homework support in all subjects and grade levels.

## Tutoring Programs

- Math and science tutoring
- Reading and writing support
- Test prep (SAT, ACT)
- Homework help
- Study skills coaching
- All grades K-12

Schedule your [CITY] tutoring session today.`,

  florist: `# Florist & Flower Delivery in [CITY]

Brighten any occasion with beautiful flowers from [CITY]'s premier florist. We create stunning arrangements for every celebration and heartfelt moment.

## Fresh Flowers Delivered in [CITY]

[CITY] residents trust us for creative floral designs, fresh blooms, and reliable same-day delivery for birthdays, anniversaries, weddings, and sympathy.

## Floral Services

- Custom floral arrangements
- Wedding and event flowers
- Sympathy and funeral flowers
- Same-day delivery
- Corporate accounts
- Subscription services

Order fresh flowers in [CITY] today.`,

  massage: `# Massage Therapy in [CITY]

Find relief and relaxation with professional massage therapy in [CITY]. Our licensed massage therapists provide therapeutic treatments in a peaceful setting.

## Therapeutic Massage in [CITY]

[CITY] clients choose us for expert massage therapy that reduces stress, relieves pain, and promotes overall wellness through various specialized techniques.

## Massage Services

- Swedish massage
- Deep tissue massage
- Sports massage
- Hot stone therapy
- Prenatal massage
- Couples massage

Book your massage appointment in [CITY] today.`,

  attorney: `# Criminal Defense Attorney in [CITY]

Facing criminal charges? Protect your rights with an experienced criminal defense attorney in [CITY]. We provide aggressive representation and strategic defense.

## Experienced Criminal Defense in [CITY]

Our [CITY] criminal defense attorneys have successfully defended clients against all types of charges with thorough investigation, skilled negotiation, and courtroom excellence.

## Criminal Defense Practice

- DUI/DWI defense
- Drug charges
- Assault and battery
- Theft and property crimes
- Domestic violence
- Expungement services

Contact our [CITY] criminal defense lawyer immediately.`
};

const LENGTH_TARGETS = { short: 600, medium: 900, long: 1200 };
const CUSTOM_TEMPLATES_KEY = "customTemplates";
const HISTORY_KEY = "blog_builder_history";
const STATUS_COLORS = {
  info: "var(--tool-muted)",
  success: "#34d399",
  error: "#f87171",
  warning: "#facc15"
};

const BlogBuilderKeys = (() => {
  const KEY = "tctc_api_keys";

  const read = () => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch (err) {
      console.warn("Invalid key storage payload", err);
      return {};
    }
  };

  const save = (provider, key) => {
    const data = read();
    data[provider] = key;
    data[`${provider}_updated`] = new Date().toISOString();
    localStorage.setItem(KEY, JSON.stringify(data));
  };

  const remove = (provider) => {
    const data = read();
    delete data[provider];
    delete data[`${provider}_updated`];
    localStorage.setItem(KEY, JSON.stringify(data));
  };

  const get = (provider) => read()[provider] || null;

  const validate = (key, provider) => {
    const cleaned = (key || "").trim();
    if (!cleaned) return { valid: false, error: "API key required." };
    if (cleaned.length < 15) return { valid: false, error: "API key looks too short." };
    if (provider === "gemini" && !cleaned.match(/^AI[z][a]/)) {
      return { valid: false, error: 'Gemini keys usually start with the expected prefix.' };
    }
    if (provider === "openai" && !cleaned.startsWith("sk-")) {
      return { valid: false, error: 'OpenAI keys start with "sk-".' };
    }
    if (provider === "anthropic" && !cleaned.startsWith("sk-ant-")) {
      return { valid: false, error: 'Claude keys start with "sk-ant-".' };
    }
    if (provider === "grok" && !cleaned.startsWith("xai-")) {
      return { valid: false, error: 'Grok keys start with "xai-".' };
    }
    return { valid: true, value: cleaned };
  };

  const getPreferred = () => {
    const data = read();
    return ["gemini", "openai", "anthropic", "grok"].find((provider) => Boolean(data[provider])) || null;
  };

  return { save, remove, get, validate, getPreferred };
})();

const BlogBuilderAI = (() => {
  const providers = {
    gemini: {
      name: "Google Gemini",
      defaultModel: "gemini-2.5-flash",
      endpoint: (key, model) =>
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
      headers: () => ({ "Content-Type": "application/json" }),
      buildBody: (prompt) => ({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.72, topP: 0.9, maxOutputTokens: 2048 }
      }),
      extract: (json) => json?.candidates?.[0]?.content?.parts?.[0]?.text
    },
    openai: {
      name: "OpenAI GPT",
      defaultModel: "gpt-4o-mini",
      endpoint: () => "https://api.openai.com/v1/chat/completions",
      headers: (key) => ({ "Content-Type": "application/json", Authorization: `Bearer ${key}` }),
      buildBody: (prompt, model) => ({
        model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.75,
        max_tokens: 1800
      }),
      extract: (json) => json?.choices?.[0]?.message?.content
    },
    anthropic: {
      name: "Anthropic Claude",
      defaultModel: "claude-3-5-sonnet-20241022",
      endpoint: () => "https://api.anthropic.com/v1/messages",
      headers: (key) => ({
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      }),
      buildBody: (prompt, model) => ({
        model,
        max_tokens: 2048,
        messages: [{ role: "user", content: prompt }]
      }),
      extract: (json) => json?.content?.[0]?.text
    },
    grok: {
      name: "xAI Grok",
      defaultModel: "grok-4-fast",
      endpoint: () => "https://api.x.ai/v1/chat/completions",
      headers: (key) => ({ "Content-Type": "application/json", Authorization: `Bearer ${key}` }),
      buildBody: (prompt, model) => ({
        model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
        max_tokens: 2000
      }),
      extract: (json) => json?.choices?.[0]?.message?.content
    }
  };

  const call = async ({ provider, apiKey, prompt, model }) => {
    const config = providers[provider];
    if (!config) throw new Error("Unsupported provider.");
    const targetModel = model || config.defaultModel;
    const response = await fetch(config.endpoint(apiKey, targetModel), {
      method: "POST",
      headers: config.headers(apiKey),
      body: JSON.stringify(config.buildBody(prompt, targetModel))
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error?.error?.message || `Request failed (${response.status}).`);
    }
    const data = await response.json();
    const text = config.extract(data);
    if (!text) throw new Error("No content returned from provider.");
    return text.trim();
  };

  return { call, providers };
})();

const BlogBuilderPrompts = (() => {
  const toneMap = {
    neutral: "Balanced, factual copy that reads like a trusted editorial review.",
    professional: "Authoritative tone referencing credentials, awards, and process.",
    friendly: "Welcoming, conversational tone with community references."
  };

  const lengthMap = {
    short: "Aim for roughly 600 words.",
    medium: "Aim for roughly 900 words.",
    long: "Aim for roughly 1,200+ words."
  };

  const build = ({ baseArticle, city, tone, length }) => {
    return `You are an expert SEO marketer writing localized service pages.
Customize the provided base article for ${city}. Replace any placeholders like [CITY], [SERVICE], [STATE], [COMPANY] with context that fits ${city}.

Tone guidance: ${toneMap[tone] || toneMap.neutral}
Length guidance: ${lengthMap[length] || lengthMap.medium}

Rules:
- Keep Markdown headings and structure clean.
- Mention local neighborhoods or proof points if obvious.
- Never hallucinate statistics; use qualitative statements instead.
- Do not include closing boilerplate with contact info unless the template includes it.

BASE ARTICLE TEMPLATE:
"""
${baseArticle}
"""

Write the final localized article now.`;
  };

  return { build };
})();

const BlogBuilderHistory = (() => {
  const all = () => {
    try {
      const payload = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
      return Array.isArray(payload) ? payload : [];
    } catch (err) {
      console.warn("Invalid history payload", err);
      return [];
    }
  };

  const save = (entry) => {
    const history = all();
    history.unshift(entry);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 10)));
  };

  const clear = () => localStorage.removeItem(HISTORY_KEY);

  return { all, save, clear };
})();

const JSZIP_URL = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
let jsZipPromise;

function ensureJsZip() {
  if (window.JSZip) return Promise.resolve(window.JSZip);
  if (!jsZipPromise) {
    jsZipPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = JSZIP_URL;
      script.onload = () => resolve(window.JSZip);
      script.onerror = () => reject(new Error("Failed to load JSZip"));
      document.head.appendChild(script);
    });
  }
  return jsZipPromise;
}

const state = {
  posts: [],
  lastRunId: null
};

const els = {
  provider: document.getElementById("blogProvider"),
  model: document.getElementById("blogModel"),
  apiKey: document.getElementById("blogApiKey"),
  keyStatus: document.getElementById("blogKeyStatus"),
  templateSelect: document.getElementById("templateSelect"),
  baseArticle: document.getElementById("baseArticle"),
  cities: document.getElementById("cities"),
  tone: document.getElementById("tone"),
  length: document.getElementById("length"),
  generateBtn: document.getElementById("generateBtn"),
  downloadZipBtn: document.getElementById("downloadZipBtn"),
  exportWPBtn: document.getElementById("exportWPBtn"),
  copyAllBtn: document.getElementById("copyAllBtn"),
  status: document.getElementById("status"),
  results: document.getElementById("resultsContainer"),
  history: document.getElementById("builderHistory"),
  clearHistoryBtn: document.getElementById("clearBuilderHistoryBtn")
};

const setStatus = (message, type = "info") => {
  if (!els.status) return;
  els.status.textContent = message;
  els.status.style.color = STATUS_COLORS[type] || STATUS_COLORS.info;
};

const isLocalStorageAvailable = () => {
  try {
    const testKey = "__localStorage_test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (err) {
    return false;
  }
};

const getCustomTemplates = () => {
  if (!isLocalStorageAvailable()) return {};
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_TEMPLATES_KEY) || "{}");
  } catch (err) {
    console.warn("Unable to read custom templates", err);
    return {};
  }
};

const saveCustomTemplate = (name, content) => {
  if (!isLocalStorageAvailable()) {
    alert("localStorage is disabled. Enable site data to save templates.");
    return false;
  }
  const payload = getCustomTemplates();
  payload[name] = content;
  localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(payload));
  return true;
};

const deleteCustomTemplate = (name) => {
  if (!isLocalStorageAvailable()) return false;
  const payload = getCustomTemplates();
  delete payload[name];
  localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(payload));
  return true;
};

const loadCustomTemplatesIntoDropdown = () => {
  const group = document.getElementById("customTemplatesGroup");
  if (!group) return;
  group.innerHTML = "";
  const templates = getCustomTemplates();
  const names = Object.keys(templates);
  if (!names.length) {
    group.style.display = "none";
    return;
  }
  group.style.display = "";
  names.forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    group.appendChild(option);
  });
};

const handleTemplateChange = (event) => {
  const value = event.target.value;
  const customTemplates = getCustomTemplates();
  if (value && templates[value]) {
    els.baseArticle.value = templates[value];
    setStatus("Template loaded. Customize as needed.", "warning");
  } else if (value && customTemplates[value]) {
    els.baseArticle.value = customTemplates[value];
    setStatus("Custom template loaded.", "warning");
  }
};

const handleSaveTemplate = () => {
  if (!isLocalStorageAvailable()) {
    alert("Enable cookies/storage to save templates on this device.");
    return;
  }
  const content = els.baseArticle.value.trim();
  if (!content) {
    alert("Add content before saving as a template.");
    return;
  }
  const name = prompt("Name this template:");
  if (!name) return;
  const sanitized = name.trim().replace(/[^a-zA-Z0-9\s-]/g, "");
  if (!sanitized) {
    alert("Please enter a valid template name.");
    return;
  }
  saveCustomTemplate(sanitized, content);
  loadCustomTemplatesIntoDropdown();
  setStatus(`Template "${sanitized}" saved locally.`, "success");
};

const handleManageTemplates = () => {
  const custom = getCustomTemplates();
  const names = Object.keys(custom);
  if (!names.length) {
    alert("No custom templates saved yet.");
    return;
  }
  const message =
    "Custom templates:\n\n" +
    names.map((name, index) => `${index + 1}. ${name}`).join("\n") +
    "\n\nEnter the number to delete, or Cancel to exit.";
  const response = prompt(message);
  if (!response) return;
  const index = parseInt(response, 10) - 1;
  if (index >= 0 && index < names.length) {
    const templateName = names[index];
    if (confirm(`Delete template "${templateName}"?`)) {
      deleteCustomTemplate(templateName);
      loadCustomTemplatesIntoDropdown();
      setStatus(`Template "${templateName}" deleted.`, "success");
    }
  } else {
    alert("Invalid selection.");
  }
};

const updateKeyStatus = () => {
  if (!els.keyStatus) return;
  const provider = els.provider.value;
  const key = BlogBuilderKeys.get(provider);
  if (key) {
    els.keyStatus.textContent = `${BlogBuilderAI.providers[provider].name} key detected.`;
    els.keyStatus.style.color = STATUS_COLORS.success;
  } else {
    els.keyStatus.textContent = "No API key saved for this provider.";
    els.keyStatus.style.color = STATUS_COLORS.info;
  }
};

const requireCredentials = () => {
  const provider = els.provider.value;
  const saved = BlogBuilderKeys.get(provider);
  if (saved) return { provider, key: saved };
  const validation = BlogBuilderKeys.validate(els.apiKey.value, provider);
  if (!validation.valid) {
    els.keyStatus.textContent = validation.error;
    els.keyStatus.style.color = STATUS_COLORS.error;
    return null;
  }
  return { provider, key: validation.value };
};

const handleSaveKey = () => {
  const provider = els.provider.value;
  const validation = BlogBuilderKeys.validate(els.apiKey.value, provider);
  if (!validation.valid) {
    els.keyStatus.textContent = validation.error;
    els.keyStatus.style.color = STATUS_COLORS.error;
    return;
  }
  BlogBuilderKeys.save(provider, validation.value);
  els.apiKey.value = "";
  updateKeyStatus();
};

const handleClearKey = () => {
  BlogBuilderKeys.remove(els.provider.value);
  updateKeyStatus();
};

const handleTestKey = async () => {
  const creds = requireCredentials();
  if (!creds) return;
  els.keyStatus.textContent = "Testing key…";
  els.keyStatus.style.color = STATUS_COLORS.warning;
  try {
    await BlogBuilderAI.call({
      provider: creds.provider,
      apiKey: creds.key,
      prompt: "Respond with OK to confirm connectivity."
    });
    els.keyStatus.textContent = `${BlogBuilderAI.providers[creds.provider].name} responded successfully.`;
    els.keyStatus.style.color = STATUS_COLORS.success;
  } catch (err) {
    els.keyStatus.textContent = err.message || "Key test failed.";
    els.keyStatus.style.color = STATUS_COLORS.error;
  }
};

const parseCities = (raw) =>
  raw
    .split("\n")
    .map((city) => city.trim())
    .filter(Boolean);

const renderResults = (posts) => {
  if (!els.results) return;
  els.results.innerHTML = "";
  if (!posts.length) {
    els.results.innerHTML = "<p class='builder-status'>No posts generated yet.</p>";
    return;
  }
  posts.forEach((post, index) => {
    const card = document.createElement("article");
    card.className = "result-card";
    const header = document.createElement("div");
    header.className = "result-card__header";
    const title = document.createElement("h3");
    title.className = "result-card__title";
    title.textContent = `${index + 1}. ${post.city}`;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "copy-chip";
    button.textContent = "Copy";
    button.addEventListener("click", async () => {
      await navigator.clipboard.writeText(post.content);
      button.textContent = "Copied!";
      setTimeout(() => (button.textContent = "Copy"), 2000);
    });
    header.appendChild(title);
    header.appendChild(button);
    const body = document.createElement("pre");
    body.className = "result-card__body";
    body.textContent = post.content;
    card.appendChild(header);
    card.appendChild(body);
    els.results.appendChild(card);
  });
};

const toggleExportButtons = (enabled) => {
  els.downloadZipBtn.disabled = !enabled;
  els.exportWPBtn.disabled = !enabled;
  els.copyAllBtn.disabled = !enabled;
};

const saveHistoryEntry = (payload) => {
  BlogBuilderHistory.save(payload);
  renderHistory();
};

const renderHistory = () => {
  if (!els.history) return;
  const history = BlogBuilderHistory.all();
  if (!history.length) {
    els.history.innerHTML = '<p class="history-empty">Your last 10 runs live here once you generate content.</p>';
    return;
  }
  els.history.innerHTML = "";
  history.forEach((entry) => {
    const row = document.createElement("article");
    row.className = "history-item";
    const info = document.createElement("div");
    const formattedDate = new Date(entry.createdAt).toLocaleString([], {
      dateStyle: "short",
      timeStyle: "short"
    });
    info.innerHTML = `<strong>${entry.title || "Local SEO Campaign"}</strong><br><small>${entry.cities.length} cities • ${formattedDate}</small>`;
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Load Run";
    button.addEventListener("click", () => {
      state.posts = entry.posts || [];
      renderResults(state.posts);
      toggleExportButtons(Boolean(state.posts.length));
      setStatus("Loaded previous run.", "success");
    });
    row.appendChild(info);
    row.appendChild(button);
    els.history.appendChild(row);
  });
};

const clearHistory = () => {
  if (!confirm("Clear all saved blog builder runs?")) return;
  BlogBuilderHistory.clear();
  renderHistory();
  setStatus("History cleared.", "success");
};

const handleGenerate = async () => {
  const baseArticle = els.baseArticle.value.trim();
  const cities = parseCities(els.cities.value);
  if (!baseArticle || !cities.length) {
    setStatus("Please provide both a base article and a list of cities.", "error");
    return;
  }
  const creds = requireCredentials();
  if (!creds) {
    setStatus("Save an API key before generating.", "error");
    return;
  }
  const modelOverride = (els.model.value || "").trim() || null;
  state.posts = [];
  renderResults(state.posts);
  toggleExportButtons(false);
  els.generateBtn.disabled = true;

  try {
    for (let i = 0; i < cities.length; i++) {
      const city = cities[i];
      setStatus(`Generating ${i + 1}/${cities.length}: ${city}`, "warning");
      const prompt = BlogBuilderPrompts.build({
        baseArticle,
        city,
        tone: els.tone.value,
        length: els.length.value
      });
      const content = await BlogBuilderAI.call({
        provider: creds.provider,
        apiKey: creds.key,
        prompt,
        model: modelOverride
      });
      state.posts.push({ city, content });
      renderResults(state.posts);
    }
    setStatus(`Generated ${state.posts.length} localized posts.`, "success");
    toggleExportButtons(Boolean(state.posts.length));
    saveHistoryEntry({
      id: `blog_${Date.now().toString(36)}`,
      title: baseArticle.split("\n")[0].replace(/[#*]/g, "").trim(),
      createdAt: new Date().toISOString(),
      baseArticle,
      tone: els.tone.value,
      length: els.length.value,
      cities,
      posts: state.posts,
      aiProvider: creds.provider,
      modelOverride
    });
  } catch (err) {
    console.error(err);
    setStatus(err.message || "Failed to generate posts.", "error");
  } finally {
    els.generateBtn.disabled = false;
  }
};

const handleDownloadZip = async () => {
  if (!state.posts.length) return;
  setStatus("Creating ZIP file…", "warning");
  try {
    const JSZipLib = await ensureJsZip();
    const zip = new JSZipLib();
    state.posts.forEach((post) => {
      const fileName = post.city.replace(/[^\w\-]+/g, "_") + ".md";
      zip.file(fileName, post.content);
    });
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "localized_posts.zip";
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus("ZIP downloaded.", "success");
  } catch (err) {
    console.error(err);
    setStatus("Failed to create ZIP file.", "error");
  }
};

const handleExportWordPress = async () => {
  if (!state.posts.length) return;
  setStatus("Building WordPress XML…", "warning");
  try {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:wp="http://wordpress.org/export/1.2/">
<channel>
  <title>Localized Blog Posts</title>
  <description>Generated by TCTC Blog Builder</description>`;

    state.posts.forEach((post) => {
      xml += `
  <item>
    <title>${post.city.replace(/&/g, "&amp;")}</title>
    <content:encoded><![CDATA[${post.content}]]></content:encoded>
    <wp:post_type>post</wp:post_type>
    <wp:status>draft</wp:status>
  </item>`;
    });

    xml += `
</channel>
</rss>`;

    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "wordpress_posts.xml";
    anchor.click();
    URL.revokeObjectURL(url);
    setStatus("WordPress XML exported.", "success");
  } catch (err) {
    console.error(err);
    setStatus("Failed to export WordPress XML.", "error");
  }
};

const handleCopyAll = async () => {
  if (!state.posts.length) return;
  try {
    const text = state.posts
      .map((post) => `### ${post.city}\n\n${post.content}`)
      .join("\n\n---\n\n");
    await navigator.clipboard.writeText(text);
    setStatus("All posts copied to clipboard.", "success");
  } catch (err) {
    console.error(err);
    setStatus("Clipboard blocked. Try downloading instead.", "error");
  }
};

const init = () => {
  if (els.templateSelect && templates.plumber) {
    els.templateSelect.value = "plumber";
    els.baseArticle.value = templates.plumber;
  }
  loadCustomTemplatesIntoDropdown();
  renderHistory();
  toggleExportButtons(false);

  const preferred = BlogBuilderKeys.getPreferred();
  if (preferred) {
    els.provider.value = preferred;
  }
  updateKeyStatus();

  els.templateSelect.addEventListener("change", handleTemplateChange);
  document.getElementById("saveTemplateBtn")?.addEventListener("click", handleSaveTemplate);
  document.getElementById("manageTemplatesBtn")?.addEventListener("click", handleManageTemplates);
  els.generateBtn.addEventListener("click", handleGenerate);
  els.downloadZipBtn.addEventListener("click", handleDownloadZip);
  els.exportWPBtn.addEventListener("click", handleExportWordPress);
  els.copyAllBtn.addEventListener("click", handleCopyAll);
  els.provider.addEventListener("change", updateKeyStatus);
  document.getElementById("blogSaveKeyBtn")?.addEventListener("click", handleSaveKey);
  document.getElementById("blogClearKeyBtn")?.addEventListener("click", handleClearKey);
  document.getElementById("blogTestKeyBtn")?.addEventListener("click", handleTestKey);
  els.clearHistoryBtn?.addEventListener("click", clearHistory);
};

document.addEventListener("DOMContentLoaded", init);
