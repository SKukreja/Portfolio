import React from 'react'
import Landing from '../../components/Home/Landing'
import FeaturedWorks from '../../components/Home/FeaturedWorks'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet'

const Home = () => {
  return (
    <motion.div
    initial={{ 
      opacity: 0,      
     }} 
    animate={{ 
      opacity: 1,      
    }} 
    exit={{ 
      opacity: 0,
     }} 
    transition={{ duration: 1 }}
    >
      <Helmet>
        <title>Sumit Kukreja</title>
      </Helmet>
      <Landing />
      <FeaturedWorks />
    </motion.div>
  )
} 

export default Home