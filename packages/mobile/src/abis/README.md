# /src/abis

This directory has the ABIs used for the tradeable assets inside of the wallet.

## IERC20

This is used to wrap assets that are ERC20 compliant in order to interface with their contract code in typescript.

## MerkleDistributor

This is used to interface with a merkle drop contract, likely to reward app users with ERC20 tokens on the Celo network.

## Stable Token

This is the actual implementation of the ERC20 compliant cUSD or cEUR stable token which may have additional features.
