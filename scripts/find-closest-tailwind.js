#!/usr/bin/env bun
import { oklch, formatHex, differenceEuclidean } from 'culori';

// Tailwind CSS v4 default colors in OKLCH
const tailwindColors = {
  // Slate
  'slate-50': { l: 0.984, c: 0.003, h: 247.858 },
  'slate-100': { l: 0.968, c: 0.007, h: 247.896 },
  'slate-200': { l: 0.929, c: 0.013, h: 255.508 },
  'slate-300': { l: 0.869, c: 0.018, h: 252.943 },
  'slate-400': { l: 0.651, c: 0.027, h: 256.788 },
  'slate-500': { l: 0.503, c: 0.033, h: 257.417 },
  'slate-600': { l: 0.406, c: 0.034, h: 256.065 },
  'slate-700': { l: 0.372, c: 0.044, h: 257.287 },
  'slate-800': { l: 0.279, c: 0.041, h: 260.031 },
  'slate-900': { l: 0.208, c: 0.042, h: 265.755 },
  'slate-950': { l: 0.129, c: 0.042, h: 264.695 },
  
  // Gray
  'gray-50': { l: 0.985, c: 0.000, h: 0 },
  'gray-100': { l: 0.967, c: 0.001, h: 264.542 },
  'gray-200': { l: 0.922, c: 0.004, h: 286.375 },
  'gray-300': { l: 0.872, c: 0.010, h: 258.338 },
  'gray-400': { l: 0.682, c: 0.015, h: 256.066 },
  'gray-500': { l: 0.516, c: 0.016, h: 257.814 },
  'gray-600': { l: 0.424, c: 0.015, h: 256.802 },
  'gray-700': { l: 0.369, c: 0.015, h: 264.364 },
  'gray-800': { l: 0.279, c: 0.013, h: 260.754 },
  'gray-900': { l: 0.205, c: 0.013, h: 286.283 },
  'gray-950': { l: 0.130, c: 0.011, h: 285.938 },
  
  // Red
  'red-50': { l: 0.971, c: 0.013, h: 17.38 },
  'red-100': { l: 0.945, c: 0.028, h: 17.917 },
  'red-200': { l: 0.898, c: 0.059, h: 18.696 },
  'red-300': { l: 0.829, c: 0.111, h: 19.665 },
  'red-400': { l: 0.732, c: 0.175, h: 22.216 },
  'red-500': { l: 0.637, c: 0.237, h: 25.331 },
  'red-600': { l: 0.549, c: 0.246, h: 27.325 },
  'red-700': { l: 0.464, c: 0.215, h: 27.505 },
  'red-800': { l: 0.398, c: 0.177, h: 27.372 },
  'red-900': { l: 0.358, c: 0.140, h: 28.901 },
  'red-950': { l: 0.229, c: 0.093, h: 25.723 },
  
  // Orange
  'orange-50': { l: 0.980, c: 0.016, h: 78.884 },
  'orange-100': { l: 0.955, c: 0.038, h: 73.551 },
  'orange-200': { l: 0.902, c: 0.079, h: 69.028 },
  'orange-300': { l: 0.840, c: 0.130, h: 62.882 },
  'orange-400': { l: 0.768, c: 0.170, h: 55.338 },
  'orange-500': { l: 0.705, c: 0.185, h: 48.718 },
  'orange-600': { l: 0.627, c: 0.183, h: 41.656 },
  'orange-700': { l: 0.522, c: 0.152, h: 37.484 },
  'orange-800': { l: 0.437, c: 0.119, h: 36.299 },
  'orange-900': { l: 0.380, c: 0.090, h: 38.581 },
  'orange-950': { l: 0.257, c: 0.056, h: 36.868 },
  
  // Amber
  'amber-50': { l: 0.987, c: 0.018, h: 94.434 },
  'amber-100': { l: 0.969, c: 0.048, h: 92.383 },
  'amber-200': { l: 0.932, c: 0.093, h: 89.416 },
  'amber-300': { l: 0.888, c: 0.137, h: 86.155 },
  'amber-400': { l: 0.847, c: 0.169, h: 81.841 },
  'amber-500': { l: 0.788, c: 0.171, h: 72.215 },
  'amber-600': { l: 0.681, c: 0.162, h: 58.421 },
  'amber-700': { l: 0.563, c: 0.139, h: 48.998 },
  'amber-800': { l: 0.478, c: 0.113, h: 45.29 },
  'amber-900': { l: 0.414, c: 0.090, h: 44.683 },
  'amber-950': { l: 0.290, c: 0.058, h: 41.193 },
  
  // Yellow
  'yellow-50': { l: 0.987, c: 0.026, h: 102.212 },
  'yellow-100': { l: 0.972, c: 0.064, h: 99.574 },
  'yellow-200': { l: 0.945, c: 0.125, h: 96.86 },
  'yellow-300': { l: 0.905, c: 0.182, h: 98.111 },
  'yellow-400': { l: 0.852, c: 0.199, h: 91.936 },
  'yellow-500': { l: 0.778, c: 0.176, h: 82.605 },
  'yellow-600': { l: 0.664, c: 0.149, h: 70.459 },
  'yellow-700': { l: 0.531, c: 0.121, h: 60.562 },
  'yellow-800': { l: 0.453, c: 0.098, h: 54.677 },
  'yellow-900': { l: 0.398, c: 0.078, h: 51.244 },
  'yellow-950': { l: 0.285, c: 0.051, h: 47.997 },
  
  // Lime
  'lime-50': { l: 0.986, c: 0.031, h: 120.757 },
  'lime-100': { l: 0.970, c: 0.070, h: 122.102 },
  'lime-200': { l: 0.941, c: 0.138, h: 124.321 },
  'lime-300': { l: 0.902, c: 0.204, h: 127.079 },
  'lime-400': { l: 0.851, c: 0.239, h: 130.429 },
  'lime-500': { l: 0.768, c: 0.233, h: 131.684 },
  'lime-600': { l: 0.644, c: 0.197, h: 131.684 },
  'lime-700': { l: 0.518, c: 0.151, h: 130.85 },
  'lime-800': { l: 0.431, c: 0.118, h: 129.163 },
  'lime-900': { l: 0.383, c: 0.094, h: 127.723 },
  'lime-950': { l: 0.265, c: 0.065, h: 128.207 },
  
  // Green
  'green-50': { l: 0.982, c: 0.020, h: 144.485 },
  'green-100': { l: 0.962, c: 0.044, h: 144.601 },
  'green-200': { l: 0.924, c: 0.084, h: 145.282 },
  'green-300': { l: 0.871, c: 0.134, h: 146.534 },
  'green-400': { l: 0.792, c: 0.209, h: 151.711 },
  'green-500': { l: 0.694, c: 0.207, h: 149.579 },
  'green-600': { l: 0.585, c: 0.176, h: 147.891 },
  'green-700': { l: 0.482, c: 0.140, h: 147.051 },
  'green-800': { l: 0.402, c: 0.109, h: 146.534 },
  'green-900': { l: 0.349, c: 0.085, h: 145.798 },
  'green-950': { l: 0.242, c: 0.059, h: 145.523 },
  
  // Emerald
  'emerald-50': { l: 0.980, c: 0.022, h: 160.364 },
  'emerald-100': { l: 0.956, c: 0.047, h: 162.352 },
  'emerald-200': { l: 0.912, c: 0.091, h: 164.224 },
  'emerald-300': { l: 0.852, c: 0.136, h: 164.521 },
  'emerald-400': { l: 0.769, c: 0.169, h: 163.027 },
  'emerald-500': { l: 0.686, c: 0.169, h: 162.479 },
  'emerald-600': { l: 0.583, c: 0.148, h: 163.027 },
  'emerald-700': { l: 0.492, c: 0.121, h: 163.821 },
  'emerald-800': { l: 0.411, c: 0.095, h: 164.074 },
  'emerald-900': { l: 0.357, c: 0.075, h: 164.596 },
  'emerald-950': { l: 0.253, c: 0.052, h: 166.411 },
  
  // Teal
  'teal-50': { l: 0.981, c: 0.019, h: 180.872 },
  'teal-100': { l: 0.957, c: 0.041, h: 182.366 },
  'teal-200': { l: 0.914, c: 0.078, h: 185.09 },
  'teal-300': { l: 0.856, c: 0.113, h: 186.391 },
  'teal-400': { l: 0.773, c: 0.134, h: 185.365 },
  'teal-500': { l: 0.690, c: 0.135, h: 184.704 },
  'teal-600': { l: 0.584, c: 0.120, h: 185.365 },
  'teal-700': { l: 0.494, c: 0.100, h: 186.391 },
  'teal-800': { l: 0.419, c: 0.079, h: 186.955 },
  'teal-900': { l: 0.368, c: 0.063, h: 187.417 },
  'teal-950': { l: 0.268, c: 0.048, h: 189.639 },
  
  // Cyan
  'cyan-50': { l: 0.984, c: 0.020, h: 200.937 },
  'cyan-100': { l: 0.963, c: 0.042, h: 205.415 },
  'cyan-200': { l: 0.927, c: 0.080, h: 207.286 },
  'cyan-300': { l: 0.877, c: 0.117, h: 208.865 },
  'cyan-400': { l: 0.789, c: 0.154, h: 211.53 },
  'cyan-500': { l: 0.703, c: 0.151, h: 212.652 },
  'cyan-600': { l: 0.595, c: 0.134, h: 215.867 },
  'cyan-700': { l: 0.504, c: 0.112, h: 218.03 },
  'cyan-800': { l: 0.436, c: 0.090, h: 219.996 },
  'cyan-900': { l: 0.383, c: 0.072, h: 221.393 },
  'cyan-950': { l: 0.289, c: 0.056, h: 223.128 },
  
  // Sky
  'sky-50': { l: 0.977, c: 0.013, h: 225.619 },
  'sky-100': { l: 0.953, c: 0.029, h: 226.244 },
  'sky-200': { l: 0.912, c: 0.053, h: 225.619 },
  'sky-300': { l: 0.853, c: 0.087, h: 228.709 },
  'sky-400': { l: 0.746, c: 0.160, h: 232.661 },
  'sky-500': { l: 0.670, c: 0.164, h: 237.323 },
  'sky-600': { l: 0.576, c: 0.153, h: 240.801 },
  'sky-700': { l: 0.499, c: 0.133, h: 242.528 },
  'sky-800': { l: 0.438, c: 0.107, h: 243.851 },
  'sky-900': { l: 0.385, c: 0.081, h: 244.838 },
  'sky-950': { l: 0.297, c: 0.060, h: 246.061 },
  
  // Blue
  'blue-50': { l: 0.970, c: 0.014, h: 252.466 },
  'blue-100': { l: 0.941, c: 0.032, h: 251.868 },
  'blue-200': { l: 0.896, c: 0.060, h: 253.224 },
  'blue-300': { l: 0.831, c: 0.100, h: 254.604 },
  'blue-400': { l: 0.707, c: 0.165, h: 254.624 },
  'blue-500': { l: 0.623, c: 0.214, h: 259.815 },
  'blue-600': { l: 0.535, c: 0.241, h: 264.145 },
  'blue-700': { l: 0.472, c: 0.216, h: 266.114 },
  'blue-800': { l: 0.404, c: 0.165, h: 266.509 },
  'blue-900': { l: 0.362, c: 0.121, h: 267.356 },
  'blue-950': { l: 0.277, c: 0.088, h: 268.727 },
  
  // Indigo
  'indigo-50': { l: 0.963, c: 0.017, h: 272.314 },
  'indigo-100': { l: 0.930, c: 0.037, h: 272.829 },
  'indigo-200': { l: 0.880, c: 0.069, h: 274.039 },
  'indigo-300': { l: 0.805, c: 0.115, h: 274.868 },
  'indigo-400': { l: 0.680, c: 0.177, h: 276.911 },
  'indigo-500': { l: 0.585, c: 0.207, h: 278.345 },
  'indigo-600': { l: 0.503, c: 0.224, h: 279.96 },
  'indigo-700': { l: 0.449, c: 0.195, h: 281.128 },
  'indigo-800': { l: 0.388, c: 0.151, h: 281.128 },
  'indigo-900': { l: 0.343, c: 0.113, h: 282.108 },
  'indigo-950': { l: 0.258, c: 0.084, h: 283.345 },
  
  // Violet
  'violet-50': { l: 0.970, c: 0.020, h: 293.756 },
  'violet-100': { l: 0.943, c: 0.045, h: 294.449 },
  'violet-200': { l: 0.902, c: 0.087, h: 295.135 },
  'violet-300': { l: 0.835, c: 0.145, h: 296.116 },
  'violet-400': { l: 0.726, c: 0.212, h: 297.544 },
  'violet-500': { l: 0.635, c: 0.254, h: 298.945 },
  'violet-600': { l: 0.560, c: 0.263, h: 299.547 },
  'violet-700': { l: 0.496, c: 0.232, h: 299.547 },
  'violet-800': { l: 0.429, c: 0.194, h: 299.547 },
  'violet-900': { l: 0.374, c: 0.153, h: 300.036 },
  'violet-950': { l: 0.287, c: 0.125, h: 299.547 },
  
  // Purple
  'purple-50': { l: 0.977, c: 0.019, h: 301.72 },
  'purple-100': { l: 0.952, c: 0.043, h: 302.321 },
  'purple-200': { l: 0.914, c: 0.081, h: 303.304 },
  'purple-300': { l: 0.856, c: 0.138, h: 304.151 },
  'purple-400': { l: 0.714, c: 0.203, h: 305.504 },
  'purple-500': { l: 0.627, c: 0.265, h: 303.9 },
  'purple-600': { l: 0.548, c: 0.269, h: 302.321 },
  'purple-700': { l: 0.485, c: 0.234, h: 301.72 },
  'purple-800': { l: 0.420, c: 0.192, h: 301.415 },
  'purple-900': { l: 0.364, c: 0.151, h: 301.415 },
  'purple-950': { l: 0.280, c: 0.134, h: 301.72 },
  
  // Fuchsia
  'fuchsia-50': { l: 0.977, c: 0.023, h: 318.852 },
  'fuchsia-100': { l: 0.952, c: 0.051, h: 318.011 },
  'fuchsia-200': { l: 0.910, c: 0.098, h: 316.693 },
  'fuchsia-300': { l: 0.852, c: 0.165, h: 316.005 },
  'fuchsia-400': { l: 0.759, c: 0.245, h: 316.693 },
  'fuchsia-500': { l: 0.670, c: 0.277, h: 319.66 },
  'fuchsia-600': { l: 0.581, c: 0.264, h: 323.322 },
  'fuchsia-700': { l: 0.503, c: 0.228, h: 325.531 },
  'fuchsia-800': { l: 0.436, c: 0.188, h: 326.088 },
  'fuchsia-900': { l: 0.381, c: 0.149, h: 325.531 },
  'fuchsia-950': { l: 0.285, c: 0.126, h: 325.996 },
  
  // Pink
  'pink-50': { l: 0.977, c: 0.016, h: 343.231 },
  'pink-100': { l: 0.952, c: 0.034, h: 342.602 },
  'pink-200': { l: 0.910, c: 0.066, h: 343.231 },
  'pink-300': { l: 0.850, c: 0.113, h: 345.765 },
  'pink-400': { l: 0.758, c: 0.176, h: 349.761 },
  'pink-500': { l: 0.669, c: 0.213, h: 354.273 },
  'pink-600': { l: 0.582, c: 0.223, h: 358.691 },
  'pink-700': { l: 0.507, c: 0.195, h: 1.168 },
  'pink-800': { l: 0.443, c: 0.158, h: 2.095 },
  'pink-900': { l: 0.395, c: 0.128, h: 3.651 },
  'pink-950': { l: 0.286, c: 0.097, h: 3.651 },
  
  // Rose
  'rose-50': { l: 0.974, c: 0.014, h: 12.427 },
  'rose-100': { l: 0.948, c: 0.029, h: 11.364 },
  'rose-200': { l: 0.905, c: 0.056, h: 10.379 },
  'rose-300': { l: 0.844, c: 0.100, h: 10.533 },
  'rose-400': { l: 0.754, c: 0.161, h: 11.651 },
  'rose-500': { l: 0.665, c: 0.200, h: 13.428 },
  'rose-600': { l: 0.574, c: 0.211, h: 14.148 },
  'rose-700': { l: 0.494, c: 0.182, h: 13.428 },
  'rose-800': { l: 0.434, c: 0.150, h: 12.856 },
  'rose-900': { l: 0.392, c: 0.125, h: 12.427 },
  'rose-950': { l: 0.271, c: 0.087, h: 10.533 },
};

// Parse command-line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Usage: bun find-closest-tailwind.js <L> <C> <H>');
  console.error('   or: bun find-closest-tailwind.js "oklch(L% C H)"');
  console.error('');
  console.error('Example: bun find-closest-tailwind.js 60.28 0.218 257.42');
  console.error('Example: bun find-closest-tailwind.js "oklch(60.28% 0.218 257.42)"');
  process.exit(1);
}

let l, c, h;

if (args.length === 1) {
  // Parse "oklch(L% C H)" format
  const match = args[0].match(/oklch\(([0-9.]+)%?\s+([0-9.]+)\s+([0-9.]+)\)/);
  if (!match) {
    console.error('Invalid format. Expected: oklch(L% C H) or oklch(L C H)');
    process.exit(1);
  }
  l = parseFloat(match[1]);
  c = parseFloat(match[2]);
  h = parseFloat(match[3]);
  
  // Convert percentage L to 0-1 range if needed
  if (l > 1) {
    l = l / 100;
  }
} else if (args.length === 3) {
  // Parse separate L C H values
  l = parseFloat(args[0]);
  c = parseFloat(args[1]);
  h = parseFloat(args[2]);
  
  // Convert percentage L to 0-1 range if needed
  if (l > 1) {
    l = l / 100;
  }
} else {
  console.error('Invalid number of arguments');
  process.exit(1);
}

// Convert to culori format
const inputColor = oklch({ mode: 'oklch', l, c, h });

// Find closest color using Euclidean distance
let closestName = '';
let closestDistance = Infinity;
let closestColor = null;

for (const [name, color] of Object.entries(tailwindColors)) {
  const tailwindColor = oklch({ mode: 'oklch', ...color });
  const distance = differenceEuclidean()(inputColor, tailwindColor);
  
  if (distance < closestDistance) {
    closestDistance = distance;
    closestName = name;
    closestColor = color;
  }
}

// Convert to hex
const inputHex = formatHex(inputColor);
const closestHex = formatHex(oklch({ mode: 'oklch', ...closestColor }));

console.log(`Input:  oklch(${(l * 100).toFixed(2)}% ${c.toFixed(3)} ${h.toFixed(2)})`);
console.log(`Hex:    ${inputHex.toUpperCase()}`);
console.log('');
console.log(`Closest: ${closestName}`);
console.log(`Distance: ${closestDistance.toFixed(6)} (ΔE)`);
console.log(`OKLCH:  oklch(${closestColor.l.toFixed(3)} ${closestColor.c.toFixed(3)} ${closestColor.h.toFixed(3)})`);
console.log(`Hex:    ${closestHex.toUpperCase()}`);
