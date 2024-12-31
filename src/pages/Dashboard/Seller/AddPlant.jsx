import { Helmet } from "react-helmet-async";
import AddPlantForm from "../../../components/Form/AddPlantForm";
import imageUpload from "../../../api/utils";
import useAuth from "../../../hooks/useAuth";

const AddPlant = () => {
  const { user } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
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

    console.table({plant});
    // Add plant details to the plants collection
    //...

    // Add plant details to the users collection
    //...

    // Add plant details to the categories collection
    //...

    // Add plant details to the brands collection
    //...

    // Add plant details to the locations collection
    //...

    // Add plant details to the plant care tips collection
    //...

    // Add plant details to the plant care routines collection
    //...

    // Add plant details to the plant care recommendations collection
    //...

    // Add plant details to the plant care precautions collection
    //...

    // Add plant details to the plant care updates collection
    //...

    // Add plant details to the plant care videos collection
    //...

    // Add plant details to the plant care resources collection
    //...
    //...

    // Add plant details to the seller's inventory
    //...

    // Update user's inventory count
    //...

    // Add user's recent activity (added plant)
    //...

    // Clear form fields
    //...

    // Redirect to inventory page
    //...
    // Send plant data to Firebase
    // ...
  };
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default AddPlant;
