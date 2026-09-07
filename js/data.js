/**
 * Product Catalog Data for NababMart E-Commerce Platform
 * Developed by: Nabab (nabab9695ali@gmail.com)
 */

const PRODUCTS_DATA = [
  {
    id: 1,
    title: "Apple iPhone 15 Pro Max (256 GB) - Natural Titanium",
    category: "mobiles",
    brand: "Apple",
    price: 134900,
    originalPrice: 159900,
    discount: 16,
    rating: 4.8,
    ratingCount: 3420,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    badge: "Bestseller",
    description: "Experience titanium design, A17 Pro chip, customizable Action button, and the most versatile iPhone camera system yet.",
    specs: {
      "Display": "6.7-inch Super Retina XDR OLED 120Hz",
      "Processor": "A17 Pro Chip 6-core",
      "Storage": "256 GB NVMe",
      "Camera": "48MP Main + 12MP Ultra-wide + 12MP Telephoto 5x",
      "Battery": "Up to 29 hours video playback"
    }
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra 5G (Titanium Gray, 512GB)",
    category: "mobiles",
    brand: "Samsung",
    price: 129999,
    originalPrice: 144999,
    discount: 10,
    rating: 4.7,
    ratingCount: 2190,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    badge: "Hot Deal",
    description: "Welcome to the era of mobile AI with Galaxy AI. S Pen built-in, 200MP camera, and titanium frame.",
    specs: {
      "Display": "6.8-inch Dynamic AMOLED 2X 120Hz",
      "Processor": "Snapdragon 8 Gen 3 for Galaxy",
      "Storage": "512 GB / 12GB RAM",
      "Camera": "200MP + 50MP + 12MP + 10MP Quad Camera",
      "Battery": "5000 mAh with 45W Fast Charging"
    }
  },
  {
    id: 3,
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    category: "electronics",
    brand: "Sony",
    price: 26990,
    originalPrice: 34990,
    discount: 23,
    rating: 4.6,
    ratingCount: 5120,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    badge: "Top Rated",
    description: "Industry-leading noise cancellation with two processors and eight microphones. Crystal clear hands-free calling.",
    specs: {
      "Battery Life": "Up to 30 hours playback",
      "Noise Cancellation": "Auto NC Optimizer with V1 + QN1 processors",
      "Bluetooth": "v5.2 with LDAC support",
      "Driver": "30mm precision engineered unit",
      "Weight": "250g ultra-lightweight"
    }
  },
  {
    id: 4,
    title: "Apple MacBook Air M3 (13.6-inch, 16GB Unified RAM, 512GB SSD)",
    category: "electronics",
    brand: "Apple",
    price: 124900,
    originalPrice: 134900,
    discount: 7,
    rating: 4.9,
    ratingCount: 1420,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    badge: "Trending",
    description: "Lean, mean, M3 machine. Incredibly thin and blazing fast with all-day 18-hour battery life.",
    specs: {
      "Display": "13.6-inch Liquid Retina display with True Tone",
      "Processor": "Apple M3 chip (8-core CPU, 10-core GPU)",
      "Memory": "16GB Unified Memory",
      "Storage": "512GB Superfast SSD",
      "Battery": "Up to 18 hours battery life"
    }
  },
  {
    id: 5,
    title: "Nike Air Max 270 React Men's Athletic Running Shoes",
    category: "fashion",
    brand: "Nike",
    price: 8495,
    originalPrice: 13995,
    discount: 39,
    rating: 4.5,
    ratingCount: 1870,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    badge: "Mega Deal",
    description: "Nike's first lifestyle Air unit meets the softest, smoothest and most resilient foam for unparalleled all-day comfort.",
    specs: {
      "Sole Material": "Rubber with Max Air 270 unit",
      "Upper Material": "Breathable woven textile",
      "Closure": "Lace-Up",
      "Fit Type": "Standard Regular Fit",
      "Ideal For": "Running, Gym & Casual Lifestyle"
    }
  },
  {
    id: 6,
    title: "Fossil Gen 6 Smartwatch Touchscreen with Alexa Built-in",
    category: "watches",
    brand: "Fossil",
    price: 14995,
    originalPrice: 24995,
    discount: 40,
    rating: 4.3,
    ratingCount: 890,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    badge: "40% OFF",
    description: "Smart styling meets cutting-edge tech with Wear OS by Google, SpO2 sensor, rapid charging and heart rate tracking.",
    specs: {
      "Case Size": "44mm Stainless Steel",
      "OS": "Wear OS by Google",
      "Connectivity": "Bluetooth 5.0 LE, GPS, NFC SE, WiFi",
      "Sensors": "Heart Rate, SpO2, Accelerometer, Compass",
      "Charging": "80% charge in 30 minutes"
    }
  },
  {
    id: 7,
    title: "Levi's Men's Slim Fit Washed Denim Casual Jacket",
    category: "fashion",
    brand: "Levis",
    price: 3499,
    originalPrice: 6999,
    discount: 50,
    rating: 4.4,
    ratingCount: 1250,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    badge: "50% OFF",
    description: "Iconic Levi's trucker jacket made from 100% premium cotton denim. Timeless styling with dual flap chest pockets.",
    specs: {
      "Fabric": "100% Premium Pure Cotton",
      "Fit": "Modern Slim Fit",
      "Pattern": "Vintage Washed",
      "Closure": "Button placket",
      "Wash Care": "Machine wash cold inside out"
    }
  },
  {
    id: 8,
    title: "Philips Air Fryer HD9252/90 Digital with Rapid Air Technology",
    category: "home",
    brand: "Philips",
    price: 7999,
    originalPrice: 12995,
    discount: 38,
    rating: 4.6,
    ratingCount: 4280,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    badge: "Flipkart Choice",
    description: "Fry with up to 90% less fat. Touchscreen with 7 presets for easy cooking, roasting, grilling and baking.",
    specs: {
      "Capacity": "4.1 Litres",
      "Power": "1400 Watts",
      "Technology": "Rapid Air 360 Degree Circulation",
      "Presets": "7 One-touch cooking presets",
      "Warranty": "2 Years International Warranty"
    }
  },
  {
    id: 9,
    title: "OnePlus 12 5G (Flowy Emerald, 16GB RAM, 512GB Storage)",
    category: "mobiles",
    brand: "OnePlus",
    price: 64999,
    originalPrice: 69999,
    discount: 7,
    rating: 4.7,
    ratingCount: 3120,
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    badge: "High Performance",
    description: "4th Gen Hasselblad Camera for Mobile, Snapdragon 8 Gen 3, and ultra-fast 100W SUPERVOOC charging.",
    specs: {
      "Display": "6.82-inch 2K 120 Hz ProXDR Display",
      "Processor": "Snapdragon 8 Gen 3 Mobile Platform",
      "RAM/Storage": "16GB LPDDR5X + 512GB UFS 4.0",
      "Charging": "100W Wired + 50W Wireless AIRVOOC",
      "Battery": "5400 mAh Dual-Cell"
    }
  },
  {
    id: 10,
    title: "Boat Airdopes 141 ANC TWS Earbuds with 42H Playtime",
    category: "electronics",
    brand: "Boat",
    price: 1699,
    originalPrice: 4490,
    discount: 62,
    rating: 4.2,
    ratingCount: 14200,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    badge: "Super Saver",
    description: "Active Noise Cancellation up to 32dB, ENx tech for clear calls, and BEAST mode 50ms low latency for gaming.",
    specs: {
      "Noise Cancellation": "Active Noise Cancellation up to 32dB",
      "Playtime": "Up to 42 hours total",
      "Drivers": "10mm dynamic bass drivers",
      "Fast Charge": "ASAP Charge: 10 mins = 150 mins playtime",
      "Water Resistance": "IPX5 Splash & Sweat Resistant"
    }
  },
  {
    id: 11,
    title: "Casio Vintage Digital Unisex Stainless Steel Watch A168WA",
    category: "watches",
    brand: "Casio",
    price: 2695,
    originalPrice: 3295,
    discount: 18,
    rating: 4.7,
    ratingCount: 9450,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    badge: "Cult Classic",
    description: "A retro timeless icon. Electro-luminescent backlight, 1/100-second stopwatch, daily alarm, and auto calendar.",
    specs: {
      "Band Material": "Stainless Steel Band with adjustable clasp",
      "Water Resistance": "Water Resistant",
      "Battery Life": "Approx 7 years on CR2016",
      "Features": "EL Backlight, Stopwatch, Hourly Time Signal",
      "Glass": "Resin Glass"
    }
  },
  {
    id: 12,
    title: "Adidas Originals Trefoil Classic Relaxed Fit Hoodie",
    category: "fashion",
    brand: "Adidas",
    price: 3299,
    originalPrice: 5999,
    discount: 45,
    rating: 4.6,
    ratingCount: 1680,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    badge: "Myntra Top Pick",
    description: "An authentic streetwear essential. Crafted with ultra-soft heavyweight French terry cotton with embroidered Trefoil.",
    specs: {
      "Fabric": "100% French Terry Cotton",
      "Fit": "Relaxed comfort fit",
      "Pockets": "Kangaroo pouch pocket",
      "Hood": "Drawcord-adjustable hood",
      "Origin": "Imported"
    }
  },
  {
    id: 13,
    title: "Dyson V12 Detect Slim Cordless Vacuum Cleaner",
    category: "home",
    brand: "Dyson",
    price: 49900,
    originalPrice: 58900,
    discount: 15,
    rating: 4.8,
    ratingCount: 820,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    badge: "Premium",
    description: "Laser reveals microscopic dust. Intelligently optimizes suction and run time with real-time scientific proof on LCD screen.",
    specs: {
      "Suction Power": "150 Air Watts",
      "Run Time": "Up to 60 minutes",
      "Filtration": "Whole-machine filtration captures 99.99% of particles",
      "Weight": "2.2 kg lightweight",
      "Bin Volume": "0.35 Litres"
    }
  },
  {
    id: 14,
    title: "Puma RS-X Reinvent Chunky Unisex Sneakers",
    category: "fashion",
    brand: "Puma",
    price: 4599,
    originalPrice: 8999,
    discount: 49,
    rating: 4.4,
    ratingCount: 1390,
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    badge: "Bestseller",
    description: "Retro silhouette upgraded with vibrant color-blocking, layered mesh, and signature Running System cushioning.",
    specs: {
      "Upper": "Mesh upper with suede and synthetic leather overlays",
      "Midsole": "Lightweight PU midsole with RS technology",
      "Outsole": "Full rubber outsole for durable grip",
      "Style": "Chunky silhouette retro runner",
      "Fastening": "Lace closure"
    }
  },
  {
    id: 15,
    title: "Sony Bravia 55 inch 4K Ultra HD Smart Google LED TV",
    category: "electronics",
    brand: "Sony",
    price: 57990,
    originalPrice: 79900,
    discount: 27,
    rating: 4.7,
    ratingCount: 3950,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    badge: "Big Screen Deal",
    description: "Experience life-like color and clarity with 4K Processor X1, Dolby Audio, Google TV interface, and Motionflow XR.",
    specs: {
      "Display": "55-inch 4K HDR (3840 x 2160 pixels)",
      "Audio": "20 Watts with Dolby Atmos",
      "Smart Platform": "Google TV with Chromecast Built-in",
      "Ports": "3 HDMI, 2 USB, Bluetooth, Dual-band WiFi",
      "Warranty": "1 Year Comprehensive + 1 Year additional on Panel"
    }
  },
  {
    id: 16,
    title: "Nespresso Essenza Mini Espresso Coffee Maker Machine",
    category: "home",
    brand: "Philips",
    price: 13990,
    originalPrice: 19990,
    discount: 30,
    rating: 4.6,
    ratingCount: 1120,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80"
    ],
    inStock: true,
    badge: "Trending",
    description: "Compact design without compromise. 19-bar high-pressure pump extracts rich crema and barista-style espresso at home.",
    specs: {
      "Pressure": "19 Bar High Pressure Pump",
      "Heat-up Time": "Fast heat-up in 25 seconds",
      "Tank Capacity": "0.6 Litres Removable Water Reservoir",
      "Cup Sizes": "Espresso (40ml) and Lungo (110ml)",
      "Energy": "Eco-mode after 3 mins, auto-off after 9 mins"
    }
  }
];

// Promotional Banners & Carousel Slides
const PROMO_BANNERS = [
  {
    id: 1,
    title: "India's Biggest Tech Fiesta",
    subtitle: "Up to 50% Off on Premium Smartphones & Laptops",
    badge: "Limited Time Offer",
    cta: "Shop Tech Deals",
    category: "mobiles",
    bgGradient: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    title: "Urban Streetwear & Fashion Fest",
    subtitle: "Min 40-70% Off on Nike, Levi's, Adidas & More",
    badge: "Mega Trend Sale",
    cta: "Explore Fashion",
    category: "fashion",
    bgGradient: "linear-gradient(135deg, #e94057 0%, #8a2387 100%)",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    title: "Smart Home & Appliances Extravaganza",
    subtitle: "Upgrade Your Lifestyle with Philips, Dyson & Casio",
    badge: "Festive Deals",
    cta: "Discover Home",
    category: "home",
    bgGradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80"
  }
];

// Available coupon codes
const COUPON_CODES = {
  "NABAB50": { discountPercent: 50, maxDiscount: 2000, description: "50% Off (Special Developer Code)" },
  "SAVE10": { discountPercent: 10, maxDiscount: 1000, description: "10% Instant Discount on All Orders" },
  "FLIP20": { discountPercent: 20, maxDiscount: 1500, description: "20% Festive Super Saver" }
};
