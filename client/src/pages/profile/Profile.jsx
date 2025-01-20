import { useAppStore } from '@/store/Store'

 
const Profile  = () => {
  const {userInfo} = useAppStore()
  console.log("this is userinfo from profile",userInfo);


  if (!userInfo) {
    return <div>Loading user information...</div>;
  }
  
   return (
    <div>
      <div>Profile</div>
      <p>Email:{userInfo.email}</p>
      <p>Email:{userInfo.id}</p>
    </div>
  )
}

export default Profile 
