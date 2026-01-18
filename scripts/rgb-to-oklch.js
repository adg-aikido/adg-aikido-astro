#!/usr/bin/env bun
/**
 * Convert RGB hex color to OKLCH format
 * Usage: bun scripts/rgb-to-oklch.js "#007AFF"
 *        bun scripts/rgb-to-oklch.js 007AFF
 */

import { formatCss, oklch } from 'culori';

const input = process.argv[2];

if (!input) {
  console.error('Usage: bun scripts/rgb-to-oklch.js <hex-color>');
  console.error('Example: bun scripts/rgb-to-oklch.js "#007AFF"');
  process.exit(1);
}

// Normalize input - add # if missing
const hex = input.startsWith('#') ? input : `#${input}`;

try {
  const color = oklch(hex);
  
  if (!color) {
    console.error(`Invalid hex color: ${hex}`);
    process.exit(1);
  }
  
  // Format as CSS oklch() string
  const oklchStr = formatCss(color);
  
  // Also show individual values for easy copying
  console.log(`\nInput:  ${hex}`);
  console.log(`OKLCH:  ${oklchStr}`);
  console.log("\nValues:");
  console.log(`  L: ${(color.l * 100).toFixed(2)}%`);
  console.log(`  C: ${color.c.toFixed(3)}`);
  console.log(`  H: ${color.h ? color.h.toFixed(2) : '0'}`);
  console.log(`\nFor CSS: oklch(${(color.l * 100).toFixed(2)}% ${color.c.toFixed(3)} ${color.h ? color.h.toFixed(2) : '0'})`);
  
} catch (error) {
  console.error(`Error converting color: ${error.message}`);
  process.exit(1);
}
