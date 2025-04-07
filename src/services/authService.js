const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

const signUp = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    const data = await res.json()

    if (data.err) {
      throw new Error(data.err)
    }

    if (data.token) {
      localStorage.setItem('token', data.token)
      return JSON.parse(atob(data.token.split('.')[1])).payload
    }

    throw new Error('Received invalid response from the server')
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}

const signIn = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    const data = await res.json()

    if (data.err) {
      throw new Error(data.err)
    }

    if (data.token) {
      localStorage.setItem('token', data.token)
      return JSON.parse(atob(data.token.split('.')[1])).payload
    }

    throw new Error('Received invalid response from the server')
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}

export {
  signUp,
  signIn
}