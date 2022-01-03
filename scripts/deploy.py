from brownie import network, config, NazNozToken, TokenFarm
from scripts.helpful_scripts import get_account, fund_with_link, get_contract
from web3 import Web3
import time
import yaml
import json
import os
import shutil

KEPT_BALANCE = Web3.toWei(1, "ether")


def deploy_token_farm_and_dapp_token(front_end_update=False):
    account = get_account()
    naz_noz_token = NazNozToken.deploy({"from": account})
    token_farm = TokenFarm.deploy(
        naz_noz_token.address,
        {"from": account},
        publish_source=config["networks"][network.show_active()].get("verify", False),
    )
    time.sleep(20)

    tx = naz_noz_token.transfer(
        token_farm.address,
        # token_farm.events["contract_address"]["contractAddress"],
        naz_noz_token.totalSupply() - KEPT_BALANCE,
        {"from": account},
    )
    tx.wait(1)
    weth_token = get_contract("weth_token")
    dai_token = get_contract("fau_token")
    eth_token_price_feed = get_contract("eth_usd_price_feed")
    dai_token_price_feed = get_contract("dai_usd_price_feed")
    dict_of_allowed_tokens = {
        naz_noz_token: dai_token_price_feed,
        weth_token: eth_token_price_feed.address,
        dai_token: dai_token_price_feed.address,
    }
    add_allowed_tokens(token_farm, dict_of_allowed_tokens, account)
    if front_end_update:
        update_front_end()
    return token_farm, naz_noz_token


def add_allowed_tokens(token_farm, dict_of_allowed_tokens, account):
    for token, price_feed_address in dict_of_allowed_tokens.items():
        addtoken_tx = token_farm.addAllowedTokens(token.address, {"from": account})
        addtoken_tx.wait(1)
        settoken_tx = token_farm.setPriceFeedContract(token.address, price_feed_address)
        settoken_tx.wait(1)
    return token_farm


def update_front_end():
    copy_folders_to_front_end("./build", "./front_end/src/chain-info")
    with open("./brownie-config.yaml", "r") as file:
        config_dict = yaml.load(file, Loader=yaml.FullLoader)
        with open("./front_end/src/brownie-config.json", "w") as brownie_config_json:
            json.dump(config_dict, brownie_config_json)
    print("Front end updated!")


def copy_folders_to_front_end(src, dst):
    if os.path.exists(dst):
        shutil.rmtree(dst)
    shutil.copytree(src, dst)


def main():
    deploy_token_farm_and_dapp_token(front_end_update=True)
