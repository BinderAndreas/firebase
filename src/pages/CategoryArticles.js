import React from 'react'
import { useParams } from 'react-router-dom'
import {addDock} from "firebase/firestore"

function CategoryArticles() {

    const {categoryName}=useParams()

  return (
    <div>
        {categoryName}
    </div>
  )
}

export default CategoryArticles