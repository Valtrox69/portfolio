'use client'

import Arrow from "@/static/Arrow";
import SocialMedia from "@/static/SocialMedia";
import Typing from "@/static/Typing";
import Link from "next/link";

function Hero() {
    return <div id="Home" className="flex items-center flex-col min-h-screen desktop:px-20 mobile:p-6 bg-gradient-to-r from-gradientLeft to-gradientRight">
    <div className="flex mobile:justify-center desktop:flex-row desktop:items-center mobile:flex-col-reverse items-center w-full flex-1">
            <div className="flex flex-col z-20 pointer-events-none text-white w-full text-center">
                <p className="desktop:text-[4vw] mobile:text-[8vw] font-bold text-lightcyan w-full">Welcome to<br/> Valtrox Creations</p>
                <p className="desktop:text-[3vw] mobile:text-[5vw]">I'm an artist with experience in
                    <Typing />
                </p>
                <div className='flex mobile:hidden mt-6 justify-center w-full'><SocialMedia size={20} /></div>
            </div>
        </div>
        <div className="desktop:absolute desktop:bottom-10 inset-0 flex items-end py-2 justify-center z-10">
        <Link href={"/#About"} aria-label='About' >
            <Arrow />
        </Link>
    </div>
    </div>
}

export default Hero;