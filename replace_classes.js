import fs from 'fs';
import path from 'path';

const directoryPath = 'c:/kiaan project/canvas/src/pages';

function replaceClassesInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Background replacements
  content = content.replace(/bg-slate-900\/[0-9]+/g, 'bg-surface-secondary');
  content = content.replace(/bg-slate-900/g, 'bg-surface');
  content = content.replace(/bg-slate-800\/[0-9]+/g, 'bg-surface-secondary');
  content = content.replace(/bg-slate-800/g, 'bg-surface-secondary');
  content = content.replace(/bg-slate-700/g, 'bg-surface-secondary');
  
  // Text replacements
  content = content.replace(/text-slate-200/g, 'text-primary');
  content = content.replace(/text-slate-300/g, 'text-secondary');
  content = content.replace(/text-slate-400/g, 'text-secondary');
  content = content.replace(/text-white/g, 'text-primary');
  
  // Border replacements
  content = content.replace(/border-slate-800\/[0-9]+/g, 'border-border');
  content = content.replace(/border-slate-800/g, 'border-border');
  content = content.replace(/border-slate-700\/[0-9]+/g, 'border-border');
  content = content.replace(/border-slate-700/g, 'border-border');
  content = content.replace(/border-slate-600/g, 'border-border');
  
  if (original !== content) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
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
