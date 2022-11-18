import RNFetchBlob from "rn-fetch-blob";
import { API_URL } from "../Actions";

//Method helps to add selections on question
const addSelectionOnWorkout = async (array) => {
    let newArray = array?.map(async(item) => {
         await RNFetchBlob.fetch(
            'GET',
            API_URL + '/workout/categories/get/user/' + item?.category_id,
            {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'auth-token': this.props.token,
            },
        ).then(res => {
            const data = JSON.parse(res.data);
            if (data?.status === true) {
                if (data?.data[0]?._id === item?.category_id) {
                //    return  data?.data[0]?.image;
               
                }
            }
        })
        // console.log("sdc ghads chgvshfvdcdf", newimage);
        return {
            ...item,
            // Images:newimage
        };
    });

    return newArray;
};

export { addSelectionOnWorkout };
