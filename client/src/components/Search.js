import React, { useContext } from 'react'
import Typedropdown from './Typedropdown'
import {RiSearch2Line} from "react-icons/ri"
import "../css/search.css"

const Search = () => {
      return (
    <div className='search'>
    <Typedropdown/>
    <button className='searchicon'><RiSearch2Line/></button>
    </div>
  )
}

export default Search
