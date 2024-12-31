import { Helmet } from 'react-helmet-async'
import AddPlantForm from '../../../components/Form/AddPlantForm'

const AddPlant = () => {
  const handleSubmit = async e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const plant = {
      name: formData.get('name'),
      category: formData.get('category'),
      description: formData.get('description'),
      price: Number(formData.get('price')),
      quantity: Number(formData.get('quantity')),
      image: formData.get('image'),
    }

    // Send plant data to Firebase
    // ...
  }
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddPlantForm handleSubmit={handleSubmit} />
    </div>
  )
}

export default AddPlant
