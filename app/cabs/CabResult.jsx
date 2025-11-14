'use client';
import { useState, useEffect,useRef } from "react";
import { useSearchParams,useRouter } from 'next/navigation';
import LeadForm from "/components/LeadForm";
import Search from "/components/Search";
const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL; 

export default function SearchResults() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const bookingType = searchParams.get('bookingType');
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const pick_date = searchParams.get('pick_date');
    const return_date=  searchParams.get('return_date');
    const mobile = searchParams.get('mobile');
    const [loading, setLoading] = useState(true);
    const [distance, setDistance] = useState(null);
    let km = 40;
   const [cars, setCars] = useState([]);
   const [otherdata, setOtherData] = useState([]);


   
  useEffect(() => {
    if (!pick_date || !from || !bookingType || !mobile) {
     // router.replace("/"); 
    }
    const userData = { mobile: mobile };
    localStorage.setItem("userData", JSON.stringify(userData));

  }, [pick_date, from, bookingType,mobile, router]);

  useEffect(() => {
   const getCabs = async () => {
   
      try {


         const searchData = {
          from:from,
          to:to,
          pick_date:pick_date,
          return_date:return_date,
          bookingType:bookingType,
          mobile:mobile
        };


        await fetch(`${NEXT_PUBLIC_SITE_URL}api/search`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(searchData),
        });

        if(from!=null && to!=null)
        {
        const resDis = await fetch(`${NEXT_PUBLIC_SITE_URL}api/distance/?from=${from}&to=${to}`);
        const dataDis = await resDis.json();
        setDistance(dataDis);       
        km = dataDis.distanceInKm;
        }
       
 

        const res = await fetch(`${NEXT_PUBLIC_SITE_URL}api/cabprice/?bookingType=${bookingType}&km=${km}&from=${from}&to=${to}&fD=${pick_date}&tD=${return_date}`);
        const data = await res.json();
        setCars(data.cabs);
        setOtherData(data.other_data);
        

      } catch (err) {
        console.error('Error fetching cities:', err);
      }
      finally {
        setLoading(false);
      }
    }
    getCabs();
  }, []);


  const handleClick = (cabId) => {
    // Example query values

    const kmNew = distance ? distance.distanceInKm : km;

    const queryData = {
        carid: cabId,
        km:  kmNew,
        bookingType: bookingType,
        from: from,
        from_city_id:otherdata.from_city_id,
        to_city_id:otherdata.to_city_id,
        to: to,
        pick_date: pick_date,
        return_date: return_date,
        mobile:mobile
    };

    const encoded = encodeURIComponent(btoa(JSON.stringify(queryData)));
    router.push(`${NEXT_PUBLIC_SITE_URL}booking?data=${encoded}`);

   // router.push(`/booking?${query}`);
  };


  const [showPopup, setShowPopup] = useState(false);
  const buttonRef = useRef(null);

  const togglePopup = () => setShowPopup((s) => !s);



  const leadFromData = {
          from_city:from,
          to_city:to,
          from_city_id:otherdata.from_city_id,
          to_city_id:otherdata.to_city_id,
          pick_date:pick_date,
          return_date:return_date,
          trip_type:bookingType,
          mobile:mobile
   };

 if (loading) return (

  <div className="d-flex justify-content-center align-items-center vh-100">
  <img src="../images/car_running.gif" className="img-fluid" alt="Loading" />
</div>

 );
  return (

 <div  >
          <div   className={showPopup ? "d-block  modify-booking-popup " : "d-none modify-booking-popup"} style={{ zIndex: 9}}>		
          <button 
          ref={buttonRef}   
          onClick={() => setShowPopup(false)}
          aria-expanded={showPopup}
          aria-haspopup="true"  className="btn-close position-absolute searchCloseBtn"  aria-label="Close"></button>
          <div className="modify-booking-inner"><Search leadFromData={leadFromData} /></div>
          </div>

          <div className="modify-booking-row" >
            <div className="container">
              <div className="pagination d-none d-md-block">
                <a href="/">Home</a>
                <span className="p-arrow">&gt;</span>
                <span className="current-link">Select Car</span>
              </div>
              <div className="booking-info-row">
                <div className="booking-left-info d-flex">
                  <h1 className="booking-city">{from} - {to}</h1>
                  <div className="booking-trip-type"><span className="booking-small-heading">Trip Type</span>{otherdata.booking_type}</div>
                  <div className="booking-pick-up"><span className="booking-small-heading">Pick up</span>{pick_date}</div>
                
                </div>
                <div className="modify-book-btn-wrap"><button   
                ref={buttonRef}   
                onClick={togglePopup}
                aria-expanded={showPopup}
                aria-haspopup="true" className="modify-btn cmn-btn d-inline-block" >Modify Booking</button></div>
              </div>
            </div>
          </div>



		

 <div className="book-car-list-mobile">
  <div className="container">
				
      

      

       {cars.length > 0 ? (

      <div className="book-car-tabber-wrap mt-3">


       
      
        <div className="cars-tab-cont-wrap">
        {cars.map(car => (


          <div key={car.cab_id}  className="tabcontent-item  mt-3">
							<div className="book-car-item-mobile">
								<div className="book-car-info-mobile">
									<div className="car-info-mobile">
										<div className="">
											<h3 className="book-car-rating"><span className="carName">{car.name}</span>
											<span className="type-n-seat"> {car.seats} Seater AC Cab</span><span className="car-rating">4.7 <img src="images/rating-star.png" /></span></h3>
										
											<div className="discount-price">₹{car.price}</div>
											<div className="tax-charges">+ ₹{car.other_price} Charges and Taxes</div>
										</div>
									</div>
									<div className="car-info-img-mobile">
										<img src={car.image} className="round-image" width="150" alt={car.name} />
									</div>
								</div>
							
									
								<ul className="book-car-listing">
									<li> <img src="images/driver.svg" width="18" /><span>Driver allowance extra</span></li>
									<li> <img src="images/kms.svg" width="16" /><span>{car.kilometers} kms | ₹{car.km_rate}/km</span></li>
									<li ><img src="images/taxi.png" width="16"/> <span>Cab with Luggage Carrier</span></li>
								</ul>
								<div className="select-car-btn"><button className="cmn-btn d-inline-block" onClick={() => handleClick(car.cab_id)}>Select Car</button></div>
							</div>
						 </div>



        ))}
      </div>   </div>

      ) : (
        <LeadForm title="Share Your Details — Our Team Will Get in Touch" passData={leadFromData}  />
      )}    

    </div>  </div>


<div className="book-consult-wrap select-car-book-cancel-support">
			<div className="container">
				<div className="support-verified">
					<div className="sup-ver-inner d-flex justify-content-between">
						
						<div className="sup-ver-col d-flex align-items-center"><img src="images/pricing.svg" alt="Image 1" height="30" width="30" /><p>Book Now <span className="d-block">at Zero Cost</span></p></div>
							
						<div className="sup-ver-col d-flex align-items-center"><img src="images/free-cancel.svg" alt="Image 1" height="30" width="30" /><p>Free Cancellations <span className="d-block">Upto 1 Hour</span></p></div>
					
						<div className="sup-ver-col d-flex align-items-center"><img src="images/support.svg" alt="Image 1" height="30" width="30" /><p>24x7 Customer<span className="d-block">Support</span></p></div>
					</div>
				</div>
			</div>
		</div>

   </div>
  );
}


/*
 <div className="car-tabs">
						<a href="javascript:void(0)" className="car-tablinks" id="defaultOpen">
							<span className="tab-car-name">Hatchback</span>
							<span className="tab-car-img"><img src="images/wagonr.png" width="56" /></span>
							<span className="tab-car-price"> ₹45398 </span>
						</a>
						<a href="javascript:void(0)" className="car-tablinks"  id="defaultOpen">
							<span className="tab-car-name">Sedan</span>
							<span className="tab-car-img"><img src="images/toyota_etios.png" width="56" /></span>
							<span className="tab-car-price"> ₹45398 </span>
						</a>
						<a href="javascript:void(0)" className="car-tablinks"  id="defaultOpen">
							<span className="tab-car-name">Ertiga</span>
							<span className="tab-car-img"><img src="images/ertiga.png" width="56" /></span>
							<span className="tab-car-price"> ₹45398 </span>
						</a>
					</div>*/