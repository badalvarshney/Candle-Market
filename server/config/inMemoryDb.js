// In-Memory Database Fallback for when MongoDB connection is unavailable

export const inMemoryStore = {
  products: [
    {
      _id: '1',
      id: 1,
      name: "Golden Amber & Madagascar Vanilla",
      tagline: "Illumination by Gargi botanical soy candle with whispering crackle wood wick",
      category: "soy-coconut",
      scentFamily: "warm-cozy",
      price: 899,
      originalPrice: 1299,
      rating: 4.9,
      reviewsCount: 142,
      burnTime: "60 Hours",
      weight: "320g / 11.2 oz",
      waxType: "100% Organic Soy & Coconut Wax",
      wickType: "Dual Whispering Wood Wick",
      jarMaterial: "Handblown Amber Glass",
      isBestSeller: true,
      isNewItem: false,
      image: "/candle_vanilla.jpg",
      scentProfile: {
        top: ["Wild Honey", "Crushed Tonka Bean"],
        heart: ["Madagascar Vanilla Pods", "Warm Amber"],
        base: ["Sandalwood", "Rich Bourbon Bark"]
      },
      description: "Hand-poured by Illumination by Gargi using sustainably sourced soy wax and steam-distilled essential oils.",
      mood: "Cozy Relaxation & Warmth",
      stock: 45
    },
    {
      _id: '2',
      id: 2,
      name: "The Royal Artisanal Votive Candle Trio",
      tagline: "Illumination by Gargi 3 luxury botanical votive candles set",
      category: "gift-sets",
      scentFamily: "warm-cozy",
      price: 1899,
      originalPrice: 2499,
      rating: 5.0,
      reviewsCount: 310,
      burnTime: "3x 25 Hours (75 Total)",
      weight: "3x 120g Votives",
      waxType: "100% Organic Botanical Wax",
      wickType: "Organic Egyptian Cotton Wicks",
      jarMaterial: "Embossed Amber Glass Votives",
      isBestSeller: true,
      isNewItem: true,
      image: "/candle_votive_trio.jpg",
      scentProfile: {
        top: ["French Lavender", "Italian Bergamot"],
        heart: ["Madagascar Vanilla", "Damask Rose"],
        base: ["Atlas Cedarwood", "Amber"]
      },
      description: "An opulent gifting collection inspired by royal Indian festivities. Hand-poured into glass votives.",
      mood: "Festive Gifting & Celebration",
      stock: 20
    },
    {
      _id: '3',
      id: 3,
      name: "Serene French Lavender & White Musk",
      tagline: "Illumination by Gargi lavender essential oil candle for tranquil sleep",
      category: "aromatherapy",
      scentFamily: "floral",
      price: 749,
      originalPrice: 999,
      rating: 4.8,
      reviewsCount: 98,
      burnTime: "50 Hours",
      weight: "260g / 9.1 oz",
      waxType: "Pure Organic Soy Wax",
      wickType: "Unbleached Cotton Wick",
      jarMaterial: "Matte Cream Ceramic Jar",
      isBestSeller: true,
      isNewItem: false,
      image: "/candle_lavender.jpg",
      scentProfile: {
        top: ["Provence Lavender", "Eucalyptus Leaf"],
        heart: ["White Jasmine", "Chamomile"],
        base: ["Velvet Musk", "Cedar Bark"]
      },
      description: "Formulated by Illumination by Gargi to soothe stress and calm the senses. Infused with pure steam-distilled lavender oil.",
      mood: "Deep Sleep & Meditation",
      stock: 50
    },
    {
      _id: '4',
      id: 4,
      name: "Midnight Cedarwood & Smoked Sage",
      tagline: "Illumination by Gargi obsidian glass candle with whispering wood wick",
      category: "wood-wick",
      scentFamily: "woody-earthy",
      price: 1099,
      originalPrice: 1499,
      rating: 4.95,
      reviewsCount: 210,
      burnTime: "70 Hours",
      weight: "380g / 13.4 oz",
      waxType: "Beeswax & Coconut Wax Blend",
      wickType: "Natural Cherry Wood Wick",
      jarMaterial: "Matte Obsidian Black Glass",
      isBestSeller: false,
      isNewItem: true,
      image: "/candle_obsidian.jpg",
      scentProfile: {
        top: ["White Sage", "Bergamot Zest"],
        heart: ["Atlas Cedarwood", "Patchouli Leaf"],
        base: ["Oakmoss", "Vetiver"]
      },
      description: "A grounding woodsy candle poured into matte obsidian glass by Illumination by Gargi.",
      mood: "Focus & Aura Cleansing",
      stock: 30
    },
    {
      _id: '5',
      id: 5,
      name: "Rose Quartz & Wild Peony Crystal Jar",
      tagline: "Illumination by Gargi blooming floral candle in rose gold crystal jar",
      category: "luxury-glass",
      scentFamily: "floral",
      price: 1299,
      originalPrice: 1699,
      rating: 5.0,
      reviewsCount: 164,
      burnTime: "60 Hours",
      weight: "340g / 12 oz",
      waxType: "Coconut-Soy Botanical Wax",
      wickType: "Dual Organic Cotton Wicks",
      jarMaterial: "Ribbed Rose Gold Crystal Jar",
      isBestSeller: true,
      isNewItem: true,
      image: "/candle_rose_crystal.jpg",
      scentProfile: {
        top: ["Damask Rose Petals", "Pink Grapefruit"],
        heart: ["Wild Peony", "Magnolia Blossom"],
        base: ["Blush Musk", "Soft Sandalwood"]
      },
      description: "An elegant centerpiece glass candle poured into reusable rose gold crystal glassware.",
      mood: "Romance & Self-Love",
      stock: 25
    },
    {
      _id: '6',
      id: 6,
      name: "Italian Bergamot & Fresh Eucalyptus",
      tagline: "Illumination by Gargi citrus spa candle with cooling eucalyptus",
      category: "aromatherapy",
      scentFamily: "fresh-citrus",
      price: 649,
      originalPrice: 849,
      rating: 4.7,
      reviewsCount: 76,
      burnTime: "45 Hours",
      weight: "240g / 8.5 oz",
      waxType: "Soy Wax Base",
      wickType: "Cotton Wick",
      jarMaterial: "Frosted Crystal Glass",
      isBestSeller: false,
      isNewItem: false,
      image: "/candle_citrus_eucalyptus.jpg",
      scentProfile: {
        top: ["Calabrian Bergamot", "Spearmint"],
        heart: ["Blue Eucalyptus", "Green Tea"],
        base: ["White Wood", "Ambergris"]
      },
      description: "Invigorates your morning workspace with natural citrus oils and cooling eucalyptus notes.",
      mood: "Morning Energy & Clarity",
      stock: 40
    },
    {
      _id: '7',
      id: 7,
      name: "Royal Smoked Oudh & Damask Velvet",
      tagline: "Illumination by Gargi triple flame candle in dark smoked glass",
      category: "luxury-glass",
      scentFamily: "woody-earthy",
      price: 1499,
      originalPrice: 1999,
      rating: 4.9,
      reviewsCount: 88,
      burnTime: "75 Hours",
      weight: "400g / 14.1 oz",
      waxType: "Black Beeswax Blend",
      wickType: "Triple Cotton Wick",
      jarMaterial: "Obsidian Smoked Glass Jar",
      isBestSeller: false,
      isNewItem: true,
      image: "/candle_smoked_oudh.jpg",
      scentProfile: {
        top: ["Saffron", "Smoked Oud"],
        heart: ["Bulgarian Rose", "Frankincense"],
        base: ["Amberwood", "Leather Accord"]
      },
      description: "A rich statement candle poured into smoked glass with triple glowing flames.",
      mood: "Opulence & Sophistication",
      stock: 15
    },
    {
      _id: '8',
      id: 8,
      name: "Spiced Cinnamon & Ceylon Nutmeg",
      tagline: "Illumination by Gargi warm autumn spices in terracotta clay jar",
      category: "wood-wick",
      scentFamily: "warm-cozy",
      price: 799,
      originalPrice: 1099,
      rating: 4.85,
      reviewsCount: 115,
      burnTime: "55 Hours",
      weight: "290g / 10.2 oz",
      waxType: "Organic Soy Wax",
      wickType: "Whispering Wood Wick",
      jarMaterial: "Terracotta Clay Jar",
      isBestSeller: false,
      isNewItem: false,
      image: "/candle_cinnamon_terracotta.jpg",
      scentProfile: {
        top: ["Ceylon Cinnamon", "Fresh Clove"],
        heart: ["Baked Pumpkin", "Nutmeg"],
        base: ["Butter Vanilla", "Brown Sugar"]
      },
      description: "Warm comforting spices in an artisanal terracotta clay jar candle.",
      mood: "Cozy Fireside Ambiance",
      stock: 35
    }
  ],

  reviews: [
    {
      _id: '1',
      id: 1,
      name: "Aanya Sharma",
      city: "Mumbai",
      rating: 5,
      text: "The Golden Amber & Vanilla candle from Illumination by Gargi transforms my entire living room every evening. The crackling wooden wick sound is unbelievable!",
      boughtProduct: "Golden Amber & Vanilla",
      isApproved: true
    },
    {
      _id: '2',
      id: 2,
      name: "Rohan Kapoor",
      city: "New Delhi",
      rating: 5,
      text: "The Royal Artisanal Votives from Illumination by Gargi are stunning! World-class packaging and fragrance throw!",
      boughtProduct: "Artisanal Votive Set",
      isApproved: true
    },
    {
      _id: '3',
      id: 3,
      name: "Priya Nair",
      city: "Bengaluru",
      rating: 5,
      text: "Zero black smoke, long clean burn, and scent fills the room effortlessly without causing headaches. 100% buying again from Illumination by Gargi!",
      boughtProduct: "Serene French Lavender",
      isApproved: true
    }
  ],

  banners: [
    {
      _id: '1',
      badge: "ILLUMINATION BY GARGI • BOTANICAL STUDIO",
      title: "Pure Botanical Light & Sensory Tranquility",
      subtitle: "Hand-poured 100% organic soy candles infused with Madagascar vanilla, warm golden amber, and whispering crackle wood wicks.",
      ctaPrimary: "EXPLORE COLLECTION",
      ctaSecondary: "TAKE SCENT QUIZ",
      image: "/hero_banner.jpg",
      accentTag: "60+ HOURS CLEAN BURN • ZERO TOXIC PARAFFIN",
      order: 1,
      isActive: true
    },
    {
      _id: '2',
      badge: "ILLUMINATION BY GARGI • ARTISANAL SETS",
      title: "The Art of Luxury Votive Light",
      subtitle: "Handcrafted votive candle trios in amber & frosted glass vessels infused with Provence lavender & damask velvet rose.",
      ctaPrimary: "SHOP CANDLE SETS",
      ctaSecondary: "VIEW ALL CANDLES",
      categoryAction: "gift-sets",
      image: "/candle_votive_trio.jpg",
      accentTag: "COMPLIMENTARY GOLD FOIL GIFT PACKAGING",
      order: 2,
      isActive: true
    },
    {
      _id: '3',
      badge: "ILLUMINATION BY GARGI • WOOD WICK STUDIO",
      title: "Fireside Crackle & Mystical Smoked Oudh",
      subtitle: "Experience soothing crackling fireside sounds with dark obsidian glass candles infused with smoked sage & atlas cedarwood.",
      ctaPrimary: "EXPLORE WOOD WICKS",
      ctaSecondary: "SCENT FINDER",
      categoryAction: "wood-wick",
      image: "/candle_obsidian.jpg",
      accentTag: "SUSTAINABLY HARVESTED NATURAL CHERRY WOOD WICKS",
      order: 3,
      isActive: true
    }
  ],

  drop: {
    _id: '1',
    badgeText: 'EXCLUSIVELY LAUNCHING SOON • LIMITED BATCH DROP',
    title: 'ROYAL BOTANICAL ELIXIR COLLECTION',
    description: 'Infused with rare Kashmiri Saffron, Damask Velvet Rose, and Smoked Oudh. Hand-poured into 24K gold foil glass vessels with whispering crackle wood wicks. Only 250 handcrafted units will be released.',
    launchDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    totalUnits: 250,
    image: '/candle_smoked_oudh.jpg',
    subtitle: 'ILLUMINATION BY GARGI • ROYAL OUDH',
    isActive: true
  },

  orders: [],

  coupons: [
    { _id: '1', code: 'ILLUMINATE10', discountPercent: 10, maxDiscount: 500, minPurchase: 999, isActive: true },
    { _id: '2', code: 'WELCOME10', discountPercent: 10, maxDiscount: 500, minPurchase: 999, isActive: true },
    { _id: '3', code: 'GARGI20', discountPercent: 20, maxDiscount: 1000, minPurchase: 1499, isActive: true }
  ]
};
