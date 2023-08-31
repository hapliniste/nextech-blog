"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
//const PROJECT_DIRECTORY = path.join(__dirname, 'src');
var PROJECT_DIRECTORY = process.cwd();
//console.log(process.cwd());
function generateTreeStructure(directory, level) {
    if (level === void 0) { level = 0; }
    var files = fs.readdirSync(directory);
    var result = '';
    files.forEach(function (file, index, array) {
        // Ignore hidden files and directories
        if (file.startsWith('.') || file === 'node_modules') {
            return;
        }
        var fullPath = path.join(directory, file);
        var stats = fs.statSync(fullPath);
        // Generate indent based on the current level
        var isLast = index === array.length - 1;
        var indent = '  '.repeat(level);
        var branch = isLast ? '└── ' : '├── ';
        // Add file or directory name to the result
        result += "".concat(branch).concat(file, "\n");
        // Recursively generate tree structure for sub-directories
        if (stats.isDirectory()) {
            var nextLevel = level + 1;
            var nested_1 = generateTreeStructure(fullPath, nextLevel);
            result += nested_1.replace(/(^\s*)(├|└)/gm, function (match, p1, p2) {
                var isLastLine = nested_1.endsWith(match);
                var nextIndent = isLastLine ? p1 : p1 + ('│' + indent);
                return nextIndent + p2;
            });
        }
    });
    return result;
}
exports["default"] = generateTreeStructure;
/*let useTabs = false; // set to true to use tabs for indentation
useTabs = process.argv[2] === '--use-tabs';*/
var treeStructure = generateTreeStructure(PROJECT_DIRECTORY, 1);
fs.writeFileSync('projectStructure.txt', treeStructure);
console.log('Project structure has been written to projectStructure.txt');
