export const registerFormControls = [
  {
    name: "userName",
    label: "Username",
    placeholder: "Enter your username",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "necklaces", label: "Necklaces" },
      { id: "rings", label: "Rings" },
      { id: "earrings", label: "Earrings" },
      { id: "bracelets", label: "Bracelets" },
      { id: "anklets", label: "Anklets" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
  {
    label: "Allow Personalization",
    header: "Personalization",
    name: "isPersonalizable",
    componentType: "checkbox",
  },
  {
    label: "Product has color/size variants",
    header: "Variants",
    name: "hasVariants",
    componentType: "checkbox",
  },
  // {
  //   label: "Personalization Prompt",
  //   name: "personalizationLabel",
  //   componentType: "input",
  //   type: "text",
  //   placeholder: "e.g., Enter name for engraving",
  //   showIf: "isPersonalizable", // Conditional field
  // },
  // {
  //   label: "Maximum Characters",
  //   name: "personalizationMaxLength",
  //   componentType: "input",
  //   type: "number",
  //   placeholder: "50",
  //   showIf: "isPersonalizable", // Conditional field
  // },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "about",
    label: "About Us",
    path: "/shop/about",
  },
  {
    id: "products",
    label: "Products",
    path: "/shop/listing",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing?category=men",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing?category=women",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing?category=kids",
  },
  {
    id: "faq",
    label: "FAQs",
    path: "/shop/faqs",
  },
];

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "necklaces", label: "Necklaces" },
    { id: "rings", label: "Rings" },
    { id: "earrings", label: "Earrings" },
    { id: "bracelets", label: "Bracelets" },
    { id: "anklets", label: "Anklets" },
  ],
  // brand: [
  //   { id: "nike", label: "Nike" },
  //   { id: "adidas", label: "Adidas" },
  //   { id: "puma", label: "Puma" },
  //   { id: "levi", label: "Levi's" },
  //   { id: "zara", label: "Zara" },
  //   { id: "h&m", label: "H&M" },
  // ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "zipcode",
    name: "zipcode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your zipcode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];

export const faqs = [
  {
    question: "What if my payment doesn't work?",
    answer:
      "First, make sure your information is correct and all required fields are filled. Try another payment method or check your network. If issues persist, reach out to us and we'll help.",
  },
  {
    question: "How long will it take my jewelry to arrive?",
    answer:
      "Delivery within Lagos takes 1–3 days. Nationwide delivery typically takes 3–7 business days.",
  },
  {
    question: "Where in the world do you ship to?",
    answer:
      "We ship locally and internationally. Shipping fees vary depending on destination.",
  },
  {
    question: "How do I track my delivery?",
    answer:
      "Once your order ships, a tracking link will be sent to your email or phone number.",
  },
  {
    question: "How much does shipping cost?",
    answer:
      "Shipping fees depend on your location and are shown at checkout before payment.",
  },
];

export const nigeriaStatesShipping = [
  { state: "Abia", price: 5000 },
  { state: "Adamawa", price: 5800 },
  { state: "Akwa Ibom", price: 6000 },
  { state: "Anambra", price: 5000 },
  { state: "Bauchi", price: 5800 },
  { state: "Bayelsa", price: 5800 },
  { state: "Benue", price: 5800 },
  { state: "Borno", price: 5800 },
  { state: "Cross River", price: 6000 },
  { state: "Delta", price: 5800 },
  { state: "Ebonyi", price: 5800},
  { state: "Edo", price: 5000 },
  { state: "Ekiti", price: 4000 },
  { state: "Enugu", price: 5000 },
  { state: "FCT", price: 5500 },
  { state: "Gombe", price: 5800 },
  { state: "Imo", price: 5000 },
  { state: "Jigawa", price: 5800 },
  { state: "Kaduna", price: 5800 },
  { state: "Kano", price: 5800 },
  { state: "Katsina", price: 5800 },
  { state: "Kebbi", price: 5800 },
  { state: "Kogi", price: 5800 },
  { state: "Kwara", price: 5000 },
  { state: "Lagos", price: 2500 },
  { state: "Nasarawa", price: 5800 },
  { state: "Niger", price: 5800 },
  { state: "Ogun", price: 4000},
  { state: "Ondo", price: 4000 },
  { state: "Osun", price: 4000 },
  { state: "Oyo", price: 4000 },
  { state: "Plateau", price: 5800 },
  { state: "Rivers", price: 5000 },
  { state: "Sokoto", price: 5800 },
  { state: "Taraba", price: 5800 },
  { state: "Yobe", price: 5800 },
  { state: "Zamfara", price: 5800 },
];

export const holidays = [
  { date: "01-01", message: "Happy New Year!" },
  {
    date: "02-14",
    message: "Happy Valentine's Day!",
  },
  {
    date: "03-08",
    message: "Happy Women's Day!",
  },
  {
    date: "05-01",
    message: "Happy Workers' Day!",
  },
  {
    date: "10-05",
    message: "Happy Teachers' Day!",
  },
  { date: "12-25", message: "Merry Christmas!" },
];


// export const lagosShippingZones = [
//   {
//     id: "mainland-a",
//     name: "MAINLAND A",
//     price: 2500,
//     areas: [
//       "Surulere",
//       "Costain",
//       "Ojuelegba",
//       "Mushin",
//       "Palmgrove",
//       "Yaba",
//       "Bariga",
//       "Gbagada",
//       "Ajao Estate",
//       "Oshodi",
//       "Ikeja",
//       "Ojota",
//       "Ogudu",
//       "Oworonshoki",
//       "Somolu",
//       "Ikosi-Ketu",
//       "Alapere",
//     ],
//   },
//   {
//     id: "mainland-b",
//     name: "MAINLAND B",
//     price: 3000,
//     areas: [
//       "Ogba",
//       "Magodo 1",
//       "Magodo 2",
//       "Omole Phase 1",
//       "Omole Phase 2",
//       "Ojodu Berger",
//       "Fagba",
//       "Iju-Ishaga",
//     ],
//   },
//   {
//     id: "mainland-c",
//     name: "MAINLAND C",
//     price: 3500,
//     areas: [
//       "Orile",
//       "Amuwo Odofin",
//       "Festac",
//       "Alakija",
//       "Satellite",
//       "Apapa",
//       "Navy Town",
//       "Mile 2",
//       "Isolo",
//       "Ago Palace",
//     ],
//   },
//   {
//     id: "mainland-d",
//     name: "MAINLAND D",
//     price: 3500,
//     areas: ["Egbeda", "Idimu", "Igando", "Ayobo", "Aboru", "Ipaja", "Baruwa"],
//   },
//   {
//     id: "mainland-e",
//     name: "MAINLAND E",
//     price: 4000,
//     areas: ["Ijegun", "Jakande", "Oke Afa", "Ikotun"],
//   },
//   {
//     id: "mainland-f",
//     name: "MAINLAND F",
//     price: 4000,
//     areas: ["Abulegba", "Agege", "Ijaiye", "Ojokoro", "Alakuko", "Alagbado"],
//   },
//   {
//     id: "mainland-g",
//     name: "MAINLAND G",
//     price: 4500,
//     areas: ["Lasu", "Iba", "Ishashi", "Obadore"],
//   },
//   {
//     id: "island-a",
//     name: "ISLAND A",
//     price: 3000,
//     areas: [
//       "Ikoyi",
//       "Victoria Island",
//       "Banana Island",
//       "Obalende",
//       "Parkview Estate",
//       "Marina",
//     ],
//   },
//   {
//     id: "island-b",
//     name: "ISLAND B",
//     price: 3500,
//     areas: [
//       "Lekki Phase 1",
//       "Ikate",
//       "Jakande",
//       "Osapa London",
//       "Agungi",
//       "Ologolo",
//       "Marwa",
//       "Oniru",
//     ],
//   },
//   {
//     id: "island-c",
//     name: "ISLAND C",
//     price: 4000,
//     areas: [
//       "Ikota",
//       "Chevron",
//       "VGC",
//       "Ajah",
//       "Sangotedo",
//       "Badore",
//       "Lekki Gardens Phase 2",
//       "Abraham Adesanya",
//       "LBS",
//       "Addo Road",
//       "Ogombo",
//       "Ilaje",
//       "Orchid Road",
//       "Langbasa",
//     ],
//   },
// ];