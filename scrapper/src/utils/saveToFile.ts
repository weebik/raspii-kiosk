import * as fs from 'fs';
import * as path from 'path';
import { OUTPUT_DIR } from '../config/defaults.ts';

export function saveToFile(filename: string, data: any) {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const filePath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

  console.log(`[Saved] ${filename}`);
}