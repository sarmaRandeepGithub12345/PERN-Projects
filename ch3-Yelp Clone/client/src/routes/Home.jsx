import React, { Fragment } from 'react'
import Header from '../components/Header'
import AddRestaurant from '../components/AddRestaurant'
import RestaurantList from '../components/RestaurantList'

const Home = () => {
  return (
    <Fragment>
      <Header/>
      <AddRestaurant/>
      <RestaurantList/>
    </Fragment>
  )
}

export default Home