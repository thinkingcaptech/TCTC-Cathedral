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

const toolInterface = document.getElementById("tool-interface");
const apiBase = toolInterface && toolInterface.dataset ? (toolInterface.dataset.apiBase || "").replace(/\/$/, "") : "";
const buildEndpoint = (path) => apiBase ? `${apiBase}${path}` : path;

const JSZIP_URL = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
let jsZipPromise;

function ensureJsZip() {
  if (window.JSZip) {
    return Promise.resolve(window.JSZip);
  }
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

// Custom templates stored in localStorage
const CUSTOM_TEMPLATES_KEY = 'customTemplates';

// Check if localStorage is available
function isLocalStorageAvailable() {
  try {
    const test = '__localStorage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

function getCustomTemplates() {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage not available');
    return {};
  }
  try {
    const stored = localStorage.getItem(CUSTOM_TEMPLATES_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.error('Error reading custom templates:', e);
    return {};
  }
}

function saveCustomTemplate(name, content) {
  if (!isLocalStorageAvailable()) {
    alert('⚠️ Custom templates cannot be saved on this device. localStorage is disabled or blocked. Try enabling cookies/site data in your browser settings.');
    return false;
  }
  try {
    const custom = getCustomTemplates();
    custom[name] = content;
    localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(custom));
    return true;
  } catch (e) {
    console.error('Error saving template:', e);
    alert('⚠️ Error saving template. Your browser may have storage restrictions. Error: ' + e.message);
    return false;
  }
}

function deleteCustomTemplate(name) {
  if (!isLocalStorageAvailable()) {
    return false;
  }
  try {
    const custom = getCustomTemplates();
    delete custom[name];
    localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(custom));
    return true;
  } catch (e) {
    console.error('Error deleting template:', e);
    return false;
  }
}

// Global state
let generatedPosts = [];

// DOM elements
const baseArticleEl = document.getElementById("baseArticle");
const citiesEl = document.getElementById("cities");
const toneEl = document.getElementById("tone");
const lengthEl = document.getElementById("length");
const statusEl = document.getElementById("status");
const resultsContainer = document.getElementById("resultsContainer");
const generateBtn = document.getElementById("generateBtn");
const downloadZipBtn = document.getElementById("downloadZipBtn");
const exportWPBtn = document.getElementById("exportWPBtn");
const copyAllBtn = document.getElementById("copyAllBtn");
const templateSelect = document.getElementById("templateSelect");

if (templateSelect && templates.plumber && baseArticleEl) {
  templateSelect.value = "plumber";
  baseArticleEl.value = templates.plumber;
}

// Event listeners
generateBtn.addEventListener("click", handleGenerate);
downloadZipBtn.addEventListener("click", handleDownloadZip);
exportWPBtn.addEventListener("click", handleExportWordPress);
copyAllBtn.addEventListener("click", handleCopyAll);
templateSelect.addEventListener("change", handleTemplateChange);
document.getElementById('saveTemplateBtn').addEventListener('click', handleSaveTemplate);
document.getElementById('manageTemplatesBtn').addEventListener('click', handleManageTemplates);

// Load custom templates on page load
loadCustomTemplatesIntoDropdown();

// Template selection handler
function handleTemplateChange(e) {
  const selectedTemplate = e.target.value;
  const customTemplates = getCustomTemplates();
  
  if (selectedTemplate && templates[selectedTemplate]) {
    baseArticleEl.value = templates[selectedTemplate];
    statusEl.textContent = "Template loaded. Customize as needed.";
    statusEl.style.color = "#facc15";
  } else if (selectedTemplate && customTemplates[selectedTemplate]) {
    baseArticleEl.value = customTemplates[selectedTemplate];
    statusEl.textContent = "Custom template loaded.";
    statusEl.style.color = "#facc15";
  }
  
  setTimeout(() => {
    statusEl.style.color = "";
  }, 3000);
}

// Load custom templates into dropdown
function loadCustomTemplatesIntoDropdown() {
  const customGroup = document.getElementById('customTemplatesGroup');
  if (!customGroup) return;
  
  // Clear existing custom options
  customGroup.innerHTML = '';
  
  if (!isLocalStorageAvailable()) {
    customGroup.style.display = 'none';
    return;
  }
  
  const customTemplates = getCustomTemplates();
  
  if (Object.keys(customTemplates).length > 0) {
    customGroup.style.display = '';
    Object.keys(customTemplates).forEach(name => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      customGroup.appendChild(option);
    });
  } else {
    customGroup.style.display = 'none';
  }
}

// Save template handler
function handleSaveTemplate() {
  // Check localStorage availability first
  if (!isLocalStorageAvailable()) {
    alert('⚠️ Custom templates are not available on this device.\n\n' +
          'Reason: localStorage is disabled or blocked.\n\n' +
          'Solution: Enable cookies and site data in your browser settings:\n' +
          '• Chrome: Settings > Privacy > Cookies > Allow all cookies\n' +
          '• Chromebook: Check if "Block third-party cookies" is enabled\n\n' +
          'Note: This feature works on other devices where localStorage is enabled.');
    return;
  }

  const content = baseArticleEl.value.trim();
  if (!content) {
    alert('Please enter article content before saving as a template.');
    return;
  }
  
  const name = prompt('Enter a name for this custom template:');
  if (!name) return;
  
  // Sanitize name
  const sanitizedName = name.trim().replace(/[^a-zA-Z0-9\s-]/g, '');
  if (!sanitizedName) {
    alert('Please enter a valid template name.');
    return;
  }
  
  if (saveCustomTemplate(sanitizedName, content)) {
    loadCustomTemplatesIntoDropdown();
    statusEl.textContent = `✓ Template "${sanitizedName}" saved successfully!`;
    statusEl.style.color = "#22c55e";
    setTimeout(() => {
      statusEl.style.color = "";
      statusEl.textContent = "";
    }, 3000);
  }
}

// Manage templates handler
function handleManageTemplates() {
  const customTemplates = getCustomTemplates();
  const templateNames = Object.keys(customTemplates);
  
  if (templateNames.length === 0) {
    alert('No custom templates saved yet. Save your first template using the "Save as Custom Template" button.');
    return;
  }
  
  const message = 'Your Custom Templates:\n\n' + templateNames.map((name, i) => `${i + 1}. ${name}`).join('\n') + 
    '\n\nEnter the number of the template to DELETE, or click Cancel to close.';
  
  const response = prompt(message);
  if (!response) return;
  
  const index = parseInt(response) - 1;
  if (index >= 0 && index < templateNames.length) {
    const templateName = templateNames[index];
    if (confirm(`Delete template "${templateName}"?`)) {
      deleteCustomTemplate(templateName);
      loadCustomTemplatesIntoDropdown();
      statusEl.textContent = `✓ Template "${templateName}" deleted.`;
      statusEl.style.color = "#22c55e";
      setTimeout(() => {
        statusEl.style.color = "";
        statusEl.textContent = "";
      }, 3000);
    }
  } else {
    alert('Invalid selection.');
  }
}

// Main generation handler
async function handleGenerate() {
  const baseArticle = baseArticleEl.value.trim();
  const citiesRaw = citiesEl.value.trim();

  if (!baseArticle || !citiesRaw) {
    statusEl.textContent = "Please provide both a base article and a list of cities.";
    statusEl.style.color = "#ef4444";
    return;
  }

  const cities = citiesRaw.split("\n").map(c => c.trim()).filter(Boolean);

  if (cities.length === 0) {
    statusEl.textContent = "Please enter at least one city.";
    statusEl.style.color = "#ef4444";
    return;
  }

  // Cost estimation and warning
  const estimatedInputTokens = baseArticle.length * 0.25 * cities.length; // ~0.25 tokens per char
  const estimatedOutputTokens = 2000 * cities.length; // ~2000 tokens per article
  const estimatedCost = (estimatedInputTokens / 1000000 * 0.01875) + (estimatedOutputTokens / 1000000 * 0.075);
  
  if (cities.length > 20 || estimatedCost > 0.05) {
    const costFormatted = estimatedCost.toFixed(4);
    const confirmMsg = `⚠️ Cost Warning\n\nGenerating ${cities.length} articles will cost approximately $${costFormatted}.\n\nInput tokens: ~${Math.round(estimatedInputTokens).toLocaleString()}\nOutput tokens: ~${Math.round(estimatedOutputTokens).toLocaleString()}\n\nContinue with generation?`;
    
    if (!confirm(confirmMsg)) {
      statusEl.textContent = "Generation cancelled by user.";
      statusEl.style.color = "#facc15";
      return;
    }
  }

  statusEl.textContent = `Generating ${cities.length} localized posts. This may take a moment...`;
  statusEl.style.color = "#facc15";
  generateBtn.disabled = true;
  downloadZipBtn.disabled = true;
  exportWPBtn.disabled = true;
  copyAllBtn.disabled = true;
  resultsContainer.innerHTML = '<p class="builder-status">Processing...</p>';

  try {
    const res = await fetch(buildEndpoint("/api/generateLocalPosts"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        baseArticle,
        cities,
        tone: toneEl.value,
        length: lengthEl.value
      })
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Request failed");
    }

    const data = await res.json();
    generatedPosts = data.posts || [];

    renderResults(generatedPosts);

    statusEl.textContent = `✓ Generated ${generatedPosts.length} localized posts successfully.`;
    statusEl.style.color = "#22c55e";
    downloadZipBtn.disabled = generatedPosts.length === 0;
    exportWPBtn.disabled = generatedPosts.length === 0;
    copyAllBtn.disabled = generatedPosts.length === 0;

    // Save project to Firestore
    await saveProject({
      baseArticle,
      cities,
      tone: toneEl.value,
      length: lengthEl.value,
      posts: generatedPosts
    });

  } catch (err) {
    console.error(err);
    statusEl.textContent = `Error: ${err.message}`;
    statusEl.style.color = "#ef4444";
    resultsContainer.innerHTML = `<p class="text-red-400 text-xs">Failed to generate posts. Please check your configuration and try again.</p>`;
  } finally {
    generateBtn.disabled = false;
  }
}

// Save project to Firestore
async function saveProject({ baseArticle, cities, tone, length, posts }) {
  try {
    await fetch(buildEndpoint("/api/saveProject"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        baseArticle,
        cities,
        tone,
        length,
        posts,
        createdAt: new Date().toISOString()
      })
    });
  } catch (err) {
    console.error("Failed to save project:", err);
  }
}

// Render results
function renderResults(posts) {
  resultsContainer.innerHTML = "";

  if (!posts.length) {
    resultsContainer.innerHTML = "<p class='builder-status'>No posts generated yet.</p>";
    return;
  }

  posts.forEach((post, idx) => {
    const card = document.createElement("div");
    card.className = "result-card";

    const header = document.createElement("div");
    header.className = "result-card__header";

    const title = document.createElement("h3");
    title.className = "result-card__title";
    title.textContent = `${idx + 1}. ${post.city}`;

    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-chip";
    copyBtn.textContent = "Copy";
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(post.content);
      copyBtn.textContent = "Copied!";
      setTimeout(() => { copyBtn.textContent = "Copy"; }, 2000);
    });

    header.appendChild(title);
    header.appendChild(copyBtn);

    const body = document.createElement("pre");
    body.className = "result-card__body";
    body.textContent = post.content;

    card.appendChild(header);
    card.appendChild(body);

    resultsContainer.appendChild(card);
  });
}

// Download as ZIP
async function handleDownloadZip() {
  if (!generatedPosts.length) return;

  statusEl.textContent = "Creating ZIP file...";
  statusEl.style.color = "#facc15";

  try {
    const JSZipLib = await ensureJsZip();
    const zip = new JSZipLib();

    generatedPosts.forEach(post => {
      const fileName = post.city.replace(/[^\w\-]+/g, "_") + ".txt";
      zip.file(fileName, post.content);
    });

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "localized_posts.zip";
    a.click();
    URL.revokeObjectURL(url);

    statusEl.textContent = "✓ ZIP file downloaded successfully.";
    statusEl.style.color = "#22c55e";
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Failed to create ZIP file.";
    statusEl.style.color = "#ef4444";
  }
}

// Export to WordPress XML
async function handleExportWordPress() {
  if (!generatedPosts.length) return;

  statusEl.textContent = "Creating WordPress XML...";
  statusEl.style.color = "#facc15";

  try {
    let xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:wp="http://wordpress.org/export/1.2/">
<channel>
  <title>Localized Blog Posts</title>
  <description>Generated by Local Keyword Blog Builder</description>
`;

    generatedPosts.forEach(post => {
      const safeTitle = post.city.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const safeContent = post.content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      
      xml += `
  <item>
    <title>${safeTitle}</title>
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
    const a = document.createElement("a");
    a.href = url;
    a.download = "wordpress_posts.xml";
    a.click();
    URL.revokeObjectURL(url);

    statusEl.textContent = "✓ WordPress XML exported successfully.";
    statusEl.style.color = "#22c55e";
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Failed to export WordPress XML.";
    statusEl.style.color = "#ef4444";
  }
}

// Copy all to clipboard
async function handleCopyAll() {
  if (!generatedPosts.length) return;

  try {
    const allText = generatedPosts
      .map(p => `### ${p.city}\n\n${p.content}`)
      .join("\n\n---\n\n");

    await navigator.clipboard.writeText(allText);
    statusEl.textContent = "✓ All posts copied to clipboard.";
    statusEl.style.color = "#22c55e";
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Failed to copy to clipboard.";
    statusEl.style.color = "#ef4444";
  }
}
