import fs from 'fs';
import path from 'path';

const files = [
  'src/pages/crm/circulator/ActivityTracker.jsx',
  'src/pages/crm/circulator/MyCommissions.jsx',
  'src/pages/crm/circulator/OnboardingModule.jsx',
  'src/pages/crm/validation/ValidationQueue.jsx',
  'src/pages/crm/coordinator/ProjectsManager.jsx',
  'src/pages/crm/enterprise/EnterpriseDashboard.jsx',
  'src/pages/crm/territory/TerritoryManagement.jsx'
];

files.forEach(file => {
  const fullPath = path.join('c:/kiaan project/canvas', file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace \${ with ${
    content = content.replace(/\\\${/g, '${');
    
    // Replace \` with `
    content = content.replace(/\\`/g, '`');
    
    // Replace \\n with \n
    content = content.replace(/\\\\n/g, '\\n');
    
    fs.writeFileSync(fullPath, content);
    console.log(`Fixed ${file}`);
  }
});
