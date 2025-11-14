'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

const Search = ({leadFromData = {}}) => {


  const router = useRouter();
 const [tabData, setTabData] = useState([
    {
      name: 'Outstation',
      subTabs: [
        { name: 'One Way', form: 'oneway',
          fields: [
            { name: 'from', label: 'From', type: 'city' },
            { name: 'to', label: 'To', type: 'city' },
            { name: 'pick_date', label: 'Pick Up Date', type: 'date' },
             { name: 'mobile', label: 'Mobile No.', type: 'tel' }        
          
          ]},

        { name: 'Round Trip', form: 'roundtrip', 
          fields: [
            { name: 'from', label: 'From', type: 'city' },
            { name: 'to', label: 'To', type: 'city' },
            { name: 'pick_date', label: 'Pick Up Date', type: 'date' },
             { name: 'return_date', label: 'Return Date', type: 'date' } ,
              { name: 'mobile', label: 'Mobile No.', type: 'tel' } 
          ], }
      ],
    },
    {
      name: 'Local',
      subTabs: [
        { name: 'Hourly', form: 'hourly', 
          fields: [
            { name: 'from', label: 'City', type: 'city' },
            { name: 'pick_date', label: 'Pick Up Date', type: 'date' },
             { name: 'mobile', label: 'Mobile No.', type: 'tel' }       
          
          ] },
        { name: 'Airport Drop', form: 'airportdrop',
          fields: [
            { name: 'pick_address', label: 'Pick Up Address', type: 'text' },
            { name: 'drop_airport', label: 'Drop Airport', type: 'select', options: []},
            { name: 'pick_date', label: 'Pick Up Date', type: 'date' },
             { name: 'mobile', label: 'Mobile No.', type: 'tel' }          
          
          ]
         },
        { name: 'Airport Pickup', form: 'airportpickup',
           fields: [
             { name: 'pick_airport', label: 'Drop Airport', type: 'select', options: []},
            { name: 'drop_address', label: 'Drop Address', type: 'text' },           
            { name: 'drop_date', label: 'Drop Date', type: 'date' } ,
             { name: 'mobile', label: 'Mobile No.', type: 'tel' }         
          
          ]
         },
      ],
    },
    {
      name: 'Packages',
      subTabs: [
        { name: 'Taxi Package', form: 'taxipackage',
          fields: [
            { name: 'from', label: 'Pickup City', type: 'city'},
            { name: 'to', label: 'Drop City', type: 'city' },           
            { name: 'pick_date', label: 'Pick Date', type: 'date' },
            { name: 'drop_date', label: 'Drop Date', type: 'date' },
             { name: 'mobile', label: 'Mobile No.', type: 'tel' }           
          
          ]
         },
        { name: 'Holiday Package', form: 'holidaypackage',
           fields: [
            { name: 'from', label: 'Pickup City', type: 'city'},
            { name: 'to', label: 'Drop City', type: 'city' },           
            { name: 'pick_date', label: 'Pick Date', type: 'date' },
            { name: 'drop_date', label: 'Drop Date', type: 'date' },
             { name: 'mobile', label: 'Mobile No.', type: 'tel' }           
          
          ]
         },
      ],
    },
  ]);

  const [activeMain, setActiveMain] = useState(0);
  const [activeSub, setActiveSub] = useState(0);
  const [allCities, setAllCities] = useState([]);
  const [formData, setFormData] = useState({
    bookingType: '', // hidden field
    selectedAirports: '',
    from:leadFromData.from_city || '',
    to:leadFromData.to_city || '',
    mobile:leadFromData.mobile || '',
    pick_date:leadFromData.pick_date || '',
    
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [locations, setLocations] = useState([]);

const handleMainTabClick = (index) => {
    setActiveMain(index);
    setActiveSub(0);
    setFormData({});
    setErrors({});
    setMessage('');
    setFromSuggestions([]);
    setToSuggestions([]);
  };

  const handleSubTabClick = (index) => {
    setActiveSub(index);
    setFormData({});
    setErrors({});
    setMessage('');
    setFromSuggestions([]);
    setToSuggestions([]);
  };


   // Fetch select options from API on page load
  useEffect(() => {
    async function fetchAirports() {
      try {
        const res = await fetch(`${NEXT_PUBLIC_SITE_URL}api/airports`); // your API route
        const data = await res.json();
       // setAirports(data.airports || []);

      const airportOptions = data.airports.map((airport) => airport); // example: ['T1','T2','T3']


        setTabData((prevTabData) =>
          prevTabData.map((tab) => ({
            ...tab,
            subTabs: tab.subTabs.map((sub) => ({
              ...sub,
              fields: sub.fields.map((field) =>
              ['drop_airport', 'pick_airport'].includes(field.name)
                  ? { ...field, options: airportOptions }
                  : field
              ),
            })),
          }))
        );
    

      } catch (err) {
        console.error('Failed to fetch options', err);
      }
    }
    fetchAirports();
  }, []);


  useEffect(() => {
    const bookingType = `${tabData[activeMain].subTabs[activeSub].form}`;
    setFormData((prev) => ({ ...prev, bookingType }));
  }, [activeMain, activeSub]);


  // Fetch cities on page load
  useEffect(() => {
    async function fetchCities() {
      try {
        const res = await fetch(`${NEXT_PUBLIC_SITE_URL}api/cities`);
        const data = await res.json();
        setAllCities(data.cities || []);
      } catch (err) {
        console.error('Error fetching cities:', err);
      }
    }
    fetchCities();
  }, []);

  const handleChange = async (e) => {
  const { name, value } = e.target;
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });


    // Auto-suggest for city field
   if (name === 'from') {
    
      const res = await fetch(`${NEXT_PUBLIC_SITE_URL}api/location?input=${value}`);
      const data = await res.json();
      setLocations(data.candidates || []);
      setFromSuggestions(allCities);
    } else if (name === 'to') {
     
      const res = await fetch(`${NEXT_PUBLIC_SITE_URL}api/location?input=${value}`);
      const data = await res.json();
      setLocations(data.candidates || []);
      setToSuggestions(allCities);
    }


  };

 const handleSuggestionClick = (name, city) => {
    setFormData((prev) => ({ ...prev, [name]: city }));
    if (name === 'from') setFromSuggestions([]);
    if (name === 'to') setToSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = tabData[activeMain].subTabs[activeSub].fields;
    const newErrors = {};

   

    // ✅ Validate only existing fields
    fields.forEach((field) => {
      const value = formData[field.name];
      if (field && (value === undefined || value === '')) {
        newErrors[field.name] = `${field.label} is required.`;
      }
      if (field.name === 'max' && formData.min && formData.max) {
        if (Number(formData.min) > Number(formData.max)) {
          newErrors.max = 'Max price must be greater than Min price.';
        }
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      //console.log('✅ Submitted:', formData);
      //setMessage('✅ Form submitted successfully!');
      //setTimeout(() => setMessage(''), 2000);
      const query = new URLSearchParams(formData).toString();
      router.push(`${NEXT_PUBLIC_SITE_URL}cabs?${query}`);
     window.location.href = `${NEXT_PUBLIC_SITE_URL}cabs?${query}`;

    } else {
      setMessage('');
    }
  };

  const activeFields = tabData[activeMain].subTabs[activeSub].fields;
  const today = new Date().toISOString().split("T")[0];

  const bookingType = tabData?.[activeMain]?.subTabs?.[activeSub]?.form;

  return (

	<div className="bnr-form-wrap"><div className="container">
    
    <div className="tabber-wrap bnr-form-inner">

      {/* Main Tabs */}
      <div className="main-btn-tabLinks"><ul className="main-btn-list tabs main-tabs">
        {tabData.map((tab, i) => (
			<li  key={i}
            onClick={() => handleMainTabClick(i)}
			      className={`tablinks ${activeMain === i ? 'active' : ''}`} ><span>{tab.name}</span></li>         
        ))}
      </ul></div>

      {/* Sub Tabs */}
	    <form onSubmit={handleSubmit} action="booking-cabs">
         <input type="hidden" name="bookingType" value={bookingType||"oneway"} />
     <div className="main-tabcontent-wrap tab-cont-wrap">
      <div  className="tabcontent active"><div className="sub-tabber-wrap">
       
	   <div className="main-btn-tabLinks"><ul className="main-btn-list sub-tabs">
		{tabData[activeMain].subTabs.map((sub, i) => (
          <li
            key={i}
            onClick={() => handleSubTabClick(i)}
            className={`sub-tablinks ${activeSub === i ? 'active' : '' }`} >
            {sub.name}
          </li>
        ))}</ul></div> 


	<div className="main-tabcontent-wrap tab-cont-wrap">
    <div className="sub-tabcontent first-tabcontent active" >
<div className="route-way-form-wrap">
        {activeFields.map((field) => (
          <div   className={`form-group ${field.type === 'date' ? 'calender1' : '' }`} key={field.name}>
            <label>{field.label}</label>
            {field.type === 'select' ? (
              <select
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select {field.label}</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) 
            : field.type === 'city' ? (
                 <div className="cmn-input-wrap">
                  <span className="search-icon"></span>
                <input
                  name={field.name}
                  type="text"
                  placeholder={field.label}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  className="form-control"
                  autoComplete="off"
                />
                {(field.name === 'from' ? fromSuggestions : toSuggestions).length > 0 && (
                 <div className="custom-input-dropdown-wrap "> 
                 <div className="custom-input-mobile-only">
									<span className="back-icon"></span>
                  <input className="form-control mobile-form-control" type="text" placeholder="Select Location" /></div>
                 
                <ul className="custom-input-dropdown show">

                     {locations.map((location) => (
                      <li className="custom-input-select cursor-pointer"  key={location.place_id}
                      
                      onClick={() => handleSuggestionClick(field.name, location.name)}
                      >{location.formatted_address}</li>
                      ))}


                    <li className="custom-input-heading"><span>Popular Cities</span></li>
                    {(field.name === 'from' ? fromSuggestions : toSuggestions).map(
                      (city) => (
                        <li
                          key={city.city}
                          className="custom-input-select cursor-pointer"
                          onClick={() => handleSuggestionClick(field.name, city.city)}
                        >
                          {city.city}, {city.state}
                        </li>
                      )
                    )}
                  </ul>     </div>
                )}
              </div>
            )
            : (
              <input
                name={field.name}
                type={field.type}
               {...(field.type === "date" ? { min: today } : {})}
                placeholder={field.label}
                value={formData[field.name] || ''}
                onChange={handleChange}               
                className="form-control"
              />
            )}
            {errors[field.name] && (
              <p className="text-red-600 text-sm">{errors[field.name]}</p>
            )}
          </div>
        ))}



  </div>

	</div></div>


 </div></div></div>  {/* Sub Tabs */}

<div className="explore-wrap">
	  {message && <p className="text-green-600 text-sm mt-2">{message}</p>}
<button type="submit" className="black-yellow">Explore Cabs</button> 
</div></form>
   
   </div> </div> </div>	
  );
};

export default Search;

