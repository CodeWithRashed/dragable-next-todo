import Banner from '@/components/Banner'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

export default async function  Home() {

  return ( 
    <main className="">
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <section className='header bg-[#F8D57E]'>

      <Navbar></Navbar>
     <Banner></Banner>
      </section>
      <Footer></Footer>
    </main>
  )
}
