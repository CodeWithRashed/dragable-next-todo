"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { signOut, useSession } from "next-auth/react";
const Navbar = () => {
  const path = usePathname()
  const { data: session } = useSession();
  return (
    <div className="flex justify-between items-center pt-2 max-w-[1240px] px-5 mx-auto">
    <div className="logo flex justify-center items-center gap-2">
        <Link href="/" className="h-10 w-10">
            <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="Logo"
            className="h-10 w-10 object-cover"
            ></Image>
             <p>Next Todo</p>
        </Link>
       
    </div>
    <div className="menu flex justify-center items-center gap-4">

      <Link href="/" className={`${path === "/" ? "border-b-2 border-btn-primary-bg" : "border-b-2 border-transparent text-bold "}`}>Home</Link>
      <Link href="/dashboard " className={`${path === "/dashboard" ? "border-b-2 border-btn-primary-bg" : "border-b-2 border-transparent text-bold "}`}>Dashboard</Link>
    </div>
    <div className="cta">
      {
        session?.user?.email ? <button onClick={ ()=>{ signOut()}} className={`bg-btn-primary-bg px-2 py-1 text-white font-bold`}>
        SignOut
    </button> :  <Link href="/login" className={`bg-btn-primary-bg px-2 py-1 text-white font-bold}`}>
            Login
        </Link>
      }
       
    </div>
    </div>
  )
}

export default Navbar
