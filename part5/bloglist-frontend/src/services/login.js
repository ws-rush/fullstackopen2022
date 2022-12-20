const baseUrl = '/api/auth/login'

const login = async credentials => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  return await response.json()
}

const loginService = { login }
export default loginService