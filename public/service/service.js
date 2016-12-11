function getUser(userId) {
    return axios.get('http://localhost:8000/Data/users/' + userId);
}
