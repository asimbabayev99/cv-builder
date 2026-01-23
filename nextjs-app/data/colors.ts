export interface ColorOption {
  color: string;
  label: string;
  itemId: string;
}

export interface ColorGroup {
  mainColor: ColorOption;
  subColors: ColorOption[];
}

export const COLORS_DATA: ColorGroup[] = [
  {
    mainColor: { color: "#FFFFFF", label: "White", itemId: "main-white" },
    subColors: []
  },
  {
    mainColor: { color: "#929496", label: "Aluminium", itemId: "main-0" },
    subColors: [
      { color: "#AE9B93", label: "Cedrus", itemId: "sub-0-0" },
      { color: "#C4B08F", label: "Camel", itemId: "sub-0-1" }
    ]
  },
  {
    mainColor: { color: "#944150", label: "Bordeaux", itemId: "main-1" },
    subColors: [
      { color: "#B41C2E", label: "Cardinal", itemId: "sub-1-0" },
      { color: "#CF142B", label: "Fire Engine", itemId: "sub-1-1" }
    ]
  },
  {
    mainColor: { color: "#B9481F", label: "Terracotta", itemId: "main-2" },
    subColors: [
      { color: "#C9652D", label: "Nasturtium", itemId: "sub-2-0" },
      { color: "#C97375", label: "Ambrose", itemId: "sub-2-1" }
    ]
  },
  {
    mainColor: { color: "#C28E56", label: "Ochre", itemId: "main-3" },
    subColors: [
      { color: "#E8A509", label: "Luteum", itemId: "sub-3-0" },
      { color: "#F2C000", label: "Tuscan Sun", itemId: "sub-3-1" }
    ]
  },
  {
    mainColor: { color: "#166C60", label: "Castleton", itemId: "main-4" },
    subColors: [
      { color: "#008E6E", label: "Persian Green", itemId: "sub-4-0" },
      { color: "#56B239", label: "Shamrock", itemId: "sub-4-1" }
    ]
  },
  {
    mainColor: { color: "#496267", label: "Smalt Blue", itemId: "main-5" },
    subColors: [
      { color: "#027D89", label: "Ocean", itemId: "sub-5-0" },
      { color: "#00B0C5", label: "Central Coast", itemId: "sub-5-1" }
    ]
  },
  {
    mainColor: { color: "#102A73", label: "Ink Blue", itemId: "main-6" },
    subColors: [
      { color: "#0069A5", label: "Cobalt", itemId: "sub-6-0" },
      { color: "#009CCC", label: "Azure", itemId: "sub-6-1" }
    ]
  },
  {
    mainColor: { color: "#4A4A4A", label: "Lead", itemId: "main-7" },
    subColors: [
      { color: "#2A5978", label: "Blumine", itemId: "sub-7-0" },
      { color: "#576C7C", label: "Slate", itemId: "sub-7-1" }
    ]
  }
];

export const DEFAULT_COLOR = COLORS_DATA[5].mainColor; // Smalt Blue
