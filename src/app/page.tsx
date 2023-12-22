import Banner from '@/components/Banner'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default async function  Home() {

  return ( 
    <main className="">
      <section className='header bg-[#F8D57E]'>

      <Navbar></Navbar>
     <Banner></Banner>
      </section>
      <Footer></Footer>
    </main>
  )
}
