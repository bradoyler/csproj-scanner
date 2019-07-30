const glob = require('glob')
const parseProject = require('./parser');
const printProject = require('./printer');

let scanPath = '../../**/*.csproj';
const projectFolder = '';

if (projectFolder) {
    scanPath = `../../${projectFolder}/**/*.csproj`
}

console.log('Scanning', scanPath);

glob(scanPath, {}, function (err, files) {
    const projects = [];

    files.forEach((file, idx) => {
        parseProject(file, (project) => {
            projects.push(project);
            if (idx === (files.length - 1)) { // after last file is parsed, print results
                const sortedProjects = projects.sort((a, b) => b.refs.length - a.refs.length);
                sortedProjects.forEach(p => printProject(p));
            }
        });
    });
    console.log(files.length + ' .csproj files scanned');
})
