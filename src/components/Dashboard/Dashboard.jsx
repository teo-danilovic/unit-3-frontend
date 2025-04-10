import { useEffect, useContext } from "react"
import { useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import * as UserService from "../../services/userService"

const Dashboard = () => {
    const { user } = useContext(UserContext);
    const [fetchedUsers, setFetchedUsers] = useState([])


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedData = await UserService.index()
                console.log(fetchedData);
                setFetchedUsers(fetchedData)
            } catch (err) {
                console.log(err);

            }
        }
        if (user) fetchUsers()
    }, [user])

    return (
        <main>
            <h1>Welcome, {user.username}</h1>
            <p>
                This dashboard page is for you to see all users:
            </p>
            <ul>
                {fetchedUsers.map((user, idx) => (
                    <li key={idx}>{user.username}</li>
                ))}
            </ul>
        </main>
    )
}

export default Dashboard