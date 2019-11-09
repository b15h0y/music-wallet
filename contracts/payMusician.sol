pragma solidity >=0.4.0 <0.7.0;

contract payMusician {
    struct Project{
        uint8 exists;
        string name;
        string hash;
        address onwer;
        address payable[] collaborators;
    }

    mapping(string=>Project) public Projects;

    event register(string indexed hash, address indexed owner);
    event pay(string indexed hash, address indexed payee);
    
    function addProject(string memory name, string memory hash, address payable[] memory collaborators) public {
        Project memory newProject = Project(1, name, hash, msg.sender, collaborators);
        Projects[hash] = newProject;
        emit register(hash, msg.sender);
    }

    function payProject(string memory hash) public payable{
        Project memory currProject = Projects[hash];
        require(currProject.exists == 1);
        uint total = msg.value;
        uint collaboratorsCount = currProject.collaborators.length;
        for (uint i=0; i < collaboratorsCount; i++) {
            currProject.collaborators[i].transfer(total / collaboratorsCount);
        }
        emit pay(hash, msg.sender);
    }
    
    function getProject(string memory hash) public view returns(address payable[] memory) {
        require(Projects[hash].exists == 1);
        return Projects[hash].collaborators;
    }
}
