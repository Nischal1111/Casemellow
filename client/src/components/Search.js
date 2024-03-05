import React, { useContext } from 'react'
import { ProductContext } from './ProductContext'
import Typedropdown from './Typedropdown'
import {RiSearch2Line} from "react-icons/ri"
import "../css/search.css"

const Search = () => {
    const {handleClick} = useContext(ProductContext)
      return (
    <div className='search'>
    <Typedropdown/>
    <button className='searchicon' onClick={handleClick}><RiSearch2Line/></button>
    </div>
  )
}

export default Search
