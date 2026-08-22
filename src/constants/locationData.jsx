import React from "react";

// Location data helper with Country flag CDN images, States, Cities and Postal Code mapping

export const COUNTRIES_DATA = [
  {
    name: "India",
    code: "IN",
    states: [
      "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
      "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
      "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
      "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
      "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
      "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Chandigarh", "Puducherry"
    ]
  },
  {
    name: "Pakistan",
    code: "PK",
    states: [
      "Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan",
      "Islamabad Capital Territory", "Azad Jammu and Kashmir", "Gilgit-Baltistan"
    ]
  },
  {
    name: "United States",
    code: "US",
    states: [
      "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
      "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
      "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
      "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
      "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
      "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
      "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
      "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
      "West Virginia", "Wisconsin", "Wyoming"
    ]
  },
  {
    name: "United Kingdom",
    code: "GB",
    states: ["England", "Scotland", "Wales", "Northern Ireland"]
  },
  {
    name: "Canada",
    code: "CA",
    states: [
      "Alberta", "British Columbia", "Manitoba", "New Brunswick",
      "Newfoundland and Labrador", "Nova Scotia", "Ontario",
      "Prince Edward Island", "Quebec", "Saskatchewan"
    ]
  },
  {
    name: "Australia",
    code: "AU",
    states: [
      "New South Wales", "Queensland", "South Australia", "Tasmania",
      "Victoria", "Western Australia", "Australian Capital Territory", "Northern Territory"
    ]
  },
  {
    name: "United Arab Emirates",
    code: "AE",
    states: ["Abu Dhabi", "Ajman", "Dubai", "Fujairah", "Ras Al Khaimah", "Sharjah", "Umm Al Quwain"]
  },
  {
    name: "Singapore",
    code: "SG",
    states: ["Central Region", "East Region", "North Region", "North-East Region", "West Region"]
  },
  {
    name: "Bangladesh",
    code: "BD",
    states: ["Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh"]
  },
  {
    name: "Nepal",
    code: "NP",
    states: ["Bagmati", "Gandaki", "Lumbini", "Koshi", "Madhesh", "Karnali", "Sudurpashchim"]
  },
  {
    name: "Sri Lanka",
    code: "LK",
    states: ["Western Province", "Central Province", "Southern Province", "Northern Province", "Eastern Province", "North Western Province"]
  },
  {
    name: "Germany",
    code: "DE",
    states: [
      "Baden-Württemberg", "Bavaria", "Berlin", "Brandenburg", "Bremen",
      "Hamburg", "Hesse", "Lower Saxony", "Mecklenburg-Vorpommern",
      "North Rhine-Westphalia", "Rhineland-Palatinate", "Saarland",
      "Saxony", "Saxony-Anhalt", "Schleswig-Holstein", "Thuringia"
    ]
  },
  {
    name: "Japan",
    code: "JP",
    states: ["Tokyo", "Osaka", "Kanagawa", "Aichi", "Hokkaido", "Kyoto", "Fukuoka", "Hyogo", "Saitama", "Chiba"]
  },
  {
    name: "France",
    code: "FR",
    states: [
      "Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Brittany",
      "Centre-Val de Loire", "Corsica", "Grand Est", "Hauts-de-France",
      "Île-de-France", "Normandy", "Nouvelle-Aquitaine", "Occitanie",
      "Pays de la Loire", "Provence-Alpes-Côte d'Azur"
    ]
  },
  {
    name: "Saudi Arabia",
    code: "SA",
    states: ["Riyadh", "Makkah", "Eastern Province", "Madinah", "Asir", "Tabuk", "Al-Qassim"]
  },
  {
    name: "Qatar",
    code: "QA",
    states: ["Doha", "Al Rayyan", "Al Wakrah", "Al Khor", "Umm Salal", "Al Daayen"]
  },
  {
    name: "China",
    code: "CN",
    states: ["Beijing", "Shanghai", "Guangdong", "Zhejiang", "Jiangsu", "Sichuan", "Shandong"]
  },
  {
    name: "Philippines",
    code: "PH",
    states: ["Metro Manila", "Cebu", "Davao", "Calabarzon", "Central Luzon", "Western Visayas"]
  },
  {
    name: "Malaysia",
    code: "MY",
    states: ["Kuala Lumpur", "Selangor", "Penang", "Johor", "Perak", "Sabah", "Sarawak"]
  },
  {
    name: "Indonesia",
    code: "ID",
    states: ["Jakarta", "West Java", "Central Java", "East Java", "Bali", "North Sumatra"]
  },
  {
    name: "Turkey",
    code: "TR",
    states: ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya", "Adana"]
  },
  {
    name: "Egypt",
    code: "EG",
    states: ["Cairo", "Alexandria", "Giza", "Dakahlia", "Red Sea", "Sharqia"]
  },
  {
    name: "Nigeria",
    code: "NG",
    states: ["Lagos", "Kano", "Abuja", "Rivers", "Oyo", "Kaduna"]
  },
  {
    name: "Kenya",
    code: "KE",
    states: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Uasin Gishu"]
  },
  {
    name: "New Zealand",
    code: "NZ",
    states: ["Auckland", "Wellington", "Canterbury", "Waikato", "Bay of Plenty", "Otago"]
  },
  {
    name: "South Africa",
    code: "ZA",
    states: ["Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape", "Free State"]
  },
  {
    name: "Netherlands",
    code: "NL",
    states: ["North Holland", "South Holland", "Utrecht", "North Brabant", "Gelderland", "Overijssel"]
  },
  {
    name: "Switzerland",
    code: "CH",
    states: ["Zurich", "Geneva", "Vaud", "Bern", "Basel-Stadt", "Ticino", "Lucerne"]
  },
  {
    name: "Spain",
    code: "ES",
    states: ["Madrid", "Catalonia", "Andalusia", "Valencia", "Galicia", "Basque Country"]
  },
  {
    name: "Italy",
    code: "IT",
    states: ["Lombardy", "Lazio", "Veneto", "Piedmont", "Emilia-Romagna", "Tuscany"]
  },
  {
    name: "Brazil",
    code: "BR",
    states: ["São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia", "Paraná", "Rio Grande do Sul"]
  }
];

export const CITIES_DATA = {
  // India
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur", "Navi Mumbai"],
  "Karnataka": ["Bengaluru", "Mysore", "Hubli-Dharwad", "Mangalore", "Belgaum", "Gulbarga", "Shimoga", "Davanagere"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "Central Delhi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tiruppur", "Erode", "Vellore"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Ramagundam"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Junagadh"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem", "Sanquelim"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Bhilwara", "Alwar"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal", "Hisar", "Rohtak", "Panchkula"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Ratlam"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Noida", "Ghaziabad", "Prayagraj", "Meerut"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri", "Asansol", "Bardhaman"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Kannur"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Puri", "Sambalpur", "Balasore"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rishikesh", "Nainital"],
  "Himachal Pradesh": ["Shimla", "Dharamshala", "Mandi", "Solan", "Kullu", "Manali"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati"],
  "Chandigarh": ["Chandigarh"],
  "Puducherry": ["Puducherry", "Karaikal"],

  // Pakistan
  "Khyber Pakhtunkhwa": ["Peshawar", "Mardan", "Mingora", "Kohat", "Abbottabad", "Swabi", "Dera Ismail Khan", "Nowshera"],
  "Punjab": ["Lahore", "Faisalabad", "Rawalpindi", "Gujranwala", "Multan", "Bahawalpur", "Sargodha", "Sialkot", "Sheikhupura"],
  "Sindh": ["Karachi", "Hyderabad", "Sukkur", "Larkana", "Nawabshah", "Mirpur Khas", "Badin"],
  "Balochistan": ["Quetta", "Turbat", "Khuzdar", "Chaman", "Gwadar", "Hub"],
  "Islamabad Capital Territory": ["Islamabad"],

  // USA
  "California": ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento", "Fresno", "Long Beach", "Oakland"],
  "New York": ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany"],
  "Texas": ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", "Arlington"],
  "Florida": ["Miami", "Orlando", "Tampa", "Jacksonville", "St. Petersburg", "Fort Lauderdale"],
  "Illinois": ["Chicago", "Aurora", "Naperville", "Joliet", "Rockford", "Springfield"],

  // UAE
  "Dubai": ["Dubai City", "Deira", "Bur Dubai", "Jumeirah", "Downtown Dubai", "Business Bay", "Dubai Marina"],
  "Abu Dhabi": ["Abu Dhabi City", "Al Ain", "Al Dhafra", "Yas Island", "Saadiyat Island"],
  "Sharjah": ["Sharjah City", "Khor Fakkan", "Kalba"],

  // UK
  "England": ["London", "Manchester", "Birmingham", "Leeds", "Liverpool", "Bristol", "Sheffield", "Newcastle"],
  "Scotland": ["Edinburgh", "Glasgow", "Aberdeen", "Dundee", "Inverness"],
};

export const POSTAL_CODES_DATA = {
  // Goa
  "Panaji": "403001",
  "Margao": "403601",
  "Vasco da Gama": "403802",
  "Mapusa": "403507",
  "Ponda": "403401",
  "Bicholim": "403504",
  "Curchorem": "403706",
  "Sanquelim": "403505",

  // Maharashtra
  "Mumbai": "400001",
  "Pune": "411001",
  "Nagpur": "440001",
  "Thane": "400601",
  "Nashik": "422001",
  "Aurangabad": "431001",
  "Navi Mumbai": "400703",

  // Karnataka & South
  "Bengaluru": "560001",
  "Mysore": "570001",
  "Mangalore": "575001",
  "Chennai": "600001",
  "Coimbatore": "641001",
  "Hyderabad": "500001",
  "Kochi": "682001",
  "Thiruvananthapuram": "695001",

  // Delhi & North
  "New Delhi": "110001",
  "North Delhi": "110007",
  "South Delhi": "110017",
  "Gurugram": "122001",
  "Noida": "201301",
  "Ghaziabad": "201001",
  "Lucknow": "226001",
  "Kanpur": "208001",
  "Varanasi": "221001",
  "Agra": "282001",
  "Jaipur": "302001",
  "Jodhpur": "342001",
  "Udaipur": "313001",
  "Chandigarh": "160001",
  "Ludhiana": "141001",
  "Amritsar": "143001",

  // Gujarat
  "Ahmedabad": "380001",
  "Surat": "395001",
  "Vadodara": "390001",
  "Rajkot": "360001",
  "Gandhinagar": "382010",

  // East & Central
  "Kolkata": "700001",
  "Patna": "800001",
  "Bhubaneswar": "751001",
  "Guwahati": "781001",
  "Bhopal": "462001",
  "Indore": "452001",
  "Ranchi": "834001",

  // Pakistan
  "Peshawar": "25000",
  "Mardan": "23200",
  "Mingora": "19200",
  "Abbottabad": "22010",
  "Lahore": "54000",
  "Faisalabad": "38000",
  "Rawalpindi": "46000",
  "Gujranwala": "52250",
  "Multan": "60000",
  "Sialkot": "51310",
  "Karachi": "74000",
  "Hyderabad": "71000",
  "Sukkur": "65200",
  "Quetta": "87300",
  "Islamabad": "44000",

  // USA
  "Los Angeles": "90001",
  "San Francisco": "94101",
  "San Diego": "92101",
  "San Jose": "95101",
  "Sacramento": "95814",
  "New York City": "10001",
  "Buffalo": "14201",
  "Houston": "77001",
  "Dallas": "75201",
  "Austin": "78701",
  "Miami": "33101",
  "Orlando": "32801",
  "Chicago": "60601",

  // UAE & UK & Intl
  "Dubai City": "00000",
  "Abu Dhabi City": "00000",
  "London": "EC1A 1BB",
  "Manchester": "M1 1AE",
  "Toronto": "M5H 2N2",
  "Sydney": "2000",
  "Melbourne": "3000",
  "Singapore": "018989"
};

// Helper to get formatted dropdown options for Country with flag image CDN
export const getCountryDropdownOptions = () => {
  return COUNTRIES_DATA.map((c) => ({
    label: c.name,
    value: c.name,
    icon: (
      <img
        src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`}
        alt={c.name}
        className="w-4 h-3 object-cover rounded-[2px] shrink-0 mr-1.5 inline-block border border-slate-200"
      />
    ),
  }));
};

// Helper to get state options based on selected country
export const getStateDropdownOptions = (countryName) => {
  if (!countryName) return [];
  const found = COUNTRIES_DATA.find(
    (c) => c.name.toLowerCase() === countryName.toLowerCase()
  );
  if (!found || !found.states) return [];
  return found.states.map((s) => ({
    label: s,
    value: s,
  }));
};

// Helper to get city options based on selected state
export const getCityDropdownOptions = (stateName) => {
  if (!stateName) return [];
  const found = CITIES_DATA[stateName];
  if (!found) {
    return [
      { label: `Main City (${stateName})`, value: `Main City (${stateName})` },
      { label: `Central ${stateName}`, value: `Central ${stateName}` }
    ];
  }
  return found.map((city) => ({
    label: city,
    value: city,
  }));
};

// Helper to get postal code for selected city
export const getPostalCodeForCity = (cityName) => {
  if (!cityName) return "";
  return POSTAL_CODES_DATA[cityName] || "400001";
};
