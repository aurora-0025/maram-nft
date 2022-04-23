import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import {ethers} from "ethers";
import config from "../../config.json";

interface Props  {
    accounts: string[];
}

interface Loading {
    loading: boolean
    msg: string
}

const hasWindow = typeof window !== 'undefined';


const MainMint: React.FC<Props> = ({accounts})=> {

    const [mintAmount, setMintAmount] = useState<number>(1);
    const [plusDisabled, setPlusDisabled] = useState<boolean>(false);
    const [minusDisabled, setMinusDisabled] = useState<boolean>(true);
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [mintedAmount, setMintedAmount] = useState<string | null>(null);
    const [balance, setBalance] = useState<string|null>(null);
    const [loading, setLoading] = useState<Loading>({loading: true, msg: "Loading"});

    const fetchData = async () => {
            if(hasWindow) {
            // Client-side-only code
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract= new ethers.Contract(
                config.MARAM_TOKEN_ADDRESS,
                config.abi,
                signer
            );
            setContract(contract);
            const balance = await provider.getBalance(accounts[0]);
            setBalance(ethers.utils.formatEther(balance));
            const minted =  await contract.totalSupply()
            setMintedAmount(minted.toString())
            }
          }

    useEffect(()=>{
    if(hasWindow){
        if (window.ethereum) {
            setLoading({loading: true, msg: "Loading"});
            fetchData().then(()=>setLoading({loading: false, msg: "Loading"})).catch((error)=>console.log(error))
        }
    }
    }, [hasWindow])

    useEffect(()=>{
        setPlusDisabled(Boolean(mintAmount == 10));
        setMinusDisabled(Boolean(mintAmount == 1));
    }, [mintAmount])

    function incrementAmount() {
        if(mintAmount == 10) {
            return;
        };
        setMintAmount(mintAmount + 1);
    }
    function decrementAmount() {
        if(mintAmount == 1) {
            return;
        };
        setMinusDisabled(false);
        setMintAmount(mintAmount - 1);
    }

    async function handleMint() {
            if(contract){
                try {
                    setLoading({loading: true, msg: "Awaiting Transaction"})
                    const response = await contract.mint(accounts[0], mintAmount, {
                        value: ethers.utils.parseEther(`${mintAmount}`),
    
                        // Development price
                        // value: 0,
                      });
                    response.wait().then((txn: any)=>{
                        console.log(txn)
                        fetchData().then(()=>setLoading({loading: false, msg: "Loading"})).catch((error)=>console.log(error))  
                    }).catch(
                        setLoading({loading: false, msg: "Loading"})
                    )
                } catch (error) {
                    console.log(error);
                    setLoading({loading: false, msg: "Loading"})
                }
            }
        }

    return (
        <>
        {!loading.loading? (
                <section className="border-box mt-[20%] md:mt-[10%]  ml-[50px] text-xl font-syne">
                <div className="p-5 flex flex-col justify-center items-center border-4 rounded-lg border-[#FEFA02] w-max space-y-3">
                    {mintedAmount? (
                    <div className="flex flex-col items-center justify-center"> 
                    <p className="text-5xl">{mintedAmount}/500</p>
                    <p className="text-4xl">NFTs MINTED</p>
                    </div>
                    ): <h1>Loading</h1>
                    }
                    <h1 className="text-2xl">1 <span className="text-[#FEFA02]">Maram</span> = 1 <span className="text-[#FEFA02]">Matic</span></h1>
                    <div className="flex items-center space-x-5">
                        <button onClick={decrementAmount} style={{boxShadow:"1px 3px #000", color:"#000"}} className={minusDisabled? `bg-[#D7D442] my-2 rounded-lg px-[20px] cursor-default` : `bg-[#E1DE00] my-2 rounded-lg px-[20px]`}>-</button>
                        <div style={{boxShadow:"1px 3px #000, 0 0 10px 2px #daff0a, 0px 4px 20px rgba(0, 0, 0, 0.25)", color:"#000"}} className="min-w-5 text-center bg-[#E1DE00] my-2 rounded-lg px-[50px]">{`${mintAmount}`}</div>
                        <button onClick={incrementAmount} style={{boxShadow:"1px 3px #000", color:"#000"}} className={plusDisabled? `bg-[#D7D442] my-2 rounded-lg px-[20px] cursor-default` : `bg-[#E1DE00] my-2 rounded-lg px-[20px]`}>+</button>
                    </div>
                    <button onClick={handleMint} style={{boxShadow:"1px 3px #000, 0 0 10px 2px #daff0a, 0px 4px 20px rgba(0, 0, 0, 0.25)", color:"#000"}} className="min-w-5 text-center bg-[#E1DE00] my-2 rounded-lg px-[50px]">MINT NOW</button>
                    {mintedAmount? (
                    <p>Wallet Balance:<span className="text-[#000]">{` ${balance?.slice(0, 6)} MATIC`}</span></p>
                    ): <h1>Loading</h1>
                    }
                </div>
            </section>
        ):(
            <div className="h-screen w-screen backdrop-blur-md bg-white/30 z-30 absolute flex justify-center items-center">
                <h1 className="text-5xl">{loading.msg}...</h1>
            </div>
        )}
        </>
    )}

export default MainMint;