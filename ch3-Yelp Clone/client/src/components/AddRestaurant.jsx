import React, { useContext, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantContext } from '../context/RestaurantContext'
const AddRestaurant = () => {
  const {addRestaurants} = useContext(RestaurantContext)
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [priceRange, setPriceRange] = useState("Price Range")

  const handleSubmit =async(e)=>{
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/",{
        name,
        location,
        price_range:priceRange
      })
   
      addRestaurants(response.data.data.rows[0])
    } catch (error) {
      
    } 
  }

  return (
    <div className='mb-4 w-[90vw] m-auto'>
       <form action="">
         <div className="flex flex-row justify-between">
            <div className="flex-1">
                <input type="text" placeholder='name' className='form-control' value={name} onChange={e =>setName(e.target.value)}  />
            </div>
            <div className="flex-1">
                <input type="text" placeholder='location' className='form-control' value={location} onChange={e =>setLocation(e.target.value)}   />
            </div>
            <div className="flex-1">
                <select name="" id="" className="custom-select my-1 mr-sm-2 w-[70%]" value={priceRange} onChange={e =>setPriceRange(e.target.value)}  >
                    <option disabled>Price Range</option>
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="4">$$$$</option>
                    <option value="5">$$$$$</option>
                </select>
            </div>
            <button onClick={handleSubmit} type='submit' className="w-[60px] rounded-lg bg-[#1e96ff]">
                Add
            </button>
         </div>
       </form>
    </div>
  )
}

export default AddRestaurant