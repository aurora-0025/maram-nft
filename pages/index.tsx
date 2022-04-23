import { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from 'react';
import getWindowDimensions from './hooks/getWindowDimensions';
import Link from 'next/link';

const Home: NextPage = () => {  
  const [percentRef, percentInView] = useInView({
    triggerOnce: true,
    rootMargin: '-100px 0px',
  });

  const [percentValue, setPercentValue]= useState<number>(0);
  const [marqeeText, setMarqeeText]= useState<String[]>([". Revolutionizing Fundraisers"]);

  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;

    
    if (scrolled > 1000){
      setVisible(true)
    } 
    else if (scrolled <= 1000){
      setVisible(false)
    }
  };

  useEffect(()=> {
  if(typeof window!== "undefined"){
    window.addEventListener('scroll', toggleVisible);
  }
  }, [])  

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

  const { width } = getWindowDimensions();

  useEffect(()=>{
    let marqeeTexts: String[] = [];
    let noOfMarqeeText = width&& Math.floor(width/200);
    if(noOfMarqeeText){
      for (let i = 0; i < noOfMarqeeText; i++) {
      marqeeTexts.push(". Revolutionizing Fundraisers")
    }
    setMarqeeText(marqeeTexts)
  }
    },[width])

  return (
    <div className={styles.container}>
      <button className='w-[60px] h-[60px] fixed bottom-10 right-2 z-30 cursor-pointer' onClick={() => {const anchor = document.querySelector('#top')
      anchor?.scrollIntoView({ behavior: 'smooth', block: 'center' })}}
      style={{display: visible ? 'inline' : 'none'}}>
        <Image src="/home/scrollTop.svg" layout='fill' objectFit='cover'></Image>
      </button>
      <header id="top">
        <div className='flex font-bold justify-evenly items-center'>
          <Image src={'/Logo.svg'} width={110} height={151}></Image>
          <h1 className='text-[3em] sm:text-[4em] md:text-[10em] lg:[15em] font-display '>Maram</h1>
          <Image src={'/Logo.svg'} width={110} height={151}></Image>
        </div>
        <div> 
            <div className='flex flex-row border-2 justify-between border-black w-full'>
              <div className='py-5 xl:py-7 font-semibold'>
              <a className='mx-4 py-5 xl:py-7 cursor-pointer' onClick={() => {const anchor = document.querySelector('#home')
                anchor?.scrollIntoView({ behavior: 'smooth', block: 'center' })}}> Home</a>
              <a className='mx-4 py-5 xl:py-7 cursor-pointer' onClick={() => {const anchor = document.querySelector('#about')
                anchor?.scrollIntoView({ behavior: 'smooth', block: 'center' })}}> About Us</a>
              <a className='mx-4 py-5 xl:py-7 cursor-pointer' onClick={() => {const anchor = document.querySelector('#contact')
                anchor?.scrollIntoView({ behavior: 'smooth', block: 'center' })}}> Contact Us</a>
              </div>
              <button className='bg-black px-3 py-5 xl:py-7 text-white' onClick={() => {const anchor = document.querySelector('#contribute')
                anchor?.scrollIntoView({ behavior: 'smooth', block: 'center' })}}>CONTRIBUTE</button>
            </div>
        </div>
      </header>
        <section className='flex flex-col items-center sm:flex-row h-[840px]'>
          <div className='text-2xl md:text-3xl lg:text-4xl bg-[#8AD167] p-[2em] md:p-[2em] lg:p-[2.1em] xl:p-[4em] h-full text-left tracking-tight leading-tight w-full text-[#FEFA02]'>
            <p className='mb-3'>Welcome to the world of Maram.Feel free to look around. Contribute and #FORESTWITHUS</p>
            <p className='mb-3' id="home">Maram is an initiative of team ptrioFA aimed at restraining the current deforestation scenario of this world</p>
            <p>We provide a platform where every wellwisher benefits from their good deed irrespective of the intent.</p>
          </div>
          <div className='flex justify-center items-center relative bg-[#E8C85A] w-full h-full overflow-hidden'>
            <div className='absolute w-full scale-[150%] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'><Image src={'/home/title.svg'} width={1020} height={1050} ></Image></div>
            <div className='rotating w-[150px] md:w-[200px]'><Image src={'/home/titleText.svg'} width={300} height={300}></Image></div>
          </div>
        </section>
        <div className='relative'>
          <div className="absolute z-20 scale-x-150 -top-[60px] lg:-top-[50px] py-5 xl:py-[3em] w-full overflow-hidden bg-black drop-shadow-md rotate-[3deg]">
            <div className="marquee font-display text-4xl font-bold text-white">
              <div>
                {marqeeText.map((el, index)=> <p key={index}>{el}</p>)}
              </div>
            </div>
          </div>
        </div>
        <div id="about">
          <div id='aboutUsTitle' className="relative -mb-3 xl:-mb-3 h-[100px] md:h-[200px] w-screen bg-[#E8D9A7]">
            <Image src="/home/aboutus.svg" layout='fill' objectFit='cover'></Image>
          </div>
          <div className='flex flex-col md:flex-row w-screen bg-[#B3F49C]'>
            <div className='text-[#0073C6] font-bold border-box p-20 tracking-tight leading-tight text-md lg:text-lg'>
              <p className='mb-3'>Maram NFTs are a collection of tokens launched by team ptrioFA as a result of shaking hands with Gaia&lsquo;s dream, propogating the ideal of afforestation</p>
              <p>Here at Maram, for every NFT you mint, all the profit earned goes to Gaia&lsquo;s Dream which ensures that your contribution benefits the earth.</p>
            </div>
            <div className='relative mt-3 w-screen h-[300px] p-[3.5em] md:h-[inherit] overflow-hidden bg-[#74F3C5]'>
              <Image src='/home/treeimage.png' layout='fill' objectFit='cover'></Image>
            </div>
          </div>
        </div>
        <section id="cards" className='flex flex-col w-screen md:flex-row'>
            <div className='w-full h-[300px] relative bg-[#E26F6F] flex justify-center'>
              <Image src="/home/cardImg.svg" height={200} width={200} objectFit='contain'></Image>
            </div>
            <div className='w-full h-[300px] flex flex-col justify-center items-center text-6xl text-white relative bg-[#FF8F8F]'>
              <h1 className='font-bold' ref={percentRef}>{percentValue}%</h1>
              <h1 className='text-3xl font-bold mt-4'>ECO  FRIENDLY</h1>
            </div>
            <div className='w-full h-[300px] relative bg-[#F6F5F1] text-[#62D14B] text-sm font-bold flex flex-col justify-center items-center px-10'>
              <p>Gaia&lsquo;s Dream is a non-profit organization emphasized on global reforestation, creating biodiverse habitat and make a positive social impact around the globe</p>
              <p className='mt-4'>Since the NFTs are situated on a blockchain, we have set up Creator Earnings which is 5% of the resale transaction, deposited in the foundation&lsquo;s  crypto wallet.</p>
            </div>
        </section>
        <section id="rebuildEarth" className='relative bg-[#8AD167] p-3 text-center flex justify-evenly text-white items-center'>
          <Image src="/home/hammer.svg" height={200} width={200}></Image>
          <p className='px-20 text-md md:text-2xl'>Together we rebuild earth and ensure that our future generations get to percieve mother earth at its zenith.</p>
          <Image src="/home/spanner.svg" height={200} width={200}></Image>
        </section>
        <section id="contribute" className="relative -mb-3 xl:-mb-3 h-[300px] lg:h-[400px] w-screen bg-[#E8D9A7]" >
          <Image src={'/home/contribute.png'} layout='fill' objectFit='cover'></Image>
          <Link passHref href={"/mint"}><button className='absolute hover:scale-[105%] border-box p-2 md:p-3 text-[10px] md:text-lg left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#4B58D1] text-white font-semibold rounded-lg drop-shadow-lg '>Mint Now!</button></Link>
        </section>

        <section id="contact" className='flex font-bold justify-evenly items-center h-screen w-screen py-10 bg-[#FFFCE1]'>
          <Image src={'/Logo.svg'} width={110} height={151}></Image>
          <div className='w-[60%] flex flex-col text-center items-center justify-center'>
            <Image src={'/home/ptrioFa.svg'} width={300} height={200}></Image>
            <div className='mx-2 mt-4'>
            <p>We are a organization which specializes on providing aid to the required organizations to propagate their socially relevant causes.</p>
            <p>ptrioFA is a community that put forwards crypto as a viable solution to the problems that has been imposed upon the eniterty of our eco-system.</p>
            </div>
          </div>
          <Image src={'/Logo.svg'} width={110} height={151}></Image>
        </section>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
