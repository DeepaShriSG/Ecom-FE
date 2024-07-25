import React, { useState, useEffect } from "react";
import AxiosService from "../common/ApiService";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Payment from "../common/Payment";

function CartModal({ show, handleClose, user, handleCart }) {

  const [PaymentShow, setPaymentShow] = React.useState(false);

  let [submit, setSubmit] = useState(false);

  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setaddress] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setPhonenumber(user.phonenumber || "");
      setaddress(user.address || "");
    }
  }, [user]);


  const handleCheckout = () => {
    handleClose()
    setPaymentShow(true);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="phonenumber" className="form-label">
              Phone Number
            </label>
            <input type="text" className="form-control" id="phonenumber" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea className="form-control" id="address" rows="3" value={address} onChange={(e) => setaddress(e.target.value)}></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={handleCheckout}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
     
    </>
  );
}

export default CartModal;
