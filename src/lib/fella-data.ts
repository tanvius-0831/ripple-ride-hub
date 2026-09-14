// FellaFlow — SIMULATED DEMO DATA ONLY.
// Community: Northbridge Institute of Technology, Bengaluru.
// No real people, no real telemetry. Everything here is fabricated for the prototype.

export const COMMUNITY = {
  name: "Northbridge Institute of Technology",
  city: "Bengaluru",
  profiles: 128,
  potentialDrivers: 14,
  potentialPassengers: 52,
  potentialConnectors: 8,
  availableSeats: 38,
  healthScore: 78,
};

export type Vehicle = {
  type: "Hatchback" | "Sedan" | "SUV" | "Scooter" | "MPV";
  model: string;
  capacity: number;
  availableSeats: number;
  wheelchairAccessible: boolean;
  stepFreeEntry: boolean;
  extraLuggageSpace: boolean;
};

export type AccessibilityNeed =
  | "Wheelchair accessible"
  | "Mobility assistance"
  | "Step-free access"
  | "Extra boarding time"
  | "Visual assistance"
  | "Hearing assistance"
  | "No additional assistance required";

export type HealthNeed =
  | "Medication timing"
  | "Allergy alert"
  | "Emergency support requirement"
  | "Chronic condition support"
  | "No health-related support needed";

export type EmergencyContact = { name: string; relationship: string };

export type ScoreBreakdown = {
  route: number;
  timing: number;
  capacity: number;
  accessibility: number;
  preference: number;
};

export const ACCESSIBILITY_OPTIONS: AccessibilityNeed[] = [
  "Wheelchair accessible",
  "Mobility assistance",
  "Step-free access",
  "Extra boarding time",
  "Visual assistance",
  "Hearing assistance",
];

export type Ride = {
  id: string;
  driver: string;
  gender: "female" | "male";
  role: "Driver" | "Passenger" | "Connector";
  origin: string;
  via?: string;
  destination: string;
  departure: string;
  compatibility: number;
  vehicle: Vehicle;
  womenOnly: boolean;
  womenOnlyAvailable: boolean;
  audioAvailable: boolean;
  verified: boolean;
  signals: string[];
  impactScore: number;
  reason: string;
  passengers: { name: string; gender: "female" | "male" }[];
};

export const RIDES: Ride[] = [
  {
    id: "aarav",
    driver: "Aarav",
    gender: "male",
    role: "Driver",
    origin: "Whitefield",
    via: "Marathahalli",
    destination: "Northbridge Institute of Technology",
    departure: "8:10 AM",
    compatibility: 92,
    vehicle: { type: "Hatchback", model: "Hyundai i20", capacity: 5, availableSeats: 3 },
    womenOnly: false,
    womenOnlyAvailable: true,
    audioAvailable: true,
    verified: true,
    signals: ["Route match", "Time match", "Community match"],
    impactScore: 94,
    reason: "High route overlap + high seat capacity + peak-time travel",
    passengers: [
      { name: "Ishan", gender: "male" },
      { name: "Sneha", gender: "female" },
      { name: "Kabir", gender: "male" },
      { name: "Ananya", gender: "female" },
    ],
  },
  {
    id: "meera",
    driver: "Meera",
    gender: "female",
    role: "Driver",
    origin: "Indiranagar",
    via: "Domlur",
    destination: "Northbridge Institute of Technology",
    departure: "8:25 AM",
    compatibility: 88,
    vehicle: { type: "Sedan", model: "Honda City", capacity: 5, availableSeats: 2 },
    womenOnly: true,
    womenOnlyAvailable: true,
    audioAvailable: true,
    verified: true,
    signals: ["Route match", "Time match", "Hostel cluster match"],
    impactScore: 91,
    reason: "Anchors the women-only cluster + reliable peak-hour departure",
    passengers: [
      { name: "Divya", gender: "female" },
      { name: "Priya", gender: "female" },
      { name: "Rehan", gender: "male" },
    ],
  },
  {
    id: "rohan",
    driver: "Rohan",
    gender: "male",
    role: "Driver",
    origin: "Bellandur",
    via: "Kadubeesanahalli",
    destination: "Northbridge Institute of Technology",
    departure: "8:40 AM",
    compatibility: 84,
    vehicle: { type: "SUV", model: "Tata Nexon", capacity: 5, availableSeats: 3 },
    womenOnly: false,
    womenOnlyAvailable: true,
    audioAvailable: true,
    verified: true,
    signals: ["Route match", "Department match", "Community match"],
    impactScore: 87,
    reason: "Bridges two disconnected residential clusters",
    passengers: [
      { name: "Vikram", gender: "male" },
      { name: "Tanvi", gender: "female" },
      { name: "Arjun", gender: "male" },
    ],
  },
  {
    id: "nisha",
    driver: "Nisha",
    gender: "female",
    role: "Driver",
    origin: "HSR Layout",
    via: "Agara",
    destination: "Northbridge Institute of Technology",
    departure: "8:05 AM",
    compatibility: 79,
    vehicle: { type: "Hatchback", model: "Maruti Baleno", capacity: 5, availableSeats: 2 },
    womenOnly: true,
    womenOnlyAvailable: true,
    audioAvailable: true,
    verified: true,
    signals: ["Time match", "Community match"],
    impactScore: 82,
    reason: "Earliest departure covering the southern corridor",
    passengers: [
      { name: "Pooja", gender: "female" },
      { name: "Lakshmi", gender: "female" },
    ],
  },
  {
    id: "devika",
    driver: "Devika",
    gender: "female",
    role: "Connector",
    origin: "Koramangala",
    via: "Sarjapur Road",
    destination: "Northbridge Institute of Technology",
    departure: "8:30 AM",
    compatibility: 76,
    vehicle: { type: "MPV", model: "Maruti Ertiga", capacity: 7, availableSeats: 4 },
    womenOnly: false,
    womenOnlyAvailable: true,
    audioAvailable: true,
    verified: true,
    signals: ["Route match", "Club overlap"],
    impactScore: 85,
    reason: "Largest seat capacity + connects 3 friend circles",
    passengers: [
      { name: "Rahul", gender: "male" },
      { name: "Sara", gender: "female" },
      { name: "Nikhil", gender: "male" },
      { name: "Zoya", gender: "female" },
    ],
  },
];

export const CAPACITY_DISTRIBUTION = [
  { label: "4-seater", vehicles: 4 },
  { label: "5-seater", vehicles: 9 },
  { label: "6+ seater", vehicles: 2 },
];

export const SAFETY_STATS = {
  safetyEnabledRides: 31,
  womenOnlyEligible: 12,
  audioEnabled: 24,
};

export const BOTTLENECKS = [
  {
    key: "Driver shortage",
    severity: 86,
    status: "critical" as const,
    detail: "14 potential drivers against 52 potential passengers in the morning window.",
  },
  {
    key: "Insufficient seating capacity",
    severity: 81,
    status: "critical" as const,
    detail: "38 available seats cannot absorb 52 passengers at 8:00–8:30 AM.",
  },
  {
    key: "Route mismatch",
    severity: 42,
    status: "moderate" as const,
    detail: "Whitefield corridor is dense; northern cluster has thin overlap.",
  },
  {
    key: "Time mismatch",
    severity: 34,
    status: "moderate" as const,
    detail: "Lab batches at 9:30 AM sit outside the main departure peak.",
  },
  {
    key: "Passenger shortage",
    severity: 11,
    status: "healthy" as const,
    detail: "Demand is not the constraint in this community.",
  },
];

export const RIPPLE_STAGES = [
  { label: "Cold start", users: 0, seats: 0, connections: 0, opportunities: 0, referrals: 0 },
  { label: "3 seed drivers", users: 3, seats: 8, connections: 4, opportunities: 1, referrals: 0 },
  { label: "Connections form", users: 7, seats: 8, connections: 11, opportunities: 3, referrals: 4 },
  { label: "First rides", users: 12, seats: 14, connections: 18, opportunities: 5, referrals: 9 },
  { label: "Referral wave", users: 21, seats: 26, connections: 34, opportunities: 9, referrals: 14 },
  { label: "Network activated", users: 28, seats: 38, connections: 47, opportunities: 13, referrals: 14 },
];

export const GROWTH_SERIES = [
  { week: "W1", participants: 3, rides: 1, seats: 8 },
  { week: "W2", participants: 7, rides: 3, seats: 12 },
  { week: "W3", participants: 12, rides: 5, seats: 18 },
  { week: "W4", participants: 18, rides: 8, seats: 24 },
  { week: "W5", participants: 24, rides: 11, seats: 32 },
  { week: "W6", participants: 28, rides: 13, seats: 38 },
];

export const DISCLAIMER =
  "FellaFlow uses consent-based safety features. Location and audio features require participant permission. Demo uses simulated community data.";
