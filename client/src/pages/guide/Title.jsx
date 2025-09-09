import React from 'react'

const Title = ({texte, className}) => {
  return (
    <p className={className + ' font-bold text-lg'}>{texte}</p>
  )
}

export default Title
