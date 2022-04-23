import { NextPage } from "next";
import Image from "next/image";
import styles from '../styles/Utils.module.css'
import React, { useEffect, useState } from "react"
import {ethers} from "ethers";
import config from "../config.json" 

const Mint:NextPage = () =>{
    const [accounts, setAccounts] = useState([]);
    const [IsInstalled, setIsInstalled] = useState(false);
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [Error, setError] = useState<string | null>(null);
    const [allMintedMarams, setAllMintedMarams] = useState<any[]>([]);

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
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract= new ethers.Contract(
        config.MARAM_TOKEN_ADDRESS,
        config.abi,
        signer
    );
    setContract(contract);
   
    const minted =  await contract.totalSupply();
    const mintedMarams = [];
    for (let id = 1; id <= minted; id++) {
        const res = await fetch(`https://gateway.pinata.cloud/ipfs/QmQQtJ5BNumWGN9VNetAqK3mNixnKyeMn97NwwVvNcrEMm/${id}.json`);
        const resJson = await res.json();
        mintedMarams.push({
            id: `${id}`,
            name: resJson.name,
            image: resJson.image.replace("ipfs://", "https://ipfs.io/ipfs/")
        })
    }
    setAllMintedMarams(mintedMarams)
   }

    useEffect(() => {
        if(isConnected){
            fetchMarams();
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
        <div>
            {isConnected? (
                <div className="h-screen w-screen bg-[#74F3C5]">
                    <div id="nav" className="w-screen pt-5 max-h-[300px] flex justify-evenly items-center">
                            <button className="text-4xl">All Marams</button>
                            <Image src="/LogoCol.svg" width={100} height={100}></Image>
                            <button className="text-4xl">My Marams</button>
                    </div>
                    <div className={`${styles.horizontalScrollContainer}`}>
                        {allMintedMarams.map((maram, ind)=> (
                            <div key={ind}><h1>{maram.name}</h1><img className="w-[256px]" src={maram.image}></img></div>
                        ))}
                    </div>

                </div>
        ):( 
            <div>
                {IsInstalled? (
                    <section className="mt-[30%] md:mt-[10%] ml-[50px] text-lg md:text-xl font-bold leading-tight">
                        <p>Welcome,<br/>This is the first step to own your Maram.</p>
                        <p className="my-2">Minting our Maram NFTs require <span className="text-[#FEFA02]">MetaMask</span> Wallet</p>
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
                    </div>

    )}
export default Mint;