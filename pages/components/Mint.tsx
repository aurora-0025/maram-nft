import Image from "next/image";
import React, {useEffect, useState } from "react"
import Install from "./Install";
import MainMint from "./MainMint";
import getWindowDimensions from "../../hooks/getWindowDimensions";
import { useInView } from "react-intersection-observer";

const hasWindow = typeof window !== 'undefined';

const Mint:React.FC = () =>{
    const [accounts, setAccounts] = useState([]);
    const [IsInstalled, setIsInstalled] = useState(false);
    const [Error, setError] = useState<string | null>(null);
    const [marqeeText, setMarqeeText]= useState<string[]>(["MINT"]);
    const [percentRef, percentInView] = useInView({
        triggerOnce: true,
        rootMargin: '-100px 0px',
      });
    
      const [percentValue, setPercentValue]= useState<number>(0);    
      useEffect(()=>{
      if(percentInView){
        var range = 100 - 0;
        var current = 0;
        var increment = 100 > 0? 1 : -1;
        var stepTime = Math.abs(Math.floor(2000 / range));
        var timer = setInterval(function() {
            current += increment;
            setPercentValue(current)
            if (current == 100) {
                clearInterval(timer);
            }
        }, stepTime);
      }
      },[percentInView])

    const isConnected = Boolean(accounts[0]);

    useEffect(() => {
      if(window.ethereum){
          setIsInstalled(true);
      }

      else{
          setIsInstalled(false);
      }
    }, []);

    const { width } = getWindowDimensions();

    useEffect(()=>{
        let marqeeTexts: string[] = [];
        let noOfMarqeeText = width&& Math.floor(width/100);
        if(noOfMarqeeText){
          for (let i = 0; i < noOfMarqeeText; i++) {
          marqeeTexts.push('MINT')
        }
        setMarqeeText(marqeeTexts)
      }
    },[width])
    


   async function connectAccount() {
    if (typeof window !== "undefined") {
        // Client-side-only code
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
   }
    return (
    <div>    
        <div className="flex flex-col w-screen h-screen bg-[#8AD167] text-[#FEFA02] overflow-hidden">
                    <section className='bg-[#fff] relative flex flex-col items-center sm:flex-row h-[240px] w-[944]'>
                        <Image src={'/mint/diagImg.svg'} layout="fill" objectFit='cover'></Image>
                    </section>
                    <section className='relative'>
                        <div className="absolute z-20 scale-x-150 -top-[60px] lg:-top-[80px] py-5 md:py-[2.5em] xl:py-[3.5em] w-full overflow-hidden bg-black drop-shadow-md rotate-[7deg]">
                            <div className="marquee text-4xl md:5xl xl:text-6xl font-bold text-white">
                                <div>
                                    {marqeeText.map((el, index)=> <div key={index} className="flex items-center"><p>{el}</p><Image src="/mint/marqeeMint.svg" width={68} height={68} layout="fixed"></Image> <p>{el}</p><Image src="/mint/marqeeMint.svg" width={68} height={68} layout="fixed"></Image></div>)}
                                </div>
                            </div>
                        </div>
                    </section>
                    {isConnected? (
            <MainMint accounts={accounts}/> 
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
                        <Install />
                        )}
                        </div>
                        )}
                        {Error && 
                            (<p className="text-red-500 mt-10 text-xs font-semibold">{Error}</p>)}

                        <section className="min-h-[200px]">
                            <div className="absolute bottom-0 right-0 flex overflow-hidden space-x-7 justify-end">
                                <div className="rotating min-w-[80px] mr-7 overflow-y-hidden">
                                    <Image src={'/mint/rotImg.svg'} width={200} height={200}></Image>
                                </div>
                                <Image className="w-[50px]" src={'/mint/GDLogo.svg'} width={200} height={200}></Image>
                                <div className='flex min-w-[150px] max-w-[150px] flex-col justify-center items-center text-5xl text-[#FEFA02]'>
                                    <h1 className='font-bold' ref={percentRef}>{percentValue}%</h1>
                                    <h1 className='text-sm font-bold mt-4'>ECO  FRIENDLY</h1>
                                </div>
                             </div>
                        </section>
                        </div>
                    </div>

    )}
export default Mint;