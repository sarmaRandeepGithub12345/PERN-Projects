import React,{ useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder'

const UpdateRestaurant = () => {
  
    
    const {id} = useParams()
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState("Price_Range")
  
    const navigate = useNavigate()
    useEffect(() => {
       const fetchDetails = async()=>{
          const response = await RestaurantFinder.get(`/${id}`)
          setName(response.data.data.restaurant.name)
          setLocation(response.data.data.restaurant.location)
          setPriceRange(response.data.data.restaurant.price_range)
       }

       fetchDetails() 
    }, [])
    
    const handleSubmit =async(e)=>{
       e.preventDefault()
       const updateRestaurant = await RestaurantFinder.put(`/${id}`,{
        name,
        location,
        price_range:priceRange
       })
       navigate("/")
    }

  return (
 
        <form action="" className='w-[100vw] flex flex-col bg-[grey] h-[70vh] justify-center '>
            <div className="form-group flex flex-col pl-4">
                <label htmlFor="name" className='font-semibold'>Name</label>
                <input 
                type="text" 
                id="name" 
                className='form-control mt-2 h-[40px] max-w-[300px] rounded-[5px] mr-4' 
                value={name}
                onChange = {(e)=>setName(e.target.value)}
                />
            </div>
            <div className="form-group flex flex-col pl-4 mt-4">
                <label htmlFor="location" className='font-semibold'>Location</label>
                <input 
                type="text" 
                id="location" 
                className='form-control mt-2 h-[40px] max-w-[300px] rounded-[5px] mr-4' 
                value={location}
                onChange = {(e)=>setLocation(e.target.value)}
                />
            </div>
            <div className="form-group flex flex-col pl-4 mt-4">
                <label htmlFor="price-range" className='font-semibold'>Price Range</label>
                <input 
                type="number" 
                id="price_range" 
                className='form-control mt-2 h-[40px] max-w-[300px] rounded-[5px] mr-4' 
                value={priceRange} 
                onChange = {(e)=>setPriceRange(e.target.value)}
                />
            </div>
            <div className="form-group flex flex-col pl-4 mt-4">
                <button onClick={handleSubmit} type="submit" className='bg-[#0091ff] h-[50px] w-[80px] rounded-lg text-[white] font-semibold'>
                    Submit
                </button>
            </div>
        </form>

  )
}

export default UpdateRestaurant