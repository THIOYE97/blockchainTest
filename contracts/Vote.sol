// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Vote {

   struct Option{
    uint8 id;
    string name;
    uint64 voteCount;
   }

   uint8 public totalOptions;

   mapping (uint8=>Option) public options;

   mapping (address=>bool) public voters;

   string private constant OPTION_NOT_EXISTS = "Cette vote n'existe pas";

   string private constant ALREADY_VOTED = "Vous ne pouvez plus voter";

   constructor(){
        addOptions("Vote blanc");
        addOptions("Oui");
        addOptions("Non");
   }


    function addOptions(string memory _name) private{
        options[totalOptions] = Option(totalOptions,_name,0);
        totalOptions++;
    }

    function vote(uint8 _optionid) public{

        require(_optionid<totalOptions,OPTION_NOT_EXISTS);
        require(!voters[msg.sender], ALREADY_VOTED);
        voters[msg.sender] = true;
        options[_optionid].voteCount++; 

    }
    function getOption(uint8 _optionid)public view returns(uint8 id,string memory name, uint64 voteCount){
        
        require(_optionid<totalOptions,OPTION_NOT_EXISTS);
        Option memory option = options[_optionid];
        return(option.id,option.name, option.voteCount);

    }

    function getOptions() public view returns (Option[] memory ){
        
        Option[] memory optionsArray = new Option[](totalOptions);
        for (uint8 i = 0; i < totalOptions; i++) {
            optionsArray[i] = options[i];
        }
        return optionsArray;
        
    }
}
