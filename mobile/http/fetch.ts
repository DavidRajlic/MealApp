import { SERVER_URL } from "../util/constants";

export async function get<T>(url: string, requestInit?: RequestInit) {
  console.log(SERVER_URL + url)
  
  const response = await fetch(SERVER_URL + url, {
    ...requestInit,
    headers: {
      ...requestInit?.headers,
      //Authorization: `Bearer ${token}`,
    },
  });

  if(!response.ok) {
    console.log(JSON.stringify(response))
    throw new Error('Failed to fetch data')
  }

  return (await response.json()) as T
}

export async function deleteF(url: string, requestInit?: RequestInit) {
  const response = await fetch(SERVER_URL + url, {
    method: 'DELETE',
    ...requestInit,
    headers: {
      ...requestInit?.headers,
      //Authorization: `Bearer ${token}`,
    },
  });

  if(!response.ok) {
    console.log(JSON.stringify(response))
    throw new Error('Failed to delete')
  }

  return true
}

export async function post<T>(url: string, body: Object, requestInit?: RequestInit) {
  console.log('post', url, body)
  const response = await fetch(SERVER_URL + url, {
    method: 'POST',
    body: JSON.stringify(body),
    ...requestInit,
    headers: {
      "Content-Type": "application/json",
      ...requestInit?.headers,
      //Authorization: `Bearer ${token}`,
    },
  });
  console.log('post post')

  if(!response.ok) {
    console.log(JSON.stringify(response))
    console.log('not ok')
    throw new Error('Failed to fetch data')
  }

  console.log('ok')

  return (await response.json()) as T
}