function getAllTwitts(){
    return axios.get('http://localhost:8000/Data/twitts');
}

function putTwitt(newTwitt) {
    axios.put('http://localhost:8000/AddComment',newTwitt);
}