import React,{useState} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const AddReviews = () => {

    const [name, setName] = useState("")
    const [reviews, setReviews] = useState("")
    const [rating, setRating] = useState("1")
    //console.log(reviews)
    const {id}= useParams()
    const handleSubmit =async(e)=>{
      e.preventDefault()
      console.log('hdi')
     try {
      const newReview = await axios({
        url: `http://localhost:4000/api/v1/restaurants/${id}/addReview`,
        method:'POST',
        data:{
        name,
        review:reviews,
        rating
        }
      })
     console.log(newReview)
     window.location.reload(false);
     } catch (error) {
       console.log(error)
     }
    }
  return (
    <div className=''>
       <form action="">
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  grid-flow-row w-[100%] '>
            <div className="form-group flex flex-col pl-4 mt-4">
                    <label htmlFor="price-range" className='font-semibold'>Name</label>
                    <input 
                    value={name}
                    onChange = {(e)=> setName(e.target.value)}
                    type="text" 
                    id="name" 
                    className='form-control mt-2 h-[40px] max-w-[300px] rounded-[5px] mr-4 border-[1px] outline-none border-black' 
                    />
            </div>
            <div className="form-group flex flex-col pl-4 mt-4">
                    <label htmlFor="rating" className='font-semibold'>Rating</label>
                    <select
                    value={rating} 
                    name="rating" 
                    id="rating"
                    onChange={e => setRating(e.target.value)} 
                    className="form-control mt-2 h-[40px] max-w-[300px] rounded-[5px] mr-4 border-[1px] outline-none border-black" 
                     >
                        <option disabled>Price Range</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
            </div>
            <div className="form-group flex flex-col pl-4 mt-4">
                    <label 
                    htmlFor="Review" 
                    className='font-semibold'>
                        Description</label>
                    <textarea 
                        type="text" 
                        id="Review"
                        value={reviews}
                        onChange={(e)=>setReviews(e.target.value)}
                        name="review" 
                        className='form-control mt-2 h-[150px] resize-none max-w-[500px] rounded-[5px] mr-4 border-[1px] outline-none border-black' 
                    />
            </div>

        </div>
        <button onClick={handleSubmit} type="submit" className='bg-[#0091ff] h-[50px] w-[80px] rounded-lg text-[white] font-semibold ml-4 mt-4'>
        SubBut
        </button>
       </form>
    </div>
  )
}

export default AddReviews