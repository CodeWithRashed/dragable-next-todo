import Link from "next/link"

const Footer = () => {
  return (
    <div className="bg-text-primary">
    <div className="max-w-[1240px] mx-auto px-5">
        <div className="copyright" > &copy; 2023 Next Todo All Rights Reserved!</div>
        <div className="social-media">
        <Link href="youtube" className="bg-text-secondary p-3"></Link>
        </div>
    </div>
      Footer
    </div>
  )
}

export default Footer
