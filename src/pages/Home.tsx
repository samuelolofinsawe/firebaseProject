import { db } from "../config/firebase"
import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Post } from "../createPost/Post"
export interface Post {
    id:string,
    userId:string,
    title:string,
    username:string,
    description:string
}
export const Home = ()=>{
    const[postsList,setPostList] = useState<Post[] | null>(null)
    const postRef = collection(db,'posts')
    const  getPosts = async ()=>{
        const data = await getDocs(postRef)
        setPostList(data.docs.map((doc)=>({...doc.data(),id: doc.id})) as Post[]
        )  }
    
    useEffect(()=>{
        getPosts();
    },[])
    return(
        <div className="body">
            {postsList?.map((post)=>(
                <Post post={post}/>
            ))}
        </div>
    )
}
