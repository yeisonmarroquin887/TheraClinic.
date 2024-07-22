const getConfingToken = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
    }
})

export default getConfingToken