/**
 * Dynamic Delivery Fee Engine
 * Calculates delivery fee based on order subtotal, city, pincode, and address.
 * Minimum delivery charge: ₹100
 * Free shipping threshold: ₹4999
 */

export const calculateDeliveryCharge = (subtotal = 0, location = {}) => {
  const FREE_SHIPPING_THRESHOLD = 4999;
  const MIN_DELIVERY_CHARGE = 100;

  // Free shipping over threshold or empty cart
  if (subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0) {
    return {
      fee: 0,
      zoneName: 'Free Express Shipping',
      isFree: true,
    };
  }

  const { city = '', pincode = '', address = '' } = location;
  const cityClean = (city || '').toLowerCase().trim();
  const pincodeClean = (pincode || '').trim();
  const addressClean = (address || '').toLowerCase().trim();

  // If no location info provided yet, return base default fee (₹100)
  if (!cityClean && !pincodeClean && !addressClean) {
    return {
      fee: MIN_DELIVERY_CHARGE,
      zoneName: 'Base Shipping (₹100)',
      isFree: false,
    };
  }

  // Zone 1: Local / Metro Zone (Delhi NCR, Mumbai, Thane, Navi Mumbai, etc.)
  const isLocalZone =
    /mumbai|thane|navi mumbai|delhi|noida|gurgaon|gurugram|ghaziabad|faridabad/.test(cityClean) ||
    /mumbai|delhi|noida|gurgaon|ghaziabad/.test(addressClean) ||
    /^(400|110|201|122|121|401)/.test(pincodeClean);

  if (isLocalZone) {
    return {
      fee: MIN_DELIVERY_CHARGE, // ₹100
      zoneName: 'Local Metro Zone (₹100 Base)',
      isFree: false,
    };
  }

  // Zone 2: Nearby Tier-1 Cities & Neighboring Western/Northern Regions
  const isTier1Zone =
    /pune|surat|ahmedabad|jaipur|chandigarh|lucknow|kanpur|agra|vadodara|nashik|indore|bhopal|nagpur/.test(cityClean) ||
    /^(411|380|302|160|226|395|390|422|452|462|440)/.test(pincodeClean);

  if (isTier1Zone) {
    return {
      fee: 140,
      zoneName: 'Regional Tier-1 Zone',
      isFree: false,
    };
  }

  // Zone 3: Major Southern & Eastern Tech Hubs / Capitals
  const isMajorHubZone =
    /bengaluru|bangalore|hyderabad|chennai|kolkata|mysore|coimbatore|visakhapatnam|kochi|ernakulam|trivandrum|thiruvananthapuram/.test(cityClean) ||
    /^(560|500|600|700|570|641|530|682|695)/.test(pincodeClean);

  if (isMajorHubZone) {
    return {
      fee: 180,
      zoneName: 'National Hub Zone',
      isFree: false,
    };
  }

  // Zone 4: Remote / Far North-East / Island / High Altitude Zones
  const isRemoteZone =
    /assam|guwahati|shillong|srinagar|jammu|leh|ladakh|imphal|aizawl|agartala|kohima|gangtok|port blair|itangar|silchar|dibrugarh/.test(cityClean) ||
    /^(78|79|737|19|18|744)/.test(pincodeClean);

  if (isRemoteZone) {
    return {
      fee: 250,
      zoneName: 'Remote / Special Zone',
      isFree: false,
    };
  }

  // Zone 5: Standard Outstation / Rest of India
  return {
    fee: 200,
    zoneName: 'Standard Outstation Zone',
    isFree: false,
  };
};
