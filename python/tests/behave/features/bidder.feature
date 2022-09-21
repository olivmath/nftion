Feature: Bidder NFT
  As a NFT Bidder I want to buy a new NFT
  The nft will be bought at the lowest possible price,
  and I will wait for the seller to close the auction


  Scenario: Valid Bid to NFT Auction
    Given Bidder with private_key: 0xc12d5fd82e11119cb6fdeaac20ad8b255fdb208b36d557dd816e2bfd8d831e0b
    When he bid: 100 at nft: 0xac
    Then should be displayed into the bid list of nft: 0xac
  
  Scenario: Ivalid Bid to NFT Auction
    Given Bidder with private_key: 0xc12d5fd82e11119cb6fdeaac20ad8b255fdb208b36d557dd816e2bfd8d831e0b
    When he bid: 1 at nft: 0xac
    Then should return
    """
    {"message": "1 is insufficient, bid must be greater than 100"}
    """