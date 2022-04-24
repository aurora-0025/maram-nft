import { NextPage } from "next";
import Image from "next/image";
import styles from '../styles/Utils.module.css'
import React, { useEffect, useState } from "react"
import {BigNumber, ethers} from "ethers";
import config from "../config.json";

interface Loading {
    loading: boolean
    msg: string
}

const Mint:NextPage = () =>{
    const [accounts, setAccounts] = useState([]);
    const [IsInstalled, setIsInstalled] = useState(false);
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [Error, setError] = useState<string | null>(null);
    const [allMintedMarams, setAllMintedMarams] = useState<any[]>([]);
    const [myMintedMarams, setMyMintedMarams] = useState<any[]>([]);
    const [loading, setLoading] = useState<Loading>({loading: false, msg: "Loading"});
    const [toggle, setToggle] = useState<boolean>(true);

    const isConnected = Boolean(accounts[0]);

    useEffect(() => {
      if(window.ethereum){
          setIsInstalled(true);
      }

      else{
          setIsInstalled(false);
      }
    }, []);


   const fetchMarams = async () => {
    setLoading({loading: true, msg: "Loading"});
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract= new ethers.Contract(
        config.MARAM_TOKEN_ADDRESS,
        config.abi,
        signer
    );
    setContract(contract);
   
    const minted =  await contract.totalSupply();
    const myMinted = await contract.walletOfOwner(accounts[0]);

    const mintedMarams = [];
    const myMintedMarams = []


    for (let id = 1; id <= minted; id++) {
        const res = await fetch(`https://gateway.pinata.cloud/ipfs/QmQQtJ5BNumWGN9VNetAqK3mNixnKyeMn97NwwVvNcrEMm/${id}.json`);
        const resJson = await res.json();

        mintedMarams.push({
            id: `${id}`,
            name: resJson.name,
            image: resJson.image.replace("ipfs://", "https://ipfs.io/ipfs/")
        })
    }

    for(let id of myMinted){
        const res = await fetch(`https://gateway.pinata.cloud/ipfs/QmQQtJ5BNumWGN9VNetAqK3mNixnKyeMn97NwwVvNcrEMm/${id}.json`);
        const resJson = await res.json();

        myMintedMarams.push({
            id: `${id}`,
            name: resJson.name,
            image: resJson.image.replace("ipfs://", "https://ipfs.io/ipfs/")
        })
    }

    setAllMintedMarams(mintedMarams);
    setMyMintedMarams(myMintedMarams);

    setLoading({loading: false, msg: "Loading"});
    
   }

    useEffect(() => {
        if(isConnected){
            fetchMarams()
        }
    }, [isConnected])

   async function connectAccount() {
        if(window.ethereum) { 
            try {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                })
                setAccounts(accounts);
            } catch (error: any) {
                if(error.code == '-32002'){
                    setError('Already Processing A Request')
                }
            }           
        }
        else setIsInstalled(false);
   }
   
    return (
    <div>
        {!loading.loading? (
        <div>
            {isConnected? (
                <div className="h-screen w-screen bg-[#74F3C5]">
                    <div id="nav" className="w-screen pt-5 max-h-[300px] flex justify-evenly items-center">
                            <button onClick={()=>setToggle(true)} className={`${toggle? ("text-[#0073C6]") : ("text-[#2E2E2E]") } text-4xl`}>All Marams</button>
                            <Image src="/LogoCol.svg" width={100} height={100}></Image>
                            <button onClick={()=>setToggle(false)} className={`${!toggle? ("text-[#0073C6]") : ("text-[#2E2E2E]") } text-4xl`}>My Marams</button>
                    </div>
                    {toggle?
                    (
                    <div className={`${styles.horizontalScrollContainer}`}>
                    {allMintedMarams.map((maram, ind)=> (
                        <div className={"p-3 bg-white m-4 rounded-md"} key={ind}><h1>{maram.name}</h1><img className="min-w-[300px] min-h-[420px]" src={maram.image}></img></div>
                    ))}
                    </div> 
                    ):(
                        <div> 
                            {(myMintedMarams.length != 0)? (
                                <div className={`${styles.horizontalScrollContainer}`}>
                                    {myMintedMarams.map((maram, ind)=> (
                                    <div className={"p-3 bg-white m-4 rounded-md"} key={ind}><h1>{maram.name}</h1><img className="min-w-[300px] min-h-[420px]" src={maram.image}></img></div>
                                        ))}
                                </div> 
                            ):(
                                <div className="h-[500px] text-4xl w-full flex justify-center items-center">
                                    You Currently Dont Have Any Marams
                                </div>
                            )}

                        </div>

                    )
                    }


                </div>
        ):( 
            <div>
                {IsInstalled? (
                    <section className="mt-[30%] md:mt-[10%] ml-[50px] text-lg md:text-xl font-bold leading-tight">
                        <p>Welcome,<br/>connect your wallet to view our collection</p>
                        <p className="mb-2">Please download <span className="text-[#FEFA02]">MetaMask</span> browser extension to proceed.</p>
                        <button onClick={connectAccount} className="mintButton">CONNECT WALLET</button>
                    </section>
                    ): (
                        <h1>Install MetaMask</h1>
                        )}
                        </div>
                        )}
                        {Error && 
                            (<p className="text-red-500 mt-10 text-xs font-semibold">{Error}</p>)}
                        </div>
                       ):(
                            <div className="h-screen w-screen backdrop-blur-md bg-white/30 z-30 absolute flex justify-center items-center">
                                <h1 className="text-5xl">{loading.msg}...</h1>
                            </div>
                        )}
                    </div>

    )}
export default Mint;