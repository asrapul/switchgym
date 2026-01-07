// Motivational gym quotes with unique font styles

export interface MotivationalQuote {
  text: string;
  author?: string;
  fontFamily: string;
  fontWeight: string;
  letterSpacing?: string;
  textTransform?: string;
}

export const gymQuotes: MotivationalQuote[] = [
  {
    text: "The only bad workout is the one that didn't happen.",
    author: "Unknown",
    fontFamily: "'Bebas Neue', sans-serif",
    fontWeight: "400",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  {
    text: "Pain is temporary. Quitting lasts forever.",
    author: "Lance Armstrong",
    fontFamily: "'Oswald', sans-serif",
    fontWeight: "700",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  {
    text: "Your body can stand almost anything. It's your mind that you have to convince.",
    fontFamily: "'Playfair Display', serif",
    fontWeight: "600",
    letterSpacing: "0.5px",
  },
  {
    text: "The pain you feel today will be the strength you feel tomorrow.",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: "800",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  {
    text: "Don't limit your challenges. Challenge your limits.",
    fontFamily: "'Raleway', sans-serif",
    fontWeight: "700",
    letterSpacing: "3px",
    textTransform: "uppercase",
  },
  {
    text: "Sweat is just fat crying.",
    fontFamily: "'Anton', sans-serif",
    fontWeight: "400",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  {
    text: "The harder you work, the luckier you get.",
    author: "Gary Player",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "600",
    letterSpacing: "0.5px",
  },
  {
    text: "Success starts with self-discipline.",
    fontFamily: "'Roboto Condensed', sans-serif",
    fontWeight: "700",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  {
    text: "Wake up. Work out. Look hot. Kick ass.",
    fontFamily: "'Teko', sans-serif",
    fontWeight: "600",
    letterSpacing: "3px",
    textTransform: "uppercase",
  },
  {
    text: "Sore today. Strong tomorrow.",
    fontFamily: "'Russo One', sans-serif",
    fontWeight: "400",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  {
    text: "A one hour workout is 4% of your day. No excuses.",
    fontFamily: "'Archivo Black', sans-serif",
    fontWeight: "400",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  {
    text: "Be stronger than your excuses.",
    fontFamily: "'Staatliches', sans-serif",
    fontWeight: "400",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  {
    text: "The body achieves what the mind believes.",
    fontFamily: "'Lora', serif",
    fontWeight: "700",
    letterSpacing: "0.5px",
  },
  {
    text: "Train insane or remain the same.",
    fontFamily: "'Black Ops One', sans-serif",
    fontWeight: "400",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  {
    text: "Go the extra mile. It's never crowded.",
    author: "Wayne Dyer",
    fontFamily: "'Abril Fatface', serif",
    fontWeight: "400",
    letterSpacing: "0.5px",
  },
  {
    text: "Your only limit is you.",
    fontFamily: "'Righteous', sans-serif",
    fontWeight: "400",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  {
    text: "Fall in love with taking care of yourself.",
    fontFamily: "'Quicksand', sans-serif",
    fontWeight: "700",
    letterSpacing: "1px",
  },
  {
    text: "No pain, no gain. Shut up and train.",
    fontFamily: "'Saira Stencil One', sans-serif",
    fontWeight: "400",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  {
    text: "The gym is my therapy.",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: "700",
    letterSpacing: "3px",
    textTransform: "uppercase",
  },
  {
    text: "Discipline is doing what needs to be done, even if you don't want to.",
    fontFamily: "'Source Serif Pro', serif",
    fontWeight: "600",
    letterSpacing: "0.3px",
  },
  {
    text: "Champions train. Losers complain.",
    fontFamily: "'Bungee', sans-serif",
    fontWeight: "400",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  {
    text: "Make yourself proud.",
    fontFamily: "'Cinzel', serif",
    fontWeight: "700",
    letterSpacing: "4px",
    textTransform: "uppercase",
  },
  {
    text: "Hustle for that muscle.",
    fontFamily: "'Bangers', sans-serif",
    fontWeight: "400",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  {
    text: "Every champion was once a contender that refused to give up.",
    author: "Rocky Balboa",
    fontFamily: "'Merriweather', serif",
    fontWeight: "700",
    letterSpacing: "0.5px",
  },
  {
    text: "Excuses don't burn calories.",
    fontFamily: "'Passion One', sans-serif",
    fontWeight: "400",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  {
    text: "Today's pain is tomorrow's power.",
    fontFamily: "'Fjalla One', sans-serif",
    fontWeight: "400",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  {
    text: "Strong is the new sexy.",
    fontFamily: "'Alfa Slab One', serif",
    fontWeight: "400",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  {
    text: "Don't stop until you're proud.",
    fontFamily: "'Bitter', serif",
    fontWeight: "700",
    letterSpacing: "0.5px",
  },
  {
    text: "Dream. Believe. Achieve.",
    fontFamily: "'Orbitron', sans-serif",
    fontWeight: "700",
    letterSpacing: "4px",
    textTransform: "uppercase",
  },
  {
    text: "Blood, sweat, and respect. First two you give, last one you earn.",
    author: "The Rock",
    fontFamily: "'Permanent Marker', cursive",
    fontWeight: "400",
    letterSpacing: "0.5px",
  },
];

// Get quote based on current hour - changes every hour
export function getHourlyQuote(): MotivationalQuote {
  const now = new Date();
  const hourOfYear = now.getMonth() * 744 + now.getDate() * 24 + now.getHours();
  const quoteIndex = hourOfYear % gymQuotes.length;
  return gymQuotes[quoteIndex];
}

// Get Google Fonts import URL for all unique fonts
export function getGoogleFontsUrl(): string {
  const fonts = [
    "Bebas+Neue",
    "Oswald:wght@700",
    "Playfair+Display:wght@600",
    "Montserrat:wght@800",
    "Raleway:wght@700",
    "Anton",
    "Poppins:wght@600",
    "Roboto+Condensed:wght@700",
    "Teko:wght@600",
    "Russo+One",
    "Archivo+Black",
    "Staatliches",
    "Lora:wght@700",
    "Black+Ops+One",
    "Abril+Fatface",
    "Righteous",
    "Quicksand:wght@700",
    "Saira+Stencil+One",
    "Barlow+Condensed:wght@700",
    "Source+Serif+Pro:wght@600",
    "Bungee",
    "Cinzel:wght@700",
    "Bangers",
    "Merriweather:wght@700",
    "Passion+One",
    "Fjalla+One",
    "Alfa+Slab+One",
    "Bitter:wght@700",
    "Orbitron:wght@700",
    "Permanent+Marker",
  ];

  return `https://fonts.googleapis.com/css2?family=${fonts.join("&family=")}&display=swap`;
}
