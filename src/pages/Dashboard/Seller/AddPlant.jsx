import { Helmet } from "react-helmet-async";
import AddPlantForm from "../../../components/Form/AddPlantForm";
import imageUpload from "../../../api/utils";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddPlant = () => {
  const navigate = useNavigate()
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [uploadImage, setUploadImage] = useState({
     name: "Upload Image"
  });
  console.log(uploadImage);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // const formData = new FormData(e.target)
    // const plant = {
    //   name: formData.get('name'),
    //   category: formData.get('category'),
    //   description: formData.get('description'),
    //   price: Number(formData.get('price')),
    //   quantity: Number(formData.get('quantity')),
    //   image: formData.get('image'),
    // }
    const form = e.target;
    const name = form.name.value;
    const description = form.description.value;
    const category = form.category.value;
    const price = parseFloat(form.price.value);
    const quantity = parseInt(form.quantity.value);
    const image = form.image.files[0];
    const imageUrl = await imageUpload(image);

    // seller information
    const seller = {
      name: user.displayName,
      image: user.photoURL,
      email: user.email,
    };

    // Create new plant  object
    const plant = {
      name,
      description,
      category,
      price,
      quantity,
      image: imageUrl,
      seller,
    };

    console.table({ plant });
    // save the plant in the database
    try {
      const response = await axiosSecure.post("/plants", plant);
      console.log(response);
      navigate('/dashboard/my-inventory')
      // reset the form and show success toast message
    } catch (error) {
      console.error(error);
      toast.error("Failed to add plant");
    } finally {
      setLoading(false);
      setUploadImage({ name: "Upload Image" });
      // form.reset();
      toast.success("Plant added successfully");
    }
  };
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm
        handleSubmit={handleSubmit}
        uploadImage={uploadImage}
        setUploadImage={setUploadImage}
        loading={loading}
      />
    </div>
  );
};

export default AddPlant;
