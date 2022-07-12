# Cheap NFT Marketplace

Os mercados de NFT utilizam frequentemente técnicas para reduzir as taxas de transação.
Algumas destas técnicas exigem que os usuários utilizem esses mercados com um sistema _off-chain_ que auxiliam as peças na _blockchain_.

Neste caso, construa um sistema simples _off-chain_ e o contrato inteligente na cadeia para permitir leilões baratos. O objectivo é permitir trocas comerciais entre um ERC721 e um ERC20 com uma única transacção na cadeia.
Os leilões devem funcionar da seguinte forma

-   🕑 O proprietário do NFT aprova todos os NFT's para o MarketPlace
-   🕑 Proprietário do NFT assina para criar uma listagem de leilões _off-chain_ com um preço inicial.
-   🕑 Licitante aprova token ERC20 para o Marketplace
-   🕑 Concorrente assina uma licitação para o leilão
-   🕑 Se o proprietário aprovar a oferta, assina-a de volta e recupera-a para o licitante
-   🕑 Qualquer pessoa com ambas as assinaturas pode liquidar a transacção, o proprietário leva o ERC20 enquanto o proponente leva o NFT.

O sistema _off-chain_ deve:

-   🕑 Ser escrito em Node.js
-   🕑 Não deve utilizar qualquer armazenamento persistente.
-   🕑 REST API utilizando o express.js:
    -   🕑 Obter as listagens
    -   🕑 Assinaturas
    -   🕑 Licitações

# Referencias

-   ✅ https://www.linkedin.com/pulse/how-create-nft-marketplace-polygon-codezeros/?trk=organization-update-content_share-article
-   🕑 https://ethereum.stackexchange.com/questions/102660/creating-an-auction-smart-contract-without-storing-the-ether
-   🕑 https://www.quicknode.com/guides/solidity/how-to-create-a-dutch-auction-smart-contract#what-is-dutch-auction
-   🕑 https://ethereum.stackexchange.com/questions/94928/on-chain-vs-off-chain-nft-art-platforms
-   🕑 https://hackernoon.com/how-to-create-on-chain-and-off-chain-nft-collection-smart-contracts
-   🕑 https://betterprogramming.pub/handling-nft-presale-allow-lists-off-chain-47a3eb466e44
-   🕑 https://blog.chain.link/how-to-build-an-nft-marketplace-with-hardhat-and-solidity/
-   🕑 https://chambers.com/articles/nft-mechanism-and-legal-issues-of-nft-transactions
-   🕑 https://fauna.com/blog/bridging-on-chain-and-off-chain-data-in-nfts-with-fauna
-   🕑 https://docs.tatum.io/tutorials/how-to-create-a-peer-to-peer-nft-auction
-   🕑 https://nftschool.dev/concepts/non-fungible-tokens/#how-are-nfts-special
-   🕑 https://academy.binance.com/en/articles/how-to-make-your-own-nfts
-   🕑 https://quadrabyte.net/how-to-build-an-nft-marketplace-on-chain/
-   🕑 https://trufflesuite.com/guides/nft-marketplace/
-   🕑 https://github.com/ethereum/EIPs/issues/5102
-   🕑 https://www.youtube.com/watch?v=bBQif9IM9Fw
-   🕑 https://www.youtube.com/watch?v=2bjVWclBD_s
-   🕑 https://www.youtube.com/watch?v=kMnfCUvJnHo
-   🕑 https://www.youtube.com/watch?v=nOfFeRZg9oE
-   🕑 https://www.youtube.com/watch?v=7Q5E6RvLlUw
-   🕑 https://pt.wikipedia.org/wiki/Leilão
-   🕑 https://www.chainshot.com/courses
-   🕑 https://www.pointer.gg/tutorials
-   🕑 https://buildspace.so/projects
-   🕑 https://learn.questbook.xyz
