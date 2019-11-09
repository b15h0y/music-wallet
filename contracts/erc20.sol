pragma solidity >=0.4.0 <0.7.0;

import "./conditionalTokens.sol";

contract erc20 is conditionalTokens{
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    string public constant name = "ERC20CT";
    string public constant symbol = "CT";
    uint8 public constant decimals = 18;

    function totalSupply() public view returns (uint256){
        return address(this).balance;
    }

    function balanceOf(address _owner) public view returns (uint256 balance){
        require(allClaims[_owner].exists==1);
        return allClaims[_owner].budget;
    }

    function transfer(address _to, uint256 _value) public returns (bool success){
        payServiceProvider(address(uint160(_to)), _value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        require(msg.sender==_from);
        payServiceProvider(address(uint160(_to)), _value);
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success){
        emit Approval(msg.sender, _spender, _value);
        return false;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining){
        return 0;
    }

}
