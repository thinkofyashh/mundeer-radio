export type Track = {
  id: string;
  title: string;
  artist: string;
  year: number;
  youtubeId: string;
  station: string;
  tint: string;
};

export const tracks: Track[] = [
  { id: "brown-rang", title: "Brown Rang", artist: "Yo Yo Honey Singh", year: 2011, youtubeId: "PqFMFVcCZgI", station: "punjabi", tint: "#bc6f39" },
  { id: "amplifier", title: "Amplifier", artist: "Imran Khan", year: 2009, youtubeId: "uuCFRaFWjwY", station: "punjabi", tint: "#aa5d36" },
  { id: "high-heels", title: "High Heels", artist: "Jaz Dhami ft. Yo Yo Honey Singh", year: 2012, youtubeId: "NbyHNASFi6U", station: "punjabi", tint: "#be7b32" },
  { id: "i-love-you", title: "I Love You", artist: "Ash King & Clinton Cerejo", year: 2011, youtubeId: "0JLRExeOH-k", station: "bollywood", tint: "#9e483e" },
  { id: "chammak-challo", title: "Chammak Challo", artist: "Akon & Hamsika Iyer", year: 2011, youtubeId: "tq1Iw_Tu4W4", station: "bollywood", tint: "#a94129" },
  { id: "raabta", title: "Raabta", artist: "Arijit Singh", year: 2012, youtubeId: "zlt38OOqwDc", station: "bollywood", tint: "#82443b" },
  { id: "sadda-haq", title: "Sadda Haq", artist: "Mohit Chauhan", year: 2011, youtubeId: "p9DQINKZxWE", station: "canteen", tint: "#6e6f4a" },
  { id: "kun-faya-kun", title: "Kun Faya Kun", artist: "A.R. Rahman, Javed Ali & Mohit Chauhan", year: 2011, youtubeId: "T94PHkuydcw", station: "canteen", tint: "#84603d" },
  { id: "ilahi", title: "Ilahi", artist: "Arijit Singh", year: 2013, youtubeId: "fdubeMFwuGs", station: "canteen", tint: "#647560" },
  { id: "tera-hone-laga", title: "Tera Hone Laga Hoon", artist: "Atif Aslam & Alisha Chinai", year: 2009, youtubeId: "tKmkMVaNu9g", station: "cyber", tint: "#5a6f72" },
  { id: "pani-da-rang", title: "Pani Da Rang", artist: "Ayushmann Khurrana", year: 2012, youtubeId: "EiItLWWxgOI", station: "bluetooth", tint: "#4d7474" },
  { id: "tum-hi-ho", title: "Tum Hi Ho", artist: "Arijit Singh", year: 2013, youtubeId: "UN5nLlN0aD4", station: "sad", tint: "#4b5262" },
  { id: "phir-mohabbat", title: "Phir Mohabbat", artist: "Mohammed Irfan, Arijit Singh & Saim Bhat", year: 2011, youtubeId: "udxUdBpcbpA", station: "sad", tint: "#524c62" },
  { id: "journey-song", title: "Aao Milo Chalo", artist: "Shaan & Ustad Sultan Khan", year: 2007, youtubeId: "Hd2DraYgHB4", station: "road", tint: "#8b673e" },
  { id: "khaabon-ke-parinday", title: "Khaabon Ke Parinday", artist: "Alyssa Mendonsa & Mohit Chauhan", year: 2011, youtubeId: "R0XjwtP_iTY", station: "road", tint: "#5a7180" },
];

export const tracksForStation = (stationId: string) =>
  tracks.filter((track) => track.station === stationId);
