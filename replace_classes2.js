import fs from 'fs';
import path from 'path';

const directoryPath = 'c:/kiaan project/canvas/src/pages';

function replaceClassesInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  content = content.replace(/bg-slate-950/g, 'bg-background');
  content = content.replace(/bg-slate-500/g, 'bg-secondary');
  content = content.replace(/bg-slate-600/g, 'bg-surface-hover');
  
  // also check for any text-slate-
  content = content.replace(/text-slate-500/g, 'text-secondary');
  content = content.replace(/text-slate-600/g, 'text-secondary');
  content = content.replace(/text-slate-700/g, 'text-tertiary');
  content = content.replace(/text-slate-800/g, 'text-tertiary');
  
  if (original !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', filePath);
  }
}

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      replaceClassesInFile(fullPath);
    }
  }
}

processDirectory(directoryPath);
console.log('Done.');
