export type Station = {
  id: string;
  frequency: number;
  name: string;
  tagline: string;
};

export const stations: Station[] = [
  { id: "punjabi", frequency: 91.1, name: "Punjabi 2011", tagline: "Bass from the back bench" },
  { id: "bollywood", frequency: 93.5, name: "Bollywood Nights", tagline: "The last show at PVR" },
  { id: "canteen", frequency: 95.0, name: "College Canteen", tagline: "One chai, four friends" },
  { id: "cyber", frequency: 98.3, name: "Cyber Café", tagline: "47 KB/s and holding" },
  { id: "bluetooth", frequency: 101.2, name: "Bluetooth Era", tagline: "Keep phones close" },
  { id: "sad", frequency: 104.0, name: "Sad Hours", tagline: "Earphones in. Lights out." },
  { id: "road", frequency: 106.4, name: "Road Trip", tagline: "Petrol for ₹67" },
];
