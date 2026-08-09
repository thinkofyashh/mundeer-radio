export type Station = {
  id: string;
  frequency: number;
  name: string;
  tagline: string;
};

export const stations: Station[] = [
  { id: "mundeer", frequency: 91.1, name: "Mundeer Radio", tagline: "Every OG song, one frequency" },
];
