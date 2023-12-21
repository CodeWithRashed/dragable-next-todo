import Banner from '@/components/Banner'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { options } from './api/auth/[...nextauth]/options'

export default async function  Home() {
  const session =  await getServerSession(options)
  console.log(session?.user)
  return ( 
    <main className="">
      <section className='header bg-[#F8D57E]'>

      <Navbar></Navbar>
     <Banner></Banner>
      </section>
    </main>
  )
}
