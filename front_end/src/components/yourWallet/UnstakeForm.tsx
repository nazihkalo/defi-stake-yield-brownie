import React, { useState, useEffect } from "react"
import { Token } from "../Main"
import { useEthers, useTokenBalance, useNotifications } from "@usedapp/core"
import { formatUnits } from "@ethersproject/units"
import { Button, Input, CircularProgress, Snackbar } from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import { useUnstakeTokens, useStakeTokens } from "../../hooks"
import { utils } from "ethers"

export interface UnstakeFormProps {
    token: Token
}

export const UnstakeForm = ({ token }: UnstakeFormProps) => {
    const { address: tokenAddress, name } = token
    const { account } = useEthers()
    const tokenBalance = useTokenBalance(tokenAddress, account)
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    const { notifications } = useNotifications()

    const [amount, setAmount] = useState<number | string | Array<number | string>>(0)
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = event.target.value === "" ? "" : Number(event.target.value)
        setAmount(newAmount)
        console.log(newAmount)
    }

    const { unstake, state: unstakeErc20State } = useUnstakeTokens(tokenAddress)
    const handleUnstakeSubmit = () => {
        const amountAsWei = utils.parseEther(amount.toString())
        return unstake(amountAsWei.toString())
    }

    const isMining = unstakeErc20State.status === "Mining"
    const [showUnstakeTokenSuccess, setShowUnstakeTokenSuccess] = useState(false)
    const handleCloseSnack = () => {
        setShowUnstakeTokenSuccess(false)
    }

    useEffect(() => {
        if (notifications.filter(
            (notification) =>
                notification.type === "transactionSucceed" &&
                notification.transactionName === "Unstake Tokens"
        ).length > 0) {
            setShowUnstakeTokenSuccess(true)
        }
    }, [notifications, showUnstakeTokenSuccess])

    return (
        <>
            <div>
                <Input
                    onChange={handleInputChange} />
                <Button
                    onClick={handleUnstakeSubmit}
                    color="primary"
                    size="large"
                    disabled={isMining}>
                    {isMining ? <CircularProgress size={26} /> : "Unstake!!!"}
                </Button>
            </div>
            <Snackbar
                open={showUnstakeTokenSuccess}
                autoHideDuration={5000}
                onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">
                    Tokens Unstaked!
                </Alert>
            </Snackbar>
        </>
    )
}