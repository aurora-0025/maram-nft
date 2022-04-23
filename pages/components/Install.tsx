import Image from "next/image";
import Link from "next/link";
import React from "react";
const Install: React.FC = () => {
    return (
        <section className="mt-[30px] ml-[50px] text-xl font-bold leading-tight">
            <Image src="/mint/metamask-fox.svg" width={112} height={112}></Image>
                    <p className="my-2">MetaMask was not detected on your browser.</p>
                    <p className="mb-2">Please download MetaMask by clicking the button below.</p>
            <button className="mintButton">INSTALL METAMASK</button>
        </section>
    )
}

export default Install;