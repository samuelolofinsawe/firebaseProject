import {Post as post} from '../pages/Home'
import {db,auth} from '../config/firebase' 
import { useAuthState } from 'react-firebase-hooks/auth'
import { addDoc,collection,getDocs,query, where,doc,deleteDoc } from 'firebase/firestore'
import { useState,useEffect } from 'react'
interface props{
    post: post,
}
interface Like{
    userId:string;
    likeId:string;
}
export const Post =(props: props)=>{
    const[likes,setLikes] = useState<Like[] | null>(null)
    const {post} = props
    const [user] = useAuthState(auth)
    const likesRef = collection(db,'likes')
    const likesDocs = query(likesRef,where('postId','==', post.id))
    const getLikes =async()=>{
       const data = await getDocs(likesDocs);
        setLikes(data.docs.map((doc)=>({userId: doc.data().userId,likeId: doc.id})));
    }
    const hasUserLiked = likes?.find((like)=>(like.userId == user?.uid))
    const addLikes = async()=>{
        try{
       const newDoc= await addDoc( likesRef,{
            userId: user?.uid,
            postId: post?.id,
            username: user?.displayName
            
            
        })
       if(user){
        setLikes((prev)=> prev ? [...prev,{userId: user?.uid,likeId:newDoc.id}] : [{userId: user?.uid,likeId:newDoc.id}]);
       }
    }
    catch(err){
        console.log(err)
    }
    }
    const removeLikes = async()=>{
        try{
            const likeToDeleteQuery = query(likesRef,where('postId','==', post.id),where('userId','==', user?.uid))
            const likeToDeleteData = await getDocs(likeToDeleteQuery)
            const likeToDelete = doc(db,"likes",likeToDeleteData.docs[0].id)
            await deleteDoc(likeToDelete)
            if (user) {
                setLikes((prev) => prev && prev.filter(like => like.likeId !== likeToDeleteData.docs[0].id));
              }
              
        
       
    }
    catch(err){
        console.log(err)
    }
    }
        useEffect(()=>{
            getLikes()
        },[])
    return (
    <div className='post-body'>
        <div className='post-div'>
        <div className='title'><h1>{post?.title}</h1></div>
        <div className='body'><p>{post?.description}</p></div>
        <div className='footer'><h6>@{post?.username}</h6></div>
        <button className='like-button' onClick={hasUserLiked? removeLikes : addLikes}>	{hasUserLiked? <>&#10084; </>: <> &#9825;</>}</button>
        {likes && <p className='likes-amount'>Likes: {likes?.length}</p>}
        </div>
    </div>
    )
}