//frontend/utils.js
const baseUrl = 'http://104.243.32.219:1337'

async function fetchQuery(path, params = null) {
  let url
  if (params !== null) {
    url = `${baseUrl}/${path}/${params}`
  } else {
    url = `${baseUrl}/${path}`
  }
  const response = await fetch(`${url}`)
  const data = await response.json()
  return data
}

async function fetchPost(path, params = null, body) {
  let url
  if (params !== null) {
    url = `${baseUrl}/${path}/${params}`
  } else {
    url = `${baseUrl}/${path}`
  }

  const response = await fetch(`${url}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  })
  const data = await response.json()
  console.log(data)
  return data
}

export { baseUrl, fetchQuery, fetchPost }
