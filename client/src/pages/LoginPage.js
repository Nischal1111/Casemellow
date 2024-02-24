import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../css/login.css"
import '../App.css'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { UserContext } from "../UserContex";


export default function LoginPage() {

    const url = "http://localhost:4000"

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [redirect, setRedirect] = useState(false)
    // const [userId, setUserId] = useState('')
    const {setUserInfo} = useContext(UserContext)
    const [loginErr, setLoginErr] = useState(false)

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await axios.post(`${url}/login`, {
                email: email,
                password: password
            })
            if (response.status === 200) {
                console.log("Login Successful")
                // console.log("Login",response.data) 
                setUserInfo(response.data.user)
                //storing user data in local storage unless they logout
                localStorage.setItem("userInfo", JSON.stringify(response.data.user))
                // console.log("Data saved in local Storage.")
                
                setEmail('')
                setPassword('')
                setLoading(false)
                setRedirect(true)
                setLoginErr(false)
            } else {
                console.log("Login Failed")
                setLoading(false)
                setLoginErr(true)
            }
        } catch (error) {
            console.log("Error while login : ", error)
            setLoading(false)
            setLoginErr(true)
        }
    }


    if(redirect){
        return <Navigate to={`/`} />;
    }

    const backgroundImageUrl = "https://images.pexels.com/photos/9956771/pexels-photo-9956771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    return (
        <div
            className="flex items-center justify-center h-screen"
            style={{ backgroundImage: `url(${backgroundImageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
            <div className="absolute inset-0 bg-black opacity-40"></div>
            <div className=" login-container relative bg-transparent">
                <h1 className=" login-text font-bold mb-6 text-white">Login</h1>
                {loading ? (<span className="loader"></span>) :(
                    <>
                        <form onSubmit={loginUser}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="login-input max-w-md mt-1 p-2 w-full"
                                    placeholder="Email/Username"
                                />
                                <FaUser className="login-icon"/>
                            </div>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className=" login-input max-w-md mt-1 p-2 w-full "
                                    placeholder="Password"
                                />
                                <FaLock className="login-icon2"/>
                            </div>
                            {loginErr && (
                                <p className="text-red-500 text-sm mb-4">
                                    Invalid email or password
                                </p>
                            )}
                            <button
                                type="submit"
                                className="login-button"
                            >
                                Login
                            </button>
                        </form>
                        <div className="mt-4">
                            <p className="text-sm text-white">
                                Don't have an account?{" "}
                                <Link to="/register" className="text-red-500 hover:underline">
                                    Register here
                                </Link>
                            </p>
                        </div>
                    </>
                ) }
            </div>
        </div>
    );
}
