import React,{useEffect,useState} from 'react'
import "./banner.css"
import {db} from "../../config/firebaseConfig"
import { getDocs,collection,query,limit,orderBy } from 'firebase/firestore'


function Banner() {

  const [mainArticle,setMainArticle]=useState("")
  const [otherArticles,setOtherArticles]=useState("")

useEffect(() => {
  const articleRef = collection(db,"articles")
  const q = query(articleRef,orderBy("createdAt","desc"),limit(5))

  getDocs(q,articleRef)
  .then(res=>{
    // console.log(res.docs[0]._document.data.value.mapValue.fields.title.stringValue)
   console.log(res.docs)
  const articles = res.docs.map(item=>({
    id:item.id,
    ...item.data()
    }))
    
    setMainArticle(articles[0])
    setOtherArticles(articles.splice(1))
    console.log(articles)
  })
  .catch(err=>console.log(err))


  
}, [])



  return (
    <div className='banner-container'>
        <div className='main-article-container' style={{backgroundImage:`url(${mainArticle?.imageUrl})`}}>
          <div className='banner-info'>
            <h2>{mainArticle?.title}...</h2>
            <small>{mainArticle?.createdAt?.toDate().toDateString()}</small>
          </div>
        </div>
        <div className='other-articles-container'>
          {
            otherArticles && otherArticles?.map(item=>{
              return <div className="other-articles-item" style={{backgroundImage:`url(${item?.imageUrl})`}}>
                   <div className='banner-info'>
                      <h3>{item?.title.slice(0,15)}...</h3>
                      <small>{item?.createdAt?.toDate().toDateString()}</small>
                  </div>
              </div>
            })
          }
        </div>
      
    </div>
  )
}

export default Banner