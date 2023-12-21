import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
  return (
    <div className="flex justify-between items-center mt-2 max-w-[1240px] px-5 mx-auto">
    <div className="logo">
        <Link href="/" className="h-10 w-10">
            <Image
            src="/logo.png"
            width={40}
            height={40}
            alt="Logo"
            className="h-10 w-10 object-cover"
            ></Image>
        </Link>
    </div>
    <div className="menu">

      <Link href="/">Home</Link>
      <Link href="/dashboard">Dashboard</Link>
    </div>
    <div className="cta">
        <Link href="login">
            Login
        </Link>
    </div>
    </div>
  )
}

export default Navbar
