'use client';

import { useSearchParams,useRouter  } from 'next/navigation';
import { useState, useEffect } from "react";
export default function CabDetails() {
const router = useRouter();
const searchParams = useSearchParams();

const [activeTab, setActiveTab] = useState("tab1");

/*
const bookingType = searchParams.get('bookingType');
const from = searchParams.get('from');
const from_city_id = searchParams.get('from_city_id');
const to_city_id = searchParams.get('to_city_id');
const km = searchParams.get('km');
const to = searchParams.get('to');
const pick_date = searchParams.get('pick_date');
const return_date=  searchParams.get('return_date');
const mobile = searchParams.get('mobile');
const carid = searchParams.get('carid');*/


 const encodedData = searchParams.get("data");
 let decodedData = null;
  if (encodedData) {
    try {
      decodedData = JSON.parse(atob(decodeURIComponent(encodedData)));
    } catch (e) {
      //console.error("Failed to decode data:", e);
    }

  }
  else
  {
    router.replace("/");
  }


const bookingType = decodedData.bookingType;
const from = decodedData.from;
const from_city_id = decodedData.from_city_id;
const to_city_id = decodedData.to_city_id;
const km = decodedData.km;
const to = decodedData.to;
const pick_date = decodedData.pick_date;
const return_date = decodedData.return_date;
const carid = decodedData.carid;
const mobile = decodedData.mobile;
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [cars, setCars] = useState([]);
const [message, setMessage] = useState("");
const [otherdata, setOtherData] = useState([]);




     useEffect(() => {
    if (!pick_date || !from || !bookingType || !mobile || !from_city_id) {
      //router.replace("/");
      alert('error');
    }
  }, [pick_date, from, bookingType,mobile,from_city_id, router]);

  useEffect(() => {
    async function getCabs() {
      try {
      
        const query = new URLSearchParams({
        carid: carid,
        km: km,
        bookingType: bookingType,
        from: from,
        from_city_id:from_city_id,
        to_city_id:to_city_id,
        to: to,
        fD: pick_date,
        tD: return_date
    }).toString();

        const res = await fetch(`/api/cabprice/?${query}`);
        const data = await res.json();
        setCars(data.cabs[0]);
        setOtherData(data.other_data);
      } catch (err) {
        console.error('Error fetching cities:', err);
      }
    }
    getCabs();
  }, []);




const [submittedData, setSubmittedData] = useState(null);
const [paymentType, setPaymentType] = useState('');

const [formData, setFormData] = useState({
    name: '',
    email: '',
    drop_address: '',
    amount:cars.total_price,
    mobile: mobile,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      

    if (!formData.name.trim()) {
      setError("Please enter your name");
      
      return
    }
    if (!formData.email.trim()) {
      setError("Please enter your email");
      
      return
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
     
      return
    }
      if (!formData.drop_address.trim()) {
      setError("Please enter your address");
     
      return
    }
  
    setError("");

     setSubmittedData(formData);
  };

   // handle final API submit
  const handleProceed = async () => {
    if (!paymentType) {
      //alert('Please select a payment option');
       setMessage("Please select payment option");
      return;
    }

      setLoading(true);
      setMessage("Redirecting to payment gateway... Please wait.");

    const finalData = {
      ...submittedData,
       amount:cars.total_price,
      payment_type: paymentType,
      from:from,
      to:to,
      pick_date:pick_date,
      return_date:return_date,
      carid:carid,
      bookingType:bookingType
    };

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      });

      if (res.ok) 
        {
        const data = await res.json();
        if(data.booking_id && data.amount)
        {           
            router.push(`/booking-status?booking_id=${data.booking_id}&amount=${data.amount}`);
            return;            
        }
        else
        {

          if (!data.redirectUrl || !data.response) {
           setMessage("Something went wrong. Please try again.");
           setLoading(false);
            return;
          }    
          router.push(data.redirectUrl);
          return;
        }

      } else {
      setMessage("Error connecting to payment gateway.");
      setLoading(false);
      }
    } catch (error) {
      console.error('API error:', error);    
      setMessage("Error connecting to payment gateway.");
      setLoading(false);
    }
    
  };






  return (
    <div className="car-search-mid-area py-5"><div className="container">		<div className="contact-pickup-form-wrap">
  <div className="form-left-area"><div className="contact-pickup-form  box-shadow-wrap">	<div className="contact-pickup-form-inner">
    
 <h1 className="contact-pickup-heading">CONTACT & PICKUP DETAILS</h1>
 {!submittedData && (
<form onSubmit={handleSubmit} >
        <div className="form-group">
          <label >Name</label>
          <div className="form-field"><input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          /></div>
        </div>

        <div className="form-group ">
          <label >Email</label>
          <div className="form-field"><input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          /></div>
        </div>

        <div className="form-group ">
          <label >Mobile</label>
          <div className="form-field"><input
            type="tel"
            className="form-control"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            required
          /></div>
        </div>

        {/* Hidden inputs from query params */}
        <input type="hidden" name="city_from" value={from} />
        <input type="hidden" name="to_city" value={to} />

        <div className="form-group">
          <label >Trip Details</label>
         <div className="form-field"> <input
            type="text"
            className="form-control"
            value={`${from || '-'} → ${to || '-'}`}
            readOnly
          /></div>
        </div>

          <div className="form-group">
          <label >Drop Address</label>
          <div className="form-field"><input
            type="text"
            className="form-control"
            name="drop_address"
            value={formData.drop_address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
          /></div>
        </div>

  {error && <p className="text-red">{error}</p>}
	<div className="form-group">
        <button type="submit" className="cmn-btn d-block w-100">
          Submit
        </button></div>
      </form>
      )}
       {/* Step 2: Payment Options */}
      {submittedData && (
        <div className="p-3">
          <h5 className="contact-pickup-heading">Hello, {submittedData.name}!</h5>
          <p>Select your payment option:</p>

          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="payment"
              id="full"
              value="fullPayment"
              onChange={(e) => setPaymentType(e.target.value)}
            />
            <label className="form-check-label" htmlFor="full">
              Full Payment (&#8377;{cars.total_price})
            </label>
          </div>

          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="payment"
              id="half"
              value="halfPayment"
              onChange={(e) => setPaymentType(e.target.value)}
            />
            <label className="form-check-label" htmlFor="half">
              50% Payment (&#8377;{cars.total_price/2})
            </label>
          </div>

          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              name="payment"
              id="driver"
              value="payDriver"
              onChange={(e) => setPaymentType(e.target.value)}
            />
            <label className="form-check-label" htmlFor="driver">
               Pay to Driver
            </label>
          </div>
<div className="form-group">
          <button onClick={handleProceed} className="cmn-btn d-block w-100">
            {loading ? "Processing..." : "Pay Now"}
          </button></div>
        </div>
      )}
      {message && (<div className="p-3">
        <p style={{ color: loading ? "orange" : "red" }}>
          {message}
        </p></div>
      )}

    </div> </div> </div>

    <div className="form-right-area">  <div className="booking-detail-wrap box-shadow-wrap"> 
      <h2 className="booking-detail-heading">Your Booking Details</h2>


            <div className="booking-detail-rows">
								
								<div className="booking-cmn-row">
									<div className="booking-col bold-col">Itinerary :</div>
									<div className="booking-col">{from} → {to}</div>
								</div>
								<div className="booking-cmn-row">
									<div className="booking-col bold-col">Pickup Date :</div>
									<div className="booking-col">{pick_date}</div>
								</div>
								<div className="booking-cmn-row">
									<div className="booking-col bold-col">Car :</div>
									<div className="booking-col">{cars.name}</div>
								</div>
							
								<div className="booking-cmn-row">
									<div className="booking-col bold-col">Total Fare :</div>
									<div className="booking-col">₹ {cars.total_price}</div>
								</div>
								
						</div>

        <div className="car-extra-info-wrap  box-shadow-wrap">
							
								<div className="book-car-item-mobile car-extra-tab-info">
									<div className="extra-info-tabs">
									  <button className={`tablinks1 ${activeTab === "tab1" ? "active" : ""}`}  onClick={() => setActiveTab("tab1")} >Inclusions</button>
									  <button className={`tablinks1 ${activeTab === "tab2" ? "active" : ""}`}  onClick={() => setActiveTab("tab2")} >Exclusions</button>
									  <button className={`tablinks1 ${activeTab === "tab3" ? "active" : ""}`}  onClick={() => setActiveTab("tab3")}>T&C</button>
									</div>

                   {activeTab === "tab1" &&
									<div id="tab1" className="tabcontent1" >
									 
										  <ul className="extra-info-img-listing ">
												<li><span className="cmn-icon fuel-icon"><img src="images/fuel.svg" /></span>Base Fare and Fuel Charges </li>
												<li><span className="cmn-icon allowance-icon"><img src="images/driver-ic.svg" /></span>Driver Allowance</li>
												<li> <span className="cmn-icon toll-icon"><img src="images/tax-toll.svg" /></span>State Tax & Toll   </li>
												<li><span className="cmn-icon gst-icon"><img src="images/gst.svg" /></span>GST (5%) </li>
										  </ul>
									</div>
                  }

                  {activeTab === "tab2" &&
									<div id="tab2" className="tabcontent1">
									 
									  <ul className="extra-info-img-listing ">
											<li><span className="cmn-icon pay-icon"><img src="images/rs-ic.svg" /></span>  Pay ₹17/km after 2425 km  </li>
											<li><span className="cmn-icon pickup-icon"><img src="images/taxi.png" /></span> Multiple pickups/drops </li>
									  </ul>
									</div>

                  }
									{activeTab === "tab3" &&
									<div id="tab3" className="tabcontent1">
									
									  <ul className="extra-info-img-listing in-ex-list">
											<li> Your Trip has a KM limit. If your usage exceeds this limit, you will be charged for the excess KM used. </li>
											<li> Your trip includes one pick up in Pick-up city and one drop to destination city. It does not include within city travel. </li>
											<li>  If your Trip  has Hill climbs, cab AC may be switched off during such climbs. </li>
									  </ul>
									</div>
                  }
								</div>
							
						</div>



      
      </div></div>

</div></div></div>



  );
}
