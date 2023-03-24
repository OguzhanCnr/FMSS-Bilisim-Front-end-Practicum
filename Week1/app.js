import axios from 'axios';

async function getUserData(userId) {
    const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const userData = userResponse.data;
    userData.posts = postResponse.data;
    return userData;
  }
  
  const userData = await getUserData(1);
  
  console.log(userData);
  