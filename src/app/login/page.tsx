"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-center mt-16">
        <div className="min-w-[30%]">
          <div
            className="shadow-lg flex min-h-full flex-1 flex-col 
justify-center px-6 py-12 lg:px-8 bg-white"
          >
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="flex justify-center">
                <Image src="/logo.png" height={70} width={70} alt="logo" />
              </div>
              <h2
                className="mt-5 text-center text-2xl font-bold leading-9 
tracking-tight text-gray-900"
              >
                Sign In to Your Account
              </h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 
text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
focus:ring-bg-btn-primary-bg sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 
text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 p
placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
focus:ring-bg-btn-primary-bg sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => {
                      router.push("/dashboard");
                    }}
                    className="flex w-full justify-center 
rounded-md bg-btn-primary-bg px-3 py-1.5 text-sm font-semibold leading-6 
text-white shadow-sm hover:bg-bgttext-btn-primary-bg/[.7] focus-visible:outline 
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-btn-primary-bg"
                  >
                    Sign in
                  </button>
                </div>
                <div>
                  <button
                    // onClick={() => signIn("google")}
                    className="flex w-full justify-center rounded-md bg-btn-primary-bg px-3 
py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-bgttext-btn-primary-bg/[.7] 
focus-visible:outline focus-visible:outline-2 
focus-visible:outline-offset-2 focus-visible:outline-bg-btn-primary-bg"
                  >
                    <div className="flex">
                      Sign in with Google
                      <span className="mx-3">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="24" height="24" fill="none" />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M23.04 12.2614C23.04 11.4459 22.9668 10.6618 
22.8309 9.90909H12V14.3575H18.1891C17.9225 15.795 17.1123 17.013 15.8943 
17.8284V20.7139H19.6109C21.7855 18.7118 23.04 15.7636 23.04 12.2614Z"
                            fill="#4285F4"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 23.4998C15.105 23.4998 17.7081 22.4701 19.6109 
20.7137L15.8943 17.8282C14.8645 18.5182 13.5472 18.926 12 18.926C9.00474 18.926 6.
46951 16.903 5.56519 14.1848H1.72314V17.1644C3.61542 20.9228 7.50451 23.4998 12 23.4998Z"
                            fill="#34A853"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.56523 14.1851C5.33523 13.4951 5.20455 12.758 
5.20455 12.0001C5.20455 11.2421 5.33523 10.5051 5.56523 
9.81506V6.83551H1.72318C0.944318 8.38801 0.5 10.1444 0.5 12.0001C0.5 13.8557 
0.944318 15.6121 1.72318 17.1646L5.56523 14.1851Z"
                            fill="#FBBC05"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 5.07386C13.6884 5.07386 15.2043 5.65409 16.3961 
6.79364L19.6945 3.49523C17.7029 1.63955 15.0997 0.5 12 0.5C7.50451 0.5 3.61542 
3.07705 1.72314 6.83545L5.56519 9.815C6.46951 7.09682 9.00474 5.07386 12 5.07386Z"
                            fill="#EA4335"
                          />
                        </svg>
                      </span>
                    </div>
                  </button>
                </div>
              </form>

              <p className="mt-5 text-center text-sm text-gray-500">
                New Here?
                <span
                  className="font-semibold leading-6 text-blue-500  
cursor-pointer"
                  onClick={() => {
                    router.push("/signup");
                  }}
                >
                  Create an Account
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
