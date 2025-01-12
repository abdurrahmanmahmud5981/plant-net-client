import PropTypes from "prop-types"
import useRole from "../hooks/useRole"
import { Navigate } from "react-router-dom"
import LoadingSpinner from "../components/Shared/LoadingSpinner"

const SellerRoute = ({children}) => {
    const [role, isLoading] = useRole();
  
    if (isLoading) return <LoadingSpinner />
    if (role === 'seller') return children
    return <Navigate to='/dashboard' state={{ from: location }} replace='true' />
  }

  SellerRoute.propTypes = {
    children: PropTypes.element,
  }
  


export default SellerRoute;