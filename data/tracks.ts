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
  { id: "brown-rang", title: "Brown Rang", artist: "Yo Yo Honey Singh", year: 2011, youtubeId: "PqFMFVcCZgI", station: "mundeer", tint: "#bc6f39" },
  { id: "amplifier", title: "Amplifier", artist: "Imran Khan", year: 2009, youtubeId: "uuCFRaFWjwY", station: "mundeer", tint: "#aa5d36" },
  { id: "high-heels", title: "High Heels", artist: "Jaz Dhami ft. Yo Yo Honey Singh", year: 2012, youtubeId: "NbyHNASFi6U", station: "mundeer", tint: "#be7b32" },
  { id: "i-love-you", title: "I Love You", artist: "Ash King & Clinton Cerejo", year: 2011, youtubeId: "0JLRExeOH-k", station: "mundeer", tint: "#9e483e" },
  { id: "chammak-challo", title: "Chammak Challo", artist: "Akon & Hamsika Iyer", year: 2011, youtubeId: "tq1Iw_Tu4W4", station: "mundeer", tint: "#a94129" },
  { id: "raabta", title: "Raabta", artist: "Arijit Singh", year: 2012, youtubeId: "zlt38OOqwDc", station: "mundeer", tint: "#82443b" },
  { id: "sadda-haq", title: "Sadda Haq", artist: "Mohit Chauhan", year: 2011, youtubeId: "p9DQINKZxWE", station: "mundeer", tint: "#6e6f4a" },
  { id: "kun-faya-kun", title: "Kun Faya Kun", artist: "A.R. Rahman, Javed Ali & Mohit Chauhan", year: 2011, youtubeId: "T94PHkuydcw", station: "mundeer", tint: "#84603d" },
  { id: "ilahi", title: "Ilahi", artist: "Arijit Singh", year: 2013, youtubeId: "fdubeMFwuGs", station: "mundeer", tint: "#647560" },
  { id: "tera-hone-laga", title: "Tera Hone Laga Hoon", artist: "Atif Aslam & Alisha Chinai", year: 2009, youtubeId: "tKmkMVaNu9g", station: "mundeer", tint: "#5a6f72" },
  { id: "pani-da-rang", title: "Pani Da Rang", artist: "Ayushmann Khurrana", year: 2012, youtubeId: "EiItLWWxgOI", station: "mundeer", tint: "#4d7474" },
  { id: "tum-hi-ho", title: "Tum Hi Ho", artist: "Arijit Singh", year: 2013, youtubeId: "UN5nLlN0aD4", station: "mundeer", tint: "#4b5262" },
  { id: "phir-mohabbat", title: "Phir Mohabbat", artist: "Mohammed Irfan, Arijit Singh & Saim Bhat", year: 2011, youtubeId: "udxUdBpcbpA", station: "mundeer", tint: "#524c62" },
  { id: "journey-song", title: "Aao Milo Chalo", artist: "Shaan & Ustad Sultan Khan", year: 2007, youtubeId: "Hd2DraYgHB4", station: "mundeer", tint: "#8b673e" },
  { id: "khaabon-ke-parinday", title: "Khaabon Ke Parinday", artist: "Alyssa Mendonsa & Mohit Chauhan", year: 2011, youtubeId: "R0XjwtP_iTY", station: "mundeer", tint: "#5a7180" },
];

export const tracksForStation = (stationId: string) =>
  tracks.filter((track) => track.station === stationId);
