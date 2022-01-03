import { Token } from "../Main"
import { useEthers, useTokenBalance, useContractCall } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import { BalanceMsg } from "../../components/BalanceMsg"
import TokenFarm from "../../chain-info/contracts/TokenFarm.json"
import networkMapping from "../../chain-info/deployments/map.json"
import { constants, utils } from "ethers"
import { Contract } from "@ethersproject/contracts"
import { useStakingBalance } from "../../hooks"

export interface WalletBalanceProps {
    token: Token
}

export const TreasuryBalance = ({ token }: WalletBalanceProps) => {
    const { image, address, name } = token
    const { chainId } = useEthers()
    const { abi } = TokenFarm
    const tokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)
    const { account } = useEthers()

    const stakingBalance = useStakingBalance(address)

    // const [stakingBalance] = useContractCall({
    //     abi: tokenFarmInterface,
    //     address: tokenFarmAddress,
    //     method: "stakingBalance",
    //     args: [address, account],
    // }) ?? []

    const formattedStakingBalance: number = stakingBalance ? parseFloat(formatUnits(stakingBalance, 18)) : 0
    return (<BalanceMsg
        label={`Your Staked ${name} balance`}
        tokenImgSrc={image}
        amount={formattedStakingBalance} />)
}


// import { useEffect, useState } from "react"
// import { useEthers, useContractFunction } from "@usedapp/core"
// import { constants, utils } from "ethers"
// import TokenFarm from "../chain-info/contracts/TokenFarm.json"
// import ERC20 from "../chain-info/contracts/MockERC20.json"
// import { Contract } from "@ethersproject/contracts"
// import networkMapping from "../chain-info/deployments/map.json"


// export const useStakeTokens = (tokenAddress: string) => {
//     // address
//     // abi
//     // chainId
//     const { chainId } = useEthers()
//     const { abi } = TokenFarm
//     const tokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
//     const tokenFarmInterface = new utils.Interface(abi)
//     const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

//     const erc20ABI = ERC20.abi
//     const erc20Interface = new utils.Interface(erc20ABI)
//     const erc20Contract = new Contract(tokenAddress, erc20Interface)
//     // approve
//     const { send: approveErc20Send, state: approveAndStakeErc20State } =
//         useContractFunction(erc20Contract, "approve", {
//             transactionName: "Approve ERC20 transfer",
//         })