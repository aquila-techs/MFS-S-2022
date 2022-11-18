import RNFetchBlob from 'rn-fetch-blob';
import { API_URL } from '../Actions';

export const ENTRIES1 = [
    {
        
        title: '14 - 19%',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: require('./../Assets/Archive/1.jpg')
    },
    {
        title: '19 - 24%',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: require('./../Assets/Archive/2.jpg')
    },
    {
        title: '25 - 29%',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
        illustration: require('./../Assets/Archive/3.jpg')
    },
    {
        title: '30 - 34%',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: require('./../Assets/Archive/4.jpg')
    },
    {
        title: '35 - 39%',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: require('./../Assets/Archive/5.jpg')
    },

];

export const ENTRIES2 = [
    {
        title: 'Favourites landscapes 1',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/SsJmZ9jl.jpg'
    },
    {
        title: 'Favourites landscapes 2',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/5tj6S7Ol.jpg'
    },
    {
        title: 'Favourites landscapes 3',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat',
        illustration: 'https://i.imgur.com/pmSqIFZl.jpg'
    },
    {
        title: 'Favourites landscapes 4',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
        illustration: 'https://i.imgur.com/cA8zoGel.jpg'
    },
    {
        title: 'Favourites landscapes 5',
        subtitle: 'Lorem ipsum dolor sit amet',
        illustration: 'https://i.imgur.com/pewusMzl.jpg'
    },
    {
        title: 'Favourites landscapes 6',
        subtitle: 'Lorem ipsum dolor sit amet et nuncat',
        illustration: 'https://i.imgur.com/l49aYS3l.jpg'
    }
];
const getpost=async(token)=>{
    // https://api.myfitspot.com/api/post/get/all
    // let bodyData = {
        
    //   }
let fiterdata = await RNFetchBlob.fetch(
        'POST',
        API_URL + '/post/get/all',
        {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'auth-token': token,
        },
        // JSON.stringify(bodyData),
      ).then(res => {
        const data = JSON.parse(res.data);
       
        if (data?.status === true) {
            return {
                isSuccess:true,
                data: data?.data
            }
        }
        else {
            return {
                isSuccess:false,
                data: [{}]
            }
        }
      });
      return fiterdata
}
export {getpost}