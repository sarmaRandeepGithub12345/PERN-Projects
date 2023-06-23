import React, { Fragment,useContext,useEffect } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import  StarRating  from "./StarRating"
import { RestaurantContext } from '../context/RestaurantContext'
import {useNavigate} from "react-router-dom"
const RestaurantList = () => {

  const {restaurants, setRestaurants} = useContext(RestaurantContext)
  
  const navigate = useNavigate()
  useEffect(() => {
    const fetchDetails = async()=>{
      try {
        const response = await RestaurantFinder.get("/")
        setRestaurants(response.data.data.restaurant)
        
      } catch (error) {
        console.log(error)
      }
    }

    fetchDetails()
  }, [])
  
  const handleDelete = async(e,id)=>{
    e.stopPropagation()
    try {
      const response= await RestaurantFinder.delete(`/${id}`)
      setRestaurants(restaurants.filter(item=>item.id!==id))
    } catch (error) {
      
    }
  }
  const handleUpdate = (e,id)=>{
    e.stopPropagation()
    navigate(`/restaurants/${id}/update`)
  }
  const handleRestaurantSelect=(e,restaurantId)=>{
    e.preventDefault();
    navigate(`/restaurants/${restaurantId}`)
  }
  const renderRating = (restaurant)=>{
  //console.log(restaurant)
   return (
   <>
   <StarRating rating={restaurant?.average_rating} />
   <span className='font-semibold'>({restaurant?.count?restaurant.count:"0"})</span>
   </>)
  }
  return (
    <Fragment>
        <table className="w-[95%] mx-auto">
        <thead className='text-left'>
            <tr className="bg-[#086fff] text-[rgb(255,255,255)] h-[40px]">
            <th className='pl-2'>Restaurant</th>
            <th className="">Location</th>
            <th className="">Price Range</th>
            <th className="">Ratings</th>
            <th className="">Edits</th>
            <th className="">Deletes</th>
            </tr>
        </thead>
        <tbody className="text-[white] text-left ">
            {
              restaurants?.map((item)=>(
            <tr key={item.id} onClick={(e)=>handleRestaurantSelect(e,item.id)} className='bg-[#484848] h-[50px] cursor-pointer hover:bg-[#6f6f6f]'>
              <td className="pl-2">{item.name}</td>
              <td >{item.location}</td>
              <td className="" >{"$".repeat(item.price_range)}</td>
              <td className="" >{renderRating(item)}</td>
              <td className='text-[15px] font-bold'>
                <button className='bg-[rgb(255,196,0)] rounded-md  p-2 text-[#4e4e4e]' onClick={(e)=>handleUpdate(e,item.id)}>Update</button>
              </td>
              <td className="text-[15px] font-bold" >
                <button className='bg-[red] rounded-md p-2' onClick={(e)=>handleDelete(e,item.id)}>Delete</button>
              </td>
            </tr>
              ))
            }
            
            {/* <tr className='bg-[#484848] h-[50px] cursor-pointer hover:bg-[#6f6f6f]'>
              <td className="pl-2">McDonalds</td>
              <td >New York</td>
              <td className="" >$$</td>
              <td className="" >Rating</td>
              <td className='text-[15px] font-bold'><button className='bg-[rgb(255,196,0)] rounded-md  p-2 text-[#4e4e4e]'>Update</button></td>
              <td className="text-[15px] font-bold" ><button className='bg-[red] rounded-md p-2'>Delete</button></td>
            
            </tr>
            <tr className='bg-[#484848] h-[50px] cursor-pointer hover:bg-[#6f6f6f]'>
              <td className="pl-2">McDonalds</td>
              <td>New York</td>
              <td className="" >$$</td>
              <td className="" >Rating</td>
              <td className='text-[15px] font-bold'><button className='bg-[rgb(255,196,0)] rounded-md  p-2 text-[#4e4e4e]'>Update</button></td>
              <td className="text-[15px] font-bold" ><button className='bg-[red] rounded-md  p-2'>Delete</button></td>
            </tr> */}
        </tbody>
        </table>
    </Fragment>
  )
}

export default RestaurantList