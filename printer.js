
module.exports = function printProject(project) {
    if (project.refs.length > 0) {
        console.log(project.refs.length, 'ProjectReferences in', project.filePath);
        project.refs.forEach(r => {
            console.log('--> Project Ref:', r);
        })
    }
}
