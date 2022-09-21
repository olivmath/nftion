Feature: Auction NFT
  As a User (bidder/seller) I want to see all open/closed nft auction,
  Consult bids in specific auction.


  Scenario: Open Auctions
    Given that there are open nft auctions
    When someone accesses the home
    Then should return list of ids of open auctions

  Scenario: Closed Auctions
    Given that there are closed nft auctions
    When someone accesses the home
    Then should return list of ids of closed auctions

  Scenario: Get data about a specif NFT auction
    Given that there are open nft auctions
    When someone accesses the page of NFT auction
    Then should return list of bids of this NFT auctions
