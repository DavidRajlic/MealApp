import { SERVER_URL } from "../util/constants";

export async function get<T>(url: string, token?: string, requestInit?: RequestInit) {
  const response = await fetch(SERVER_URL + url, {
    ...requestInit,
    headers: {
      ...requestInit?.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if(!response.ok) {
    console.log(JSON.stringify(response))
    throw new Error('Failed to fetch data')
  }

  return (await response.json()) as T
}

export async function deleteF<T>(url: string, token?: string, requestInit?: RequestInit) {
  const response = await fetch(SERVER_URL + url, {
    method: 'DELETE',
    ...requestInit,
    headers: {
      ...requestInit?.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if(!response.ok) {
    console.log(JSON.stringify(response))
    throw new Error('Failed to delete')
  }

  return (await response.json()) as T
}

export async function post<T>(url: string, body: Object, token?: string, requestInit?: RequestInit) {
  console.log('post', url, body)
  const response = await fetch(SERVER_URL + url, {
    method: 'POST',
    body: JSON.stringify(body),
    ...requestInit,
    headers: {
      "Content-Type": "application/json",
      ...requestInit?.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if(!response.ok) {
    console.error(JSON.stringify(response))
    throw new Error('Failed to fetch data')
  }

  console.log('ok')

  return (await response.json()) as T
}

export async function postFormData<T>(url: string, body: FormData, token?: string, requestInit?: RequestInit) {
  console.log('post', url, body)
  const response = await fetch(SERVER_URL + url, {
    method: 'POST',
    body: body,
    ...requestInit,
    headers: {
      ...requestInit?.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  if(!response.ok) {
    console.error(JSON.stringify(response))
    throw new Error('Failed to fetch data')
  }

  return (await response.json()) as T
}

export async function put<T>(url: string, body: Object, token?: string, requestInit?: RequestInit) {
  console.log('post', url, body)
  const response = await fetch(SERVER_URL + url, {
    method: 'PUT',
    body: JSON.stringify(body),
    ...requestInit,
    headers: {
      "Content-Type": "application/json",
      ...requestInit?.headers,
      Authorization: `Bearer ${token}`,
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