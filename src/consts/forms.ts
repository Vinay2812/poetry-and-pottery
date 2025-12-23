export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Chandigarh",
  "Puducherry",
] as const;

export type IndianState = (typeof INDIAN_STATES)[number];

export const CONTACT_SUBJECT_OPTIONS: { value: string; label: string }[] = [
  { value: "products", label: "Product Inquiry" },
  { value: "workshops", label: "Workshop Question" },
  { value: "custom", label: "Custom Order" },
  { value: "wholesale", label: "Wholesale Inquiry" },
  { value: "other", label: "Other" },
];

export type ContactSubject =
  | "products"
  | "workshops"
  | "custom"
  | "wholesale"
  | "other";
