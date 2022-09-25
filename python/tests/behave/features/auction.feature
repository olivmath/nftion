Feature: Auction NFT
  As a User (bidder/seller) I want to see all open/closed nft auction,
  Consult bids in specific auction.


  Scenario: Open Auctions
    Given that there are open nft auctions
    When someone get this
    Then should return list of ids of open auctions
    """
    ["0xff"]
    """

  Scenario: Closed Auctions
    Given that there are closed nft auctions
    When someone get this
    Then should return list of ids of closed auctions
    """
    ["0xaa"]
    """

  Scenario: Get data about a specif NFT auction
    Given that there are open nft auctions
    When someone get 0xff NFT
    Then should return list of bids of 0xff NFT auction
