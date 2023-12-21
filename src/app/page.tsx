import Banner from '@/components/Banner'
import Navbar from '@/components/Navbar'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="">
      <section className='header bg-[#F8D57E]'>

      <Navbar></Navbar>
     <Banner></Banner>
      </section>
    </main>
  )
}
