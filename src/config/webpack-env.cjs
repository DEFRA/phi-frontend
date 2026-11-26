const { execSync } = require('child_process')

const gtagID = execSync(
  `node --input-type=module --eval "
    import { createRequire } from 'module';
    import { fileURLToPath } from 'url';
    import path from 'path';
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    globalThis.__dirname = __dirname;
    const { config } = await import('./src/config/index.js');
    process.stdout.write(config.get('gtagID'));
  "`
).toString()

module.exports = { gtagID }