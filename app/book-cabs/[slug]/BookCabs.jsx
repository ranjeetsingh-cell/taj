'use client';
import { useState,useRef } from "react";
import Search from "/components/Search";
import CallBack from "/components/CallBack";

export default function BookCabs({pageData}) {


const [showPopup, setShowPopup] = useState(false);
const buttonRef = useRef(null);

const togglePopup = () => setShowPopup((s) => !s);



  const leadFromData = {

          from_city:pageData.fromCity,
          to_city:pageData.toCity

   };

return (
<section className="py-2 bg-light mb-5 shadow-sm p-4 rounded-4"><div className="container">
   <div className="row align-items-center g-4">
       <div className="col-md-6 text-center">



          <div   className={showPopup ? "d-block  modify-booking-popup " : "d-none modify-booking-popup"} style={{ zIndex: 9,right:0}}>		
          <button 
          ref={buttonRef}   
          onClick={() => setShowPopup(false)}
          aria-expanded={showPopup}
          aria-haspopup="true"  className="btn-close position-absolute searchCloseBtn"  aria-label="Close"></button>
          <div className="modify-booking-inner"><Search /></div>
          </div>

          <h2 className="fw-bold mb-3">Plan Your Trip Today!</h2>
        <p className="text-muted mb-4">Book your cab in just one click and enjoy a comfortable, safe journey.</p>

          <button   
                ref={buttonRef}   
                onClick={togglePopup}
                aria-expanded={showPopup}
                aria-haspopup="true" className="modify-btn cmn-btn d-inline-block" >Book Cab Now</button>
            </div>
        <div className="col-md-6">
      <CallBack passData={leadFromData}  />
     
      </div>
 </div>
  </div></section>
);

}