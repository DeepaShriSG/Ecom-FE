import React from 'react'

function ProfilePic() {

  let userData = sessionStorage.getItem("user")
  const user = userData ? JSON.parse(userData) : null;
  
  const username = user ? (user.name || user.email) : <i className="bi bi-person-workspace"></i>;
 
  return (
    <> 
      <div className="profile-round p-3" data-bs-toggle="dropdown" aria-expanded="false">
      <span className="profile ">{username.charAt(0)}</span>
      </div> 
      
    </>
  )
}

export default ProfilePic