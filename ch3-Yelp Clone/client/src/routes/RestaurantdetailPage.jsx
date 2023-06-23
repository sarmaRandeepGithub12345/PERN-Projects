import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantContext } from '../context/RestaurantContext'
import RestaurantFinder from '../apis/RestaurantFinder'
import StarRating from '../components/StarRating'
import Reviews from '../components/Reviews'
import AddReviews from '../components/AddReviews'

const RestaurantdetailPage = () => {
  const {id} = useParams()
  const {selectedRestaurant , setSelectedRestaurant} = useContext(RestaurantContext)
  
  useEffect(() => {
    const fetchData = async()=>{
      try{
        const response = await RestaurantFinder.get(`/${id}`)
       
        setSelectedRestaurant(response.data.data)
        
      }catch(error){
      }
    }
    fetchData()
  }, [])
  //console.log(selectedRestaurant)
  return (
    <div>
      <h1 className='text-[30px] text-center'>{selectedRestaurant?.restaurant?.name}</h1>
      <div className='text-center'>
        <StarRating rating={selectedRestaurant?.restaurant?.average_rating}/>
        <span>
        {selectedRestaurant?.restaurant?.count?
         `(${selectedRestaurant?.restaurant?.count})`:"(0)"   
        }</span>
      </div>
     {selectedRestaurant && (
     <> 
     
      <div className='mt-3'>
        <Reviews reviews={selectedRestaurant?.reviews} />
        
      </div>
      <AddReviews/>
      </>
     )}
    </div>
  )
}

export default RestaurantdetailPage