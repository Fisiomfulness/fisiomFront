import React from 'react'
import { ratingProfessionals } from '../data/data'
import CardRating from './CardRating'

function RatingView() {
  return (
    <div className=' w-full h-full '>

        <div>{ratingProfessionals.map((user)=>(
            <CardRating total={user.total} totalComment={user.totalComments} name={user.name} average={user.average} />
        ))}</div>
    </div>
  )
}

export default RatingView