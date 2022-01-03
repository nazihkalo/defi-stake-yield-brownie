import { useEffect, useState } from "react"
import { useEthers, useContractFunction } from "@usedapp/core"
import { constants, utils } from "ethers"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import ERC20 from "../chain-info/contracts/MockERC20.json"
import { Contract } from "@ethersproject/contracts"
import networkMapping from "../chain-info/deployments/map.json"


export const useUnstakeTokens = (tokenAddress: string) => {
    // address
    // abi
    // chainId
    const { chainId } = useEthers()
    const { abi } = TokenFarm
    const tokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

    const erc20ABI = ERC20.abi
    const erc20Interface = new utils.Interface(erc20ABI)
    const erc20Contract = new Contract(tokenAddress, erc20Interface)
    const [amountToStake, setAmountToUnstake] = useState("0")

    // unstakeTokens(address _token) public {
    const { send: stakeSend, state: unstakeState } =
        useContractFunction(tokenFarmContract, "stakeTokens", {
            transactionName: "Stake Tokens",
        })

    const unstake = (amount: string) => {
        setAmountToUnstake(amount)
        return stakeSend(tokenFarmAddress, amount)
    }


    //useEffect
    useEffect(() => {
        if (unstakeState.status === "Success") {
            stakeSend(setAmountToUnstake, tokenAddress)
        }
    }, [unstakeState, setAmountToUnstake, tokenAddress])


    const [state, setState] = useState(unstakeState)

    useEffect(() => {
        if (unstakeState.status === "Success") {
            setState(unstakeState)
        } else {
            setState(unstakeState)
        }
    }, [unstakeState])

    return { unstake, state }
}