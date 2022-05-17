//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract DAO {

    //** 1 ETH => 1000 Shares
    //** Vote Weight = f(Number of Shares held by Voter)

    address public admin;

    uint256 public totalShares;
    uint256 public availableFunds;
    uint256 public contributionEnd;
    uint256 public voteDuration;
    uint256 public quorum; // as a function of totalShares, see excecuteProposal().
    uint256 public nextPropId;

    struct Proposal {
        uint256 propId;
        string name;
        address payable recipient;
        uint256 amount;
        uint256 votes;
        uint256 end;
        bool executed;
        bool killed;
    }
    mapping(address => bool) public investors;
    mapping(address => mapping(uint256 => bool)) public investorToProposalVoted;
    mapping(address => uint256) public investorToShare;
    mapping(uint256 => Proposal) public idToProposal;

    modifier onlyInvestor(){
        require(investors[msg.sender] == true, "Investor access only");
        _;
    } 
    constructor(uint256 _contributionTime, uint256 _voteDuration, uint256 _quorum) {
        require(_quorum > 0 && _quorum < 100, "Quorum must belong to ]0,100[");
        admin = msg.sender;
        contributionEnd = block.timestamp + _contributionTime;
        voteDuration = _voteDuration;
        quorum = _quorum;
    }
    function contribute() external payable {
        require(block.timestamp < contributionEnd, "Contribution period ended");
        investors[msg.sender] = true;
        investorToShare[msg.sender] += msg.value*1000;
        totalShares += msg.value*1000;
        availableFunds += msg.value;
    }
    function redeemShares(uint256 _sharesAmount) external {
        require(investorToShare[msg.sender] >= _sharesAmount, "Not enough shares in investor's balance");
        require(availableFunds >= _sharesAmount / 1000, "Not enough ETH in DAO");
        investorToShare[msg.sender] -= _sharesAmount;
        payable(msg.sender).transfer(_sharesAmount / 1000);
        availableFunds -= _sharesAmount / 1000;
        totalShares -= _sharesAmount;
    }
    //** transferShares must be called by another Smart Contract (exchange) */
    function transferShares(address _to, uint256 _sharesAmount) external {
        require(investorToShare[msg.sender] >= _sharesAmount, "Not enough shares in investor's balance");
        investorToShare[msg.sender] -= _sharesAmount;
        investorToShare[ _to] += _sharesAmount;
        investors[_to] = true;
    }
    function createProposal(
        string memory _name,
        address payable _recipient,
        uint256 _amount)
        external onlyInvestor() {
        require(availableFunds >= _amount, "Not enough ETH in DAO");
        idToProposal[nextPropId] = Proposal(
            nextPropId,
            _name,
            _recipient,
            _amount,
            0,
            block.timestamp + voteDuration,
            false,
            false);
        availableFunds -= _amount;
        nextPropId++;
    }
    function voteProposal(uint256 _propId) external onlyInvestor() {
        require(investorToProposalVoted[msg.sender][_propId] == false, "Investor can vote only once per proposal");
        Proposal storage proposal = idToProposal[_propId];
        require(proposal.end >= block.timestamp, "Vote period must be opened");
        investorToProposalVoted[msg.sender][_propId] = true;
        proposal.votes += investorToShare[msg.sender];
    }
    function excecuteProposal(uint256 _propId) external onlyInvestor() {
        Proposal storage proposal = idToProposal[_propId];
        // require((proposal.votes / totalShares) *100 >= quorum, "Quorum must be reached");
        require(proposal.end < block.timestamp, "Vote period must be closed");
        require(proposal.executed == false, "Proposal must be active");
        require(proposal.amount <= availableFunds, "Not enough ETH in DAO");
        proposal.recipient.transfer(proposal.amount);
        proposal.executed = true;
        availableFunds -= proposal.amount;
    }
    receive() payable external {
        availableFunds += msg.value;
    }
}
