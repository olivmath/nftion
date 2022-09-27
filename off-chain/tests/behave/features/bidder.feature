Feature: Bidder NFT
  As a NFT Bidder I want to buy a new NFT
  The nft will be bought at the lowest possible price,
  and I will wait for the seller to close the auction


  Scenario: Valid Bid to NFT Auction
    Given a open auction nft: 0xff
    When bidder send a bid: 100
    Then should be are in bid list of nft: 0xff

  Scenario: Ivalid Bid to NFT Auction
    Given a open auction nft: 0xff
    When bidder send a bid: 1
    Then should return
    """
    {"message": "1 is insufficient, bid must be greater than 100"}
    """
