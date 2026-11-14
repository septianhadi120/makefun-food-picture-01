// food-picture-01 entry: the picture is stored as base64 in image.b64
// beside this file (a single line, to keep the entry's counted lines small);
// the program decodes it and writes it to /output/entry.png.
// Node 22, standard library only.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const bytes = Buffer.from(readFileSync(join(here, 'image.b64'), 'utf8').replace(/\s+/g, ''), 'base64');
// The picture is a JPEG (first bytes FF D8 FF); refuse anything else so a
// truncated or corrupted image never reaches the judge.
if (bytes.length < 3 || bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[2] !== 0xff) {
  throw new Error('image.b64 did not decode to a JPEG');
}
// The gate allows at most 1 MiB; refuse an oversized picture here too.
if (bytes.length > 1048576) {
  throw new Error('decoded picture exceeds 1 MiB');
}
writeFileSync(join(outDir, 'entry.png'), bytes);
