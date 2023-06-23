import React, { Fragment } from 'react'

const StarRating = ({rating}) => {
    const stars = [];
    for(let i=1;i<=5;i++){
              if(i<=rating){
            stars.push(<i key={i} className="text-[#ff6868] fa-sharp fa-solid fa-star"></i>)
        }else if(i === Math.ceil(rating) && !Number.isInteger(rating)){
            stars.push(<i key={i} className="text-[#ff6868] fa-solid fa-star-half-stroke"></i>)
        }
        else{
            stars.push(<i key={i} className="text-[#ff6868] bg fa-sharp fa-regular fa-star"></i>)
        }
    }
 
    return (
    <Fragment>
    {stars}
    </Fragment>
  )
}

export default StarRating