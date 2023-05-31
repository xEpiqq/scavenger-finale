'use client'
import { useState, useEffect } from "react";
import GoogleLogin from "../GoogleLogin";

function SignupModal(props) {

  const { setSignup } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleBtn, setGoogleBtn] = useState("Signup");
  const [message, setMessage] = useState(null);

    const handleEscape = (e) => {
    if (e.key === "Escape") {
        setSignup(false);
    }
    };

    useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => {
        document.removeEventListener("keydown", handleEscape);
    };
    }, []);


  return (
    <>


        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20 ">
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center z-20 " onClick={() => {setSignup(false)}} />

          <div className="bg-pbblack relative rounded-lg p-8 pt-20 w-11/12 h-1/2 z-30 text-white -mt-48 shadow-lg sm:w-3/4 md:w-1/2 lg:w-4/12 xl:w-3/12">
            <div className="absolute px-2 mt-4 mr-4 top-0 right-0 border border-px border-yellow rounded-md opacity-60 cursor-pointer hover:opacity-100 duration-150 transition-all" onClick={() => {setSignup(false)}}>
              esc 
            </div>
            

            <h2 className="text-2xl font-bold mb-4">Get Early Access</h2>
            {/* <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-primary hover:bg-black/30 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form> */}
            <div className="mt-4">
              <p className="text-sm">
                Signup with google to get early access to Scavenger.
              </p>
              <div className="mt-4">
              <GoogleLogin method={googleBtn}/>

              </div>

              {googleBtn === "Signup" ? (
              <p className="text-sm">
                Already have an account?{" "}
                <a
                  className="text-primary font-semibold cursor-pointer"
                  onClick={() => setGoogleBtn("Login")}
                >
                  Log in
                </a>
              </p>) : (
              <p className="text-sm">
                Don't have an account?{" "}
                <a
                  className="text-primary font-semibold cursor-pointer"
                  onClick={() => setGoogleBtn("Signup")}
                >
                  Sign up
                </a>
              </p>
              )}
            </div>
          </div>
        </div>

    </>
  );
  }

export default SignupModal;