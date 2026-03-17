import fs from 'fs';
import path from 'path';

const REPLACEMENTS = [
    { from: /Avtomix Premier/g, to: 'Волга-Авто' },
    { from: /AVTOMIX PREMIER/g, to: 'ВОЛГА-АВТО' },
    { from: /Автомикс Премьер/g, to: 'Волга-Авто' },
    { from: /Автомикс/g, to: 'Волга-Авто' },
    { from: /Avtomix/g, to: 'Волга-Авто' },
    { from: /avtomix/g, to: 'volga-auto' },
    { from: /gennadiyyasnov-maker\/volga-auto/g, to: 'gennadiyyasnov-maker/Avtomix' }, // Restore github repo link just in case
];

const IGNORE_DIRS = ['node_modules', '.git', '.next', 'sanity'];
const IGNORE_FILES = ['package-lock.json', 'bun.lock', '.gitignore', 'replace.mjs'];

function walkAndReplace(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (!IGNORE_DIRS.includes(file)) {
                walkAndReplace(fullPath);
            }
        } else {
            if (!IGNORE_FILES.includes(file)) {
                try {
                    const content = fs.readFileSync(fullPath, 'utf8');
                    let newContent = content;
                    let changed = false;

                    for (const rule of REPLACEMENTS) {
                        if (rule.from.test(newContent)) {
                            newContent = newContent.replace(rule.from, rule.to);
                            changed = true;
                        }
                    }

                    if (changed) {
                        fs.writeFileSync(fullPath, newContent, 'utf8');
                        console.log(`Updated: ${fullPath}`);
                    }
                } catch (e) {
                    // Skip binary files or unreadable files
                }
            }
        }
    }
}

walkAndReplace('.');
console.log('Replacement complete.');
