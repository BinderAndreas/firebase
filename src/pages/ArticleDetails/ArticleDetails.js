import { getDoc } from 'firebase/firestore';
import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {doc} from 'firebase/firestore'
import { db } from '../../config/firebaseConfig';

function ArticleDetails() {
    const {articleId}=useParams();
    const [article,setArticle]=useState("")


    useEffect(()=>{
        const docRef=doc(db,"articles",articleId)
        getDoc(docRef)
        .then(res=>{
            setArticle(res.data())
        })
        .then(err=>console.log(err))
    }, [])

  return (
    <div>
        {
            article?.title
        }
    </div>
  )
}

export default ArticleDetails