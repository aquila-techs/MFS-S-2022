
const SocialContent = (data,array) => {
    if (data.facebook) {
        array.push({
            _id:0,
            iconname: "facebook",
            link: data?.facebook
        })
    } 
    if (data.instagram) {
        array.push({
            _id:1,
            iconname: "instagram",
            link: data?.instagram
        })
    }
    if (data.linkedin) {
        array.push({
            _id:2,
            iconname: "linkedin",
            link: data?.linkedin
        })
    }
     if (data.twitter) {

        array.push({
            _id:3,
            iconname: "twitter",
            link: data?.twitter
        })
    }
    if (data.youtube) {
        array.push({
            _id:4,
            iconname: "youtube",
            link: data?.youtube
        })
    }
    if (data.website) {
        array.push({
            _id:5,
            iconname: "web",
            link: data?.website
        })
    }
    return array
}
export { SocialContent }