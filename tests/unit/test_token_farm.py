from brownie import network, config, NazNozToken, TokenFarm, exceptions
from brownie.network import account
from web3 import Web3
import pytest
from toolz.itertoolz import get
from scripts.helpful_scripts import (
    LOCAL_BLOCKCHAIN_ENVIRONMENTS,
    INITIAL_PRICE_FEED_VALUE,
    get_account,
    get_contract,
)
from scripts.deploy import deploy_token_farm_and_dapp_token


def test_set_price_feed_contract():
    # Arrange
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local testing!")
    account = get_account()
    non_owner = get_account(index=1)
    # naznoztoken = NazNozToken.deploy({"from": account})
    # token_farm = TokenFarm.deploy(naznoztoken.address, {"from": account})
    token_farm, naznoztoken = deploy_token_farm_and_dapp_token()
    price_feed = get_contract("dai_usd_price_feed")
    token_farm.setPriceFeedContract(naznoztoken.address, price_feed.address)

    assert token_farm.tokenPriceFeedMapping(naznoztoken.address) == price_feed.address
    with pytest.raises(exceptions.VirtualMachineError):
        token_farm.setPriceFeedContract(
            naznoztoken.address, price_feed.address, {"from": non_owner}
        )


def test_stake_tokens(amount_staked):
    # Arrange
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local testing!")
    account = get_account()
    non_owner = get_account(index=1)
    token_farm, naznoztoken = deploy_token_farm_and_dapp_token()
    app_tx = naznoztoken.approve(token_farm.address, amount_staked, {"from": account})
    app_tx.wait(1)
    stake_tx = token_farm.stakeTokens(
        amount_staked, naznoztoken.address, {"from": account}
    )
    stake_tx.wait(1)

    assert (
        token_farm.tokenToStakerToAmount(naznoztoken.address, account.address)
        == amount_staked
    )
    assert token_farm.uniqueTokensStaked(account.address) == 1
    assert token_farm.stakers(0) == account.address
    return token_farm, naznoztoken


def test_issue_tokens(amount_staked):
    # Arrange
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local testing!")
    account = get_account()
    non_owner = get_account(index=1)
    token_farm, naznoztoken = test_stake_tokens(amount_staked)
    starting_balance = naznoztoken.balanceOf(account.address)
    token_farm.issueTokens({"from": account})

    # assert
    assert (
        naznoztoken.balanceOf(account.address)
        == starting_balance + INITIAL_PRICE_FEED_VALUE
    )

    # fau_token = get_contract("fau_token")
    # fau_token_price_feed = get_contract("dai_usd_price_feed")
    # add allowed token


#     token_farm.addAllowedTokens(fau_token.address, {"from": account})
#     # set its pricefeed
#     token_farm.setPriceFeedContract(fau_token.address, fau_token_price_feed.address)
#     # Get DAI to stake
#     getfau_tx = fau_token.deposit({"from": non_owner, "value": Web3.toWei(1, "ether")})
#     getfau_tx.wait(1)
#     # Stake dai as non-owner
#     token_farm.stakeTokens(
#         fau_token.getBalance(non_owner.address) - 1000, fau_token.address
#     )
#     token_farm.wait(1)
#     # Issue tokens as owner
#     token_farm.issueTokens({"from": account})

#     # Assert non-owner cannot issue tokens
#     with pytest.raises(exceptions.VirtualMachineError):
#         token_farm.issueTokens({"from": non_owner})
#     # Assert staker now has non-zero tokens issued
#     assert naznoztoken.balanceOf(non_owner.address) > 0
