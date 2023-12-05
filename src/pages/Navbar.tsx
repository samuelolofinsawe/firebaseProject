import {Link} from 'react-router-dom'
import { useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '../config/firebase'
import {signOut} from 'firebase/auth'
export const Navbar = ()=>{
    const [user] = useAuthState(auth)
    const signUserOut = async()=>{
        await signOut(auth)
      }
    return (
        <div className='navbar'>
            
            <div className='links'>
            <Link to='/' className='nav-link'>Home</Link>
            {
                !user ? (<Link to='/login ' className='nav-link'>Login</Link>):
                (<Link to='/createpost'>Create post</Link>)
            }
        
            </div>

        <div className='user'>
            { user &&(
                <>
        <p>{user?.displayName}</p>
                <img src={user?.photoURL || ' '} width='30' height='30'/>
                <button className='log-out' onClick={signUserOut}>Log out</button>
                </>)}
        </div>
            
        </div>
    )
}