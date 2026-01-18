export interface FontOption {
  name: string;
  family: string;
  weights: number[];
  category: 'serif' | 'sans-serif';
}

export const SERIF_FONTS: FontOption[] = [
  { name: 'Playfair Display', family: 'Playfair Display', weights: [400, 700], category: 'serif' },
  { name: 'Alegreya', family: 'Alegreya', weights: [400, 700], category: 'serif' },
  { name: 'Merriweather', family: 'Merriweather', weights: [400, 700], category: 'serif' },
  { name: 'Lora', family: 'Lora', weights: [400, 700], category: 'serif' },
  { name: 'Crimson Text', family: 'Crimson Text', weights: [400, 700], category: 'serif' },
  { name: 'EB Garamond', family: 'EB Garamond', weights: [400, 700], category: 'serif' },
];

export const SANS_SERIF_FONTS: FontOption[] = [
  { name: 'Poppins', family: 'Poppins', weights: [400, 500, 700], category: 'sans-serif' },
  { name: 'Inter', family: 'Inter', weights: [300, 400, 500, 600, 700], category: 'sans-serif' },
  { name: 'Open Sans', family: 'Open Sans', weights: [400, 600, 700], category: 'sans-serif' },
  { name: 'Roboto', family: 'Roboto', weights: [400, 500, 700], category: 'sans-serif' },
  { name: 'Montserrat', family: 'Montserrat', weights: [400, 600, 700], category: 'sans-serif' },
];

export const DEFAULT_FONTS = {
  heading: 'Playfair Display',
  body: 'Poppins',
};
