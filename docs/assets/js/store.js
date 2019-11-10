function getProject() {
    var projects = localStorage.getItem('projects');
    if(projects == null || projects == NaN) projects = '[]'; 
    return JSON.parse(projects);
}

function setProject(name, collaborators, hash) {
    var projects = getProject();
    var newProject = {
        name: name,
        collaborators: collaborators,
        hash: hash
    }
    console.log(newProject);
    projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(projects));
}

function getProjectCount() {
    return (getProject()).length;
}