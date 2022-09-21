Feature: Seller NFT
  As a NFT Seller I want to sell my NFT,
  The NFT to be sold for the highest possible price,
  and that I can close the auction whenever I want


  Scenario: Open a Auction NFT
    Given Seller with private_key: 0x7f27c4189fb97fd29fba63779c2bcfc8bbb066c403d2754abc52283ca502cc4f
    When he open a auction with nft: 0xac, init price: 10
    Then should be displayed into the list of open auctions


  Scenario: Closed a Auction NFT
    Given Seller with private_key: 0x7f27c4189fb97fd29fba63779c2bcfc8bbb066c403d2754abc52283ca502cc4f
    When he closed a auction with nft: 0xac, init price: 10
    Then should be displayed into the list of closed auctions