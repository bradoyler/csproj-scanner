const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();

module.exports = function parseProject (filePath, done) {
    fs.readFile(filePath, (err, data) => {        
        parser.parseString(data, (err, result) => {
            const itemgroups = result.Project.ItemGroup;
            if (itemgroups && itemgroups.length) {
                const project = { filePath: '', refs: [] };
                itemgroups.forEach(grp => {
                    if (grp.ProjectReference) {
                        const cleanFilePath = filePath.replace(/\.\.\/\.\./, '');
                        project.filePath = cleanFilePath;
                        grp.ProjectReference.forEach(ref => {
                            let include = ref.$.Include;
                            include = include.replace(/\\/g, path.sep).replace(/\.\./g, '')
                            project.refs.push(include);                
                        });
                    }
                });
                done(project);
            }
        });
    });
}