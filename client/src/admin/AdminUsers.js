import axios from "axios"
import { useEffect, useState } from "react"
import "./admin.css"
import UserModal from "./UserModal"


export default function AdminUsers() {
    const url = 'http://localhost:4000'
    const [user,setUser] = useState([])

    const getUsers = async () => {
        try{
            const response = await axios.get(`${url}/get-users`,{
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            setUser(response.data)
            if(response.status === 200){
                console.log('Ok')
            }else{
                console.log('Error to get data')
            }
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getUsers()
    },[])

    return (
        <div  className="admin-container">
            {user && (
                <div>
                    {user.map((user) => (
                        <div key={user._id} className="admin-user">
                            <div className="admin-image-div">
                                <img src={url+'/'+user.photo} alt={user.firstName} className="admin-img object-cover" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">{user.firstName} {user.lastName}</h2>
                                
                                <p className="text-purple-800">{`Number: ${user.number}`}</p>
                                <p className="text-green-800">{`Email: ${user.email}`}</p>
                                <p className="text-yellow-800">{`Admin: ${user.isAdmin ? 'Yes' : 'No'}`}</p>
                            </div>
                        </div>
                      
                    ))
                    }
                    
                </div>
            )}
        {!user && (
            <div>
                <h1 className="text-2xl mb-4">No User Found</h1>
            </div>
        )}
        <UserModal/>
        </div>
    )
    }