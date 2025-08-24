export interface User {
  // Basic Info
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
  gender: string;
  address: string;
  mobile: string;
  role: string;

  // Plan & Subscription
  plan: string; // e.g., "basic", "premium"
  paymentMethod: string; // e.g., "card", "upi"
  autoRenew: boolean;
  privacy: boolean;
  terms: boolean;

  // Card Info
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;

  // Transport / Compliance
  dotNumber: string;
  mcNumber: string;
  suretyBond: File | null;
  insuranceProof?: File | null;

  // Extra
  additionalInfo: string;
}
