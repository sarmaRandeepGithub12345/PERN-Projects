import React from 'react'
import StarRating from './StarRating'

const Reviews = ({reviews}) => {
  
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2
    lg:grid-cols-3  grid-flow-row w-[100%] '>
      {
    reviews.map((review,id)=>(
      <div key={id} className='Card w-[90%] bg-[#3499ff] p-4 rounded-lg m-4'>
        <div className='Header flex flex-row w-[100%] justify-around h-[30px]'>
          <span className='text-[black]'>{review.name}</span>
          <span><StarRating rating={review.rating}/></span>
        </div>
        <div className='Body'>
            <p className='text-black'>{review.review}</p>
        </div>
      </div>
        ))
      }
      
    </div>
  )
}

export default Reviews