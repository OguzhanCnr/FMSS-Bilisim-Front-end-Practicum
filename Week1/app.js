import axios from 'axios';

async function getUserData(userId) {
  //user ve postlar Api den çekildi
    const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    //user Data oluşturuldu ve posts kısmına kullanıcının postları getirildi.
    const userData = userResponse.data;
    userData.posts = postResponse.data;
    return userData;
  }
  
  //userId si 1 olan user çağırıldı
  const userData = await getUserData(1);
  
  //Ekrana log ile bastırıldı
  console.log(userData);
  