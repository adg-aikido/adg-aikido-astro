#!/usr/bin/env bun
/**
 * Convert OKLCH color to RGB hex format
 * Usage: bun scripts/oklch-to-rgb.js "oklch(61.42% 0.194 248.05)"
 *        bun scripts/oklch-to-rgb.js 61.42 0.194 248.05
 */

import { formatHex, oklch } from 'culori';

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Usage: bun scripts/oklch-to-rgb.js <oklch-values>');
  console.error('');
  console.error('Examples:');
  console.error('  bun scripts/oklch-to-rgb.js "oklch(61.42% 0.194 248.05)"');
  console.error('  bun scripts/oklch-to-rgb.js 61.42 0.194 248.05');
  console.error('  bun scripts/oklch-to-rgb.js 0.6142 0.194 248.05');
  process.exit(1);
}

let l, c, h;

// Parse input - either a full oklch string or three separate values
if (args.length === 1) {
  const match = args[0].match(/oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)\s*\)/);
  if (!match) {
    console.error('Invalid OKLCH format. Use: oklch(L% C H) or oklch(L C H)');
    process.exit(1);
  }
  l = parseFloat(match[1]);
  c = parseFloat(match[2]);
  h = parseFloat(match[3]);
} else if (args.length === 3) {
  l = parseFloat(args[0]);
  c = parseFloat(args[1]);
  h = parseFloat(args[2]);
} else {
  console.error('Invalid number of arguments. Provide either a full oklch() string or three values (L C H)');
  process.exit(1);
}

// Normalize L to 0-1 range if given as percentage
if (l > 1) {
  l = l / 100;
}

try {
  const color = oklch({ l, c, h });
  
  if (!color) {
    console.error(`Invalid OKLCH values: L=${l}, C=${c}, H=${h}`);
    process.exit(1);
  }
  
  const hex = formatHex(color);
  
  console.log(`\nInput:  oklch(${(l * 100).toFixed(2)}% ${c.toFixed(3)} ${h.toFixed(2)})`);
  console.log(`Hex:    ${hex.toUpperCase()}`);
  console.log(`Lower:  ${hex.toLowerCase()}`);
  
} catch (error) {
  console.error(`Error converting color: ${error.message}`);
  process.exit(1);
}
