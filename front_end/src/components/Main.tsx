/* eslint-disable spaced-comment*/
/// <reference types="react-scripts" />
import { constants } from "ethers";
import { useEthers } from "@usedapp/core"
import helperConfig from "../helper-config.json";
import networkMapping from "../chain-info/deployments/map.json"
import brownieConfig from "../brownie-config.json";
import naznoz from "../naznoz.png";
import weth from "../eth.png";
import dai from "../dai.png";
import { YourWallet } from "./yourWallet/YourWallet";
import { makeStyles } from "@material-ui/core";
import { textAlign } from "@mui/system";

export type Token = {
    image: string
    address: string
    name: string
}

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.white,
        textAlign: "center",
        padding: theme.spacing(4)
    }
}))
export const Main = () => {
    // Show token values from the wallet
    // Get the address of different tokens
    // det the balance of the users wallet
    // send the brownie  - congig to our src folder
    // send the build folder
    const classes = useStyles()
    const { chainId } = useEthers();
    const networkName = chainId ? helperConfig[chainId] : "dev"
    console.log(chainId)
    console.log(networkName)
    const nazNozTokenAddress = chainId ? networkMapping[String(chainId)]["NazNozToken"][0] : constants.AddressZero
    const wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero
    const fauTokenAddress = chainId ? brownieConfig["networks"][networkName]["fau_token"] : constants.AddressZero
    const supportedTokens: Array<Token> = [
        {
            image: naznoz,
            address: nazNozTokenAddress,
            name: "NazNoz"
        },
        {
            image: dai,
            address: fauTokenAddress,
            name: "DAI"
        },
        {
            image: weth,
            address: wethTokenAddress,
            name: "WETH"
        }
    ]

    return (
        <h2 className={classes.title}>
            NazNozToken App
            <YourWallet supportedTokens={supportedTokens} />
        </h2>)
}