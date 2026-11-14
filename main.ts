// food-picture-01 entry: the picture is stored as base64 in image.b64
// beside this file; the program decodes it and writes it to
// /output/entry.png. Node 22, standard library only.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const bytes = Buffer.from(readFileSync(join(here, 'image.b64'), 'utf8').replace(/\s+/g, ''), 'base64');
writeFileSync(join(outDir, 'entry.png'), bytes);
