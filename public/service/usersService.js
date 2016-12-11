function getAllUsers() {
    return axios.get('http://localhost:8000/Data/users');
}