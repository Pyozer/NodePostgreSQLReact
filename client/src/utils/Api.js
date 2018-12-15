export const fetchData = async (url, authToken, body, method = 'GET') => {
    try {
        let headers = {}
        if (authToken)
            headers["Authorization"] = `Bearer ${authToken}`
        if (body)
            headers["Content-Type"] = 'application/json'

        const resultRaw = await fetch(url, { method, headers, body })
        const result = await resultRaw.json()

        if (result.error)
            throw new Error(result.error.message)
        else
            return result
    } catch ({ message }) {
        throw new Error(message)
    }
}