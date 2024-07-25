import React from "react";


function Sidebar() {
  return (
    <>
      <div className="p-2">
        <div className="row align-items-start">
            <ul className="list-group">
            <li className="list-group-item"><a href="/login" className="p-2"><i className="fa-solid fa-right-to-bracket mx-2"></i>Login</a></li>
            <li className="list-group-item"><a href="/signup" className="p-2"><i className="fa-solid fa-user-plus mx-2"></i>Register</a></li>
            <li className="list-group-item"><a href="/resetpassword" className="p-2"><i className="fa-solid fa-key mx-2"></i> Password</a></li>
            <li className="list-group-item"><a href="/accountDetails" className="p-2"><i className="fa-solid fa-user mx-2"></i>Account Detials</a></li>
            <li className="list-group-item"><a href="/orderHistory" className="p-2"><i className="fa-solid fa-box-open mx-2"></i>Order History</a></li>
            </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
