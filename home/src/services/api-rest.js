import axios from 'axios';

async function getResult() {
   axios.get('http://192.168.4.1/scannetworks').then(res => {
      console.log(res.data.data)
      return res.data
   
   }, error =>{
      console.log(error)
   })
}

export default getResult 