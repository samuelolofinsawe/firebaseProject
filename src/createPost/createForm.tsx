import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver} from '@hookform/resolvers/yup'
import {addDoc,collection } from 'firebase/firestore'
import { auth, db} from '../../src/config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
interface CreateFormData{
    title: string,
    description:string
}
export const CreateForm = ()=>{
    const schema = yup.object().shape({
        title: yup.string().required('you must fill a title'),
        description: yup.string().required('a description is necessary')
    })
    const {register,handleSubmit,formState:{errors},} = useForm<CreateFormData>({
        resolver: yupResolver(schema)
    })
    const [user] = useAuthState(auth)
    const postRef = collection(db,'posts')
    const onCreatePost = async(data:CreateFormData)=>{
        await addDoc( postRef,{
            ...data,
            username: user?.displayName,
            userId: user?.uid

        })
    }
    return(
        <div className='create-post'>
            <form onSubmit={handleSubmit(onCreatePost)}>
            <input className='input-s' placeholder="Title.." {...register('title')}/>
            <p style={{color: 'red'}}>{errors?.title?.message}</p>
            <textarea placeholder="Description.." {...register('description')}/>
            <p  style={{color: 'red'}}>{errors?.description?.message}</p>
            <input type="submit" className='submitButton'/>
            
            </form> 
            </div>
    )
}