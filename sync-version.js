import fs from 'fs';

const iconPkg = JSON.parse(
  fs.readFileSync('node_modules/lucide/package.json', 'utf8')
);
const frameworkPkgPath = './package.json';
const frameworkPkg = JSON.parse(fs.readFileSync(frameworkPkgPath, 'utf8'));

frameworkPkg.version = `${iconPkg.version}-0`;

fs.writeFileSync(
  frameworkPkgPath,
  JSON.stringify(frameworkPkg, null, 2) + '\n'
);
console.log(`Synced version to ${iconPkg.version}-0`);
