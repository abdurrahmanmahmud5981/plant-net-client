import axios from "axios";

// upload image and return image url 
const imageUpload = async (imageData) => {
    const formData = new FormData();
    formData.append("image", imageData);

    //1. send image to imgbb
    const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
    );
    console.log(data.data);
    return data.data.display_url;

}

export default imageUpload;