import Link from "next/link"
import { FaFacebook, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="bg-[#2D2D2D]">
    <div className="max-w-[1240px] mx-auto px-5 flex justify-between text-white py-3 items-center">
        <div className="copyright" > &copy; 2023 Next Todo All Rights Reserved!</div>
        <div className="social-media flex gap-2">
        <Link href="https://www.facebook.com/CodeTravelGame/" className="bg-[#4E4D4D] flex gap-2 rounded-full text-white p-2">
      <FaFacebook/>
      
        </Link>
        <Link href="https://www.linkedin.com/in/codewithrashed/" className="bg-[#4E4D4D] flex gap-2 rounded-full text-white p-2">
      <FaLinkedin/>

        </Link>
        </div>
    </div>
     
    </div>
  )
}

export default Footer
