import React from 'react'
import {motion as m } from "framer-motion"

const UserModal = () => {
  return (
    <m.div
    initial={{opacity:0}}
    duration={0.75}
    animate={{opacity:1}}
    exit={{opacity:0}}
    >
    <div>
      Hello
    </div>
    </m.div>
  )
}

export default UserModal
