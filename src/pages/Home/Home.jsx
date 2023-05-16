import React from 'react'
import Splash from '../../components/Home/Splash'
import FeaturedWorks from '../../components/Home/FeaturedWorks'
import { Helmet } from 'react-helmet'

const Home = () => {
  return (
    <div>
        <Helmet>
          <title>Sumit Kukreja</title>
        </Helmet>
        <Splash />
        <FeaturedWorks />
    </div>
  )
}

export default Home