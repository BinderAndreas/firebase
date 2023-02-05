import React, {useState,useEffect} from 'react'
import {db, auth} from "../../config/firebaseConfig"
import { useAuthState } from 'react-firebase-hooks/auth'
import { addDoc,getDocs, collection,query,where,deleteDoc,doc } from 'firebase/firestore'
import { FaHeart,FaRegHeart } from "react-icons/fa";

function Likes({articleId}) {
    const [user]=useAuthState(auth)
    const [isLiked,setIsLiked]=useState(false);
    const [likeCount,setLikeCount]=useState(0);

    useEffect(() => {
      const likesRef=collection(db,"likes")
      const q = query(likesRef, where("articleId","==",articleId),where("userId","==",user && user?.uid))
      getDocs(q,likesRef)
      .then(res=>{
        if(res.size>0){
            setIsLiked(true)
        }
      })
      .catch(err=>console.log(err))



      const q2 = query(likesRef, where("articleId","==",articleId))
      getDocs(q2,likesRef)
      .then(res=>{
        setLikeCount(res.size)
      })
      .catch(err=>console.log(err))




    }, [user,isLiked])
    

    const handleLike=()=> {
        const likesRef=collection(db,'likes')
        addDoc(likesRef,{
            userId:user?.uid,
            articleId:articleId
        })
        .then(res=>{
            setIsLiked(true)
        })
        .catch(err=>{
            
        })
        .catch(err=>console.log(err))


    }

    const handleUnLike=()=>{
        
        const likesRef=collection(db,"likes")
      const q = query(likesRef, where("articleId","==",articleId),where("userId","==",user && user?.uid))
      getDocs(q,likesRef)
      .then(res=>{
       const likeId= res.docs[0].id
       deleteDoc(doc(db,"likes",likeId))
       .then(res=>{
        setIsLiked(false)
       })
       .catch(err=>console.log(err))


      })
      .catch(err=>console.log(err))
    }

  return (
    <div style={{marginLeft:"10px",display:"flex",alignItems:"center",cursor:"pointer"}}>
       {
          isLiked
          ? <div>
              <FaHeart onClick={handleUnLike} />
              <span>{likeCount}</span>
          </div>
          : <div>
            <FaRegHeart onClick={handleLike}/>
            <span>{likeCount}</span>
          </div>
        }
    </div>
  )
}

export default Likes