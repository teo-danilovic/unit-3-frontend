import { useState, useContext } from "react"
import { useNavigate } from "react-router"

import { signUp } from "../../services/authService"
import { UserContext } from "../../contexts/UserContext"

const SignUpForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  })
  const [message, setMessage] = useState('')

  const { setUser } = useContext(UserContext)

  const handleChange = (e) => {
    setMessage('')
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const newUser = await signUp(formData)

      setUser(newUser)

      navigate('/')
    } catch (e) {
      setMessage(e.message)
    }
  }

  const isFormInvalid = () => {
    if (formData.username === '')  {
      return true
    }

    if (formData.password === '') {
      return true
    }

    if (formData.password !== formData.passwordConf) {
      return true
    }
  }

  return (
    <main>
      <h1>Sign Up</h1>
      <p>{message}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="passwordConf">Confirm Password: </label>
          <input
            type="password"
            id="passwordConf"
            name="passwordConf"
            value={formData.passwordConf}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button disabled={isFormInvalid()} type="submit">Sign Up</button>
          <button onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </main>
  )
}

export default SignUpForm