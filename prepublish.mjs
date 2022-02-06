import { rmSync } from 'fs';

console.log("Remove package folder");
rmSync('package', { recursive: true, force: true });
