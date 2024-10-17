import { useFormik } from "formik";
import { useContext, useState } from "react";
import AuthContext from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS


const statesAndDistricts  = [
    
    {  
       "state":"Andhra Pradesh",
       "districts":[  
          "Anantapur",
          "Chittoor",
          "East Godavari",
          "Guntur",
          "Krishna",
          "Kurnool",
          "Nellore",
          "Prakasam",
          "Srikakulam",
          "Visakhapatnam",
          "Vizianagaram",
          "West Godavari",
          "YSR Kadapa"
       ]
    },
    {  
       "state":"Arunachal Pradesh",
       "districts":[  
          "Tawang",
          "West Kameng",
          "East Kameng",
          "Papum Pare",
          "Kurung Kumey",
          "Kra Daadi",
          "Lower Subansiri",
          "Upper Subansiri",
          "West Siang",
          "East Siang",
          "Siang",
          "Upper Siang",
          "Lower Siang",
          "Lower Dibang Valley",
          "Dibang Valley",
          "Anjaw",
          "Lohit",
          "Namsai",
          "Changlang",
          "Tirap",
          "Longding"
       ]
    },
    {  
       "state":"Assam",
       "districts":[  
          "Baksa",
          "Barpeta",
          "Biswanath",
          "Bongaigaon",
          "Cachar",
          "Charaideo",
          "Chirang",
          "Darrang",
          "Dhemaji",
          "Dhubri",
          "Dibrugarh",
          "Goalpara",
          "Golaghat",
          "Hailakandi",
          "Hojai",
          "Jorhat",
          "Kamrup Metropolitan",
          "Kamrup",
          "Karbi Anglong",
          "Karimganj",
          "Kokrajhar",
          "Lakhimpur",
          "Majuli",
          "Morigaon",
          "Nagaon",
          "Nalbari",
          "Dima Hasao",
          "Sivasagar",
          "Sonitpur",
          "South Salmara-Mankachar",
          "Tinsukia",
          "Udalguri",
          "West Karbi Anglong"
       ]
    },
    {  
       "state":"Bihar",
       "districts":[  
          "Araria",
          "Arwal",
          "Aurangabad",
          "Banka",
          "Begusarai",
          "Bhagalpur",
          "Bhojpur",
          "Buxar",
          "Darbhanga",
          "East Champaran (Motihari)",
          "Gaya",
          "Gopalganj",
          "Jamui",
          "Jehanabad",
          "Kaimur (Bhabua)",
          "Katihar",
          "Khagaria",
          "Kishanganj",
          "Lakhisarai",
          "Madhepura",
          "Madhubani",
          "Munger (Monghyr)",
          "Muzaffarpur",
          "Nalanda",
          "Nawada",
          "Patna",
          "Purnia (Purnea)",
          "Rohtas",
          "Saharsa",
          "Samastipur",
          "Saran",
          "Sheikhpura",
          "Sheohar",
          "Sitamarhi",
          "Siwan",
          "Supaul",
          "Vaishali",
          "West Champaran"
       ]
    },
    {  
       "state":"Chandigarh (UT)",
       "districts":[  
          "Chandigarh"
       ]
    },
    {  
       "state":"Chhattisgarh",
       "districts":[  
          "Balod",
          "Baloda Bazar",
          "Balrampur",
          "Bastar",
          "Bemetara",
          "Bijapur",
          "Bilaspur",
          "Dantewada (South Bastar)",
          "Dhamtari",
          "Durg",
          "Gariyaband",
          "Janjgir-Champa",
          "Jashpur",
          "Kabirdham (Kawardha)",
          "Kanker (North Bastar)",
          "Kondagaon",
          "Korba",
          "Korea (Koriya)",
          "Mahasamund",
          "Mungeli",
          "Narayanpur",
          "Raigarh",
          "Raipur",
          "Rajnandgaon",
          "Sukma",
          "Surajpur  ",
          "Surguja"
       ]
    },
    {  
       "state":"Dadra and Nagar Haveli (UT)",
       "districts":[  
          "Dadra & Nagar Haveli"
       ]
    },
    {  
       "state":"Daman and Diu (UT)",
       "districts":[  
          "Daman",
          "Diu"
       ]
    },
    {  
       "state":"Delhi (NCT)",
       "districts":[  
          "Central Delhi",
          "East Delhi",
          "New Delhi",
          "North Delhi",
          "North East  Delhi",
          "North West  Delhi",
          "Shahdara",
          "South Delhi",
          "South East Delhi",
          "South West  Delhi",
          "West Delhi"
       ]
    },
    {  
       "state":"Goa",
       "districts":[  
          "North Goa",
          "South Goa"
       ]
    },
    {  
       "state":"Gujarat",
       "districts":[  
          "Ahmedabad",
          "Amreli",
          "Anand",
          "Aravalli",
          "Banaskantha (Palanpur)",
          "Bharuch",
          "Bhavnagar",
          "Botad",
          "Chhota Udepur",
          "Dahod",
          "Dangs (Ahwa)",
          "Devbhoomi Dwarka",
          "Gandhinagar",
          "Gir Somnath",
          "Jamnagar",
          "Junagadh",
          "Kachchh",
          "Kheda (Nadiad)",
          "Mahisagar",
          "Mehsana",
          "Morbi",
          "Narmada (Rajpipla)",
          "Navsari",
          "Panchmahal (Godhra)",
          "Patan",
          "Porbandar",
          "Rajkot",
          "Sabarkantha (Himmatnagar)",
          "Surat",
          "Surendranagar",
          "Tapi (Vyara)",
          "Vadodara",
          "Valsad"
       ]
    },
    {  
       "state":"Haryana",
       "districts":[  
          "Ambala",
          "Bhiwani",
          "Charkhi Dadri",
          "Faridabad",
          "Fatehabad",
          "Gurgaon",
          "Hisar",
          "Jhajjar",
          "Jind",
          "Kaithal",
          "Karnal",
          "Kurukshetra",
          "Mahendragarh",
          "Mewat",
          "Palwal",
          "Panchkula",
          "Panipat",
          "Rewari",
          "Rohtak",
          "Sirsa",
          "Sonipat",
          "Yamunanagar"
       ]
    },
    {  
       "state":"Himachal Pradesh",
       "districts":[  
          "Bilaspur",
          "Chamba",
          "Hamirpur",
          "Kangra",
          "Kinnaur",
          "Kullu",
          "Lahaul &amp; Spiti",
          "Mandi",
          "Shimla",
          "Sirmaur (Sirmour)",
          "Solan",
          "Una"
       ]
    },
    {  
       "state":"Jammu and Kashmir",
       "districts":[  
          "Anantnag",
          "Bandipore",
          "Baramulla",
          "Budgam",
          "Doda",
          "Ganderbal",
          "Jammu",
          "Kargil",
          "Kathua",
          "Kishtwar",
          "Kulgam",
          "Kupwara",
          "Leh",
          "Poonch",
          "Pulwama",
          "Rajouri",
          "Ramban",
          "Reasi",
          "Samba",
          "Shopian",
          "Srinagar",
          "Udhampur"
       ]
    },
    {  
       "state":"Jharkhand",
       "districts":[  
          "Bokaro",
          "Chatra",
          "Deoghar",
          "Dhanbad",
          "Dumka",
          "East Singhbhum",
          "Garhwa",
          "Giridih",
          "Godda",
          "Gumla",
          "Hazaribag",
          "Jamtara",
          "Khunti",
          "Koderma",
          "Latehar",
          "Lohardaga",
          "Pakur",
          "Palamu",
          "Ramgarh",
          "Ranchi",
          "Sahibganj",
          "Seraikela-Kharsawan",
          "Simdega",
          "West Singhbhum"
       ]
    },
    {  
       "state":"Karnataka",
       "districts":[  
          "Bagalkot",
          "Ballari (Bellary)",
          "Belagavi (Belgaum)",
          "Bengaluru (Bangalore) Rural",
          "Bengaluru (Bangalore) Urban",
          "Bidar",
          "Chamarajanagar",
          "Chikballapur",
          "Chikkamagaluru (Chikmagalur)",
          "Chitradurga",
          "Dakshina Kannada",
          "Davangere",
          "Dharwad",
          "Gadag",
          "Hassan",
          "Haveri",
          "Kalaburagi (Gulbarga)",
          "Kodagu",
          "Kolar",
          "Koppal",
          "Mandya",
          "Mysuru (Mysore)",
          "Raichur",
          "Ramanagara",
          "Shivamogga (Shimoga)",
          "Tumakuru (Tumkur)",
          "Udupi",
          "Uttara Kannada (Karwar)",
          "Vijayapura (Bijapur)",
          "Yadgir"
       ]
    },
    {  
       "state":"Kerala",
       "districts":[  
          "Alappuzha",
          "Ernakulam",
          "Idukki",
          "Kannur",
          "Kasaragod",
          "Kollam",
          "Kottayam",
          "Kozhikode",
          "Malappuram",
          "Palakkad",
          "Pathanamthitta",
          "Thiruvananthapuram",
          "Thrissur",
          "Wayanad"
       ]
    },
    {  
       "state":"Lakshadweep (UT)",
       "districts":[  
          "Agatti",
          "Amini",
          "Androth",
          "Bithra",
          "Chethlath",
          "Kavaratti",
          "Kadmath",
          "Kalpeni",
          "Kilthan",
          "Minicoy"
       ]
    },
    {  
       "state":"Madhya Pradesh",
       "districts":[  
          "Agar Malwa",
          "Alirajpur",
          "Anuppur",
          "Ashoknagar",
          "Balaghat",
          "Barwani",
          "Betul",
          "Bhind",
          "Bhopal",
          "Burhanpur",
          "Chhatarpur",
          "Chhindwara",
          "Damoh",
          "Datia",
          "Dewas",
          "Dhar",
          "Dindori",
          "Guna",
          "Gwalior",
          "Harda",
          "Hoshangabad",
          "Indore",
          "Jabalpur",
          "Jhabua",
          "Katni",
          "Khandwa",
          "Khargone",
          "Mandla",
          "Mandsaur",
          "Morena",
          "Narsinghpur",
          "Neemuch",
          "Panna",
          "Raisen",
          "Rajgarh",
          "Ratlam",
          "Rewa",
          "Sagar",
          "Satna",
          "Sehore",
          "Seoni",
          "Shahdol",
          "Shajapur",
          "Sheopur",
          "Shivpuri",
          "Sidhi",
          "Singrauli",
          "Tikamgarh",
          "Ujjain",
          "Umaria",
          "Vidisha"
       ]
    },
    {  
       "state":"Maharashtra",
       "districts":[  
          "Ahmednagar",
          "Akola",
          "Amravati",
          "Aurangabad",
          "Beed",
          "Bhandara",
          "Buldhana",
          "Chandrapur",
          "Dhule",
          "Gadchiroli",
          "Gondia",
          "Hingoli",
          "Jalgaon",
          "Jalna",
          "Kolhapur",
          "Latur",
          "Mumbai City",
          "Mumbai Suburban",
          "Nagpur",
          "Nanded",
          "Nandurbar",
          "Nashik",
          "Osmanabad",
          "Palghar",
          "Parbhani",
          "Pune",
          "Raigad",
          "Ratnagiri",
          "Sangli",
          "Satara",
          "Sindhudurg",
          "Solapur",
          "Thane",
          "Wardha",
          "Washim",
          "Yavatmal"
       ]
    },
    {  
       "state":"Manipur",
       "districts":[  
          "Bishnupur",
          "Chandel",
          "Churachandpur",
          "Imphal East",
          "Imphal West",
          "Jiribam",
          "Kakching",
          "Kamjong",
          "Kangpokpi",
          "Noney",
          "Pherzawl",
          "Senapati",
          "Tamenglong",
          "Tengnoupal",
          "Thoubal",
          "Ukhrul"
       ]
    },
    {  
       "state":"Meghalaya",
       "districts":[  
          "East Garo Hills",
          "East Jaintia Hills",
          "East Khasi Hills",
          "North Garo Hills",
          "Ri Bhoi",
          "South Garo Hills",
          "South West Garo Hills ",
          "South West Khasi Hills",
          "West Garo Hills",
          "West Jaintia Hills",
          "West Khasi Hills"
       ]
    },
    {  
       "state":"Mizoram",
       "districts":[  
          "Aizawl",
          "Champhai",
          "Kolasib",
          "Lawngtlai",
          "Lunglei",
          "Mamit",
          "Saiha",
          "Serchhip"
       ]
    },
    {  
       "state":"Nagaland",
       "districts":[  
          "Dimapur",
          "Kiphire",
          "Kohima",
          "Longleng",
          "Mokokchung",
          "Mon",
          "Peren",
          "Phek",
          "Tuensang",
          "Wokha",
          "Zunheboto"
       ]
    },
    {  
       "state":"Odisha",
       "districts":[  
          "Angul",
          "Balangir",
          "Balasore",
          "Bargarh",
          "Bhadrak",
          "Boudh",
          "Cuttack",
          "Deogarh",
          "Dhenkanal",
          "Gajapati",
          "Ganjam",
          "Jagatsinghapur",
          "Jajpur",
          "Jharsuguda",
          "Kalahandi",
          "Kandhamal",
          "Kendrapara",
          "Kendujhar (Keonjhar)",
          "Khordha",
          "Koraput",
          "Malkangiri",
          "Mayurbhanj",
          "Nabarangpur",
          "Nayagarh",
          "Nuapada",
          "Puri",
          "Rayagada",
          "Sambalpur",
          "Sonepur",
          "Sundargarh"
       ]
    },
    {  
       "state":"Puducherry (UT)",
       "districts":[  
          "Karaikal",
          "Mahe",
          "Pondicherry",
          "Yanam"
       ]
    },
    {  
       "state":"Punjab",
       "districts":[  
          "Amritsar",
          "Barnala",
          "Bathinda",
          "Faridkot",
          "Fatehgarh Sahib",
          "Fazilka",
          "Ferozepur",
          "Gurdaspur",
          "Hoshiarpur",
          "Jalandhar",
          "Kapurthala",
          "Ludhiana",
          "Mansa",
          "Moga",
          "Muktsar",
          "Nawanshahr (Shahid Bhagat Singh Nagar)",
          "Pathankot",
          "Patiala",
          "Rupnagar",
          "Sahibzada Ajit Singh Nagar (Mohali)",
          "Sangrur",
          "Tarn Taran"
       ]
    },
    {  
       "state":"Rajasthan",
       "districts":[  
          "Ajmer",
          "Alwar",
          "Banswara",
          "Baran",
          "Barmer",
          "Bharatpur",
          "Bhilwara",
          "Bikaner",
          "Bundi",
          "Chittorgarh",
          "Churu",
          "Dausa",
          "Dholpur",
          "Dungarpur",
          "Hanumangarh",
          "Jaipur",
          "Jaisalmer",
          "Jalore",
          "Jhalawar",
          "Jhunjhunu",
          "Jodhpur",
          "Karauli",
          "Kota",
          "Nagaur",
          "Pali",
          "Pratapgarh",
          "Rajsamand",
          "Sawai Madhopur",
          "Sikar",
          "Sirohi",
          "Sri Ganganagar",
          "Tonk",
          "Udaipur"
       ]
    },
    {  
       "state":"Sikkim",
       "districts":[  
          "East Sikkim",
          "North Sikkim",
          "South Sikkim",
          "West Sikkim"
       ]
    },
    {  
       "state":"Tamil Nadu",
       "districts":[  
          "Ariyalur",
          "Chennai",
          "Coimbatore",
          "Cuddalore",
          "Dharmapuri",
          "Dindigul",
          "Erode",
          "Kanchipuram",
          "Kanyakumari",
          "Karur",
          "Krishnagiri",
          "Madurai",
          "Nagapattinam",
          "Namakkal",
          "Nilgiris",
          "Perambalur",
          "Pudukkottai",
          "Ramanathapuram",
          "Salem",
          "Sivaganga",
          "Thanjavur",
          "Theni",
          "Thoothukudi (Tuticorin)",
          "Tiruchirappalli",
          "Tirunelveli",
          "Tiruppur",
          "Tiruvallur",
          "Tiruvannamalai",
          "Tiruvarur",
          "Vellore",
          "Viluppuram",
          "Virudhunagar"
       ]
    },
    {  
       "state":"Telangana",
       "districts":[  
          "Adilabad",
          "Bhadradri Kothagudem",
          "Hyderabad",
          "Jagtial",
          "Jangaon",
          "Jayashankar Bhoopalpally",
          "Jogulamba Gadwal",
          "Kamareddy",
          "Karimnagar",
          "Khammam",
          "Komaram Bheem Asifabad",
          "Mahabubabad",
          "Mahabubnagar",
          "Mancherial",
          "Medak",
          "Medchal",
          "Nagarkurnool",
          "Nalgonda",
          "Nirmal",
          "Nizamabad",
          "Peddapalli",
          "Rajanna Sircilla",
          "Rangareddy",
          "Sangareddy",
          "Siddipet",
          "Suryapet",
          "Vikarabad",
          "Wanaparthy",
          "Warangal (Rural)",
          "Warangal (Urban)",
          "Yadadri Bhuvanagiri"
       ]
    },
    {  
       "state":"Tripura",
       "districts":[  
          "Dhalai",
          "Gomati",
          "Khowai",
          "North Tripura",
          "Sepahijala",
          "South Tripura",
          "Unakoti",
          "West Tripura"
       ]
    },
    {  
       "state":"Uttarakhand",
       "districts":[  
          "Almora",
          "Bageshwar",
          "Chamoli",
          "Champawat",
          "Dehradun",
          "Haridwar",
          "Nainital",
          "Pauri Garhwal",
          "Pithoragarh",
          "Rudraprayag",
          "Tehri Garhwal",
          "Udham Singh Nagar",
          "Uttarkashi"
       ]
    },
    {  
       "state":"Uttar Pradesh",
       "districts":[  
          "Agra",
          "Aligarh",
          "Allahabad",
          "Ambedkar Nagar",
          "Amethi (Chatrapati Sahuji Mahraj Nagar)",
          "Amroha (J.P. Nagar)",
          "Auraiya",
          "Azamgarh",
          "Baghpat",
          "Bahraich",
          "Ballia",
          "Balrampur",
          "Banda",
          "Barabanki",
          "Bareilly",
          "Basti",
          "Bhadohi",
          "Bijnor",
          "Budaun",
          "Bulandshahr",
          "Chandauli",
          "Chitrakoot",
          "Deoria",
          "Etah",
          "Etawah",
          "Faizabad",
          "Farrukhabad",
          "Fatehpur",
          "Firozabad",
          "Gautam Buddha Nagar",
          "Ghaziabad",
          "Ghazipur",
          "Gonda",
          "Gorakhpur",
          "Hamirpur",
          "Hapur (Panchsheel Nagar)",
          "Hardoi",
          "Hathras",
          "Jalaun",
          "Jaunpur",
          "Jhansi",
          "Kannauj",
          "Kanpur Dehat",
          "Kanpur Nagar",
          "Kanshiram Nagar (Kasganj)",
          "Kaushambi",
          "Kushinagar (Padrauna)",
          "Lakhimpur - Kheri",
          "Lalitpur",
          "Lucknow",
          "Maharajganj",
          "Mahoba",
          "Mainpuri",
          "Mathura",
          "Mau",
          "Meerut",
          "Mirzapur",
          "Moradabad",
          "Muzaffarnagar",
          "Pilibhit",
          "Pratapgarh",
          "RaeBareli",
          "Rampur",
          "Saharanpur",
          "Sambhal (Bhim Nagar)",
          "Sant Kabir Nagar",
          "Shahjahanpur",
          "Shamali (Prabuddh Nagar)",
          "Shravasti",
          "Siddharth Nagar",
          "Sitapur",
          "Sonbhadra",
          "Sultanpur",
          "Unnao",
          "Varanasi"
       ]
    },
    {  
       "state":"West Bengal",
       "districts":[  
          "Alipurduar",
          "Bankura",
          "Birbhum",
          "Burdwan (Bardhaman)",
          "Cooch Behar",
          "Dakshin Dinajpur (South Dinajpur)",
          "Darjeeling",
          "Hooghly",
          "Howrah",
          "Jalpaiguri",
          "Kalimpong",
          "Kolkata",
          "Malda",
          "Murshidabad",
          "Nadia",
          "North 24 Parganas",
          "Paschim Medinipur (West Medinipur)",
          "Purba Medinipur (East Medinipur)",
          "Purulia",
          "South 24 Parganas",
          "Uttar Dinajpur (North Dinajpur)"
       ]
    }
 ]

export default function Property() {
    const { handlePropertyCreation } = useContext(AuthContext);
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedFile, setSelectedFile] = useState(null); // For storing selected file

    const formik = useFormik({
        initialValues: {
            type: "",
            propertyType: "",
            mapLocation: "",
            description: "",
            state: "",
            city: "",
            locality: "",
            address: "",
            area: "",
            unitMeasurement: "",
            ownerShip: "",
            price: "",
        },

        validate: (values) => {
            let errors = {};

            if (!values.type) errors.type = "Type is required";
            if (!values.propertyType) errors.propertyType = "Property type is required";
            if (!values.state) errors.state = "State is required";
            if (!values.city) errors.city = "City is required";
            if (!values.ownerShip) errors.ownerShip = "Ownership is required";
            if (!values.mapLocation) errors.mapLocation = "Map location is required";
            if (!values.description) errors.description = "Description is required";
            if (!values.area) errors.area = "Area is required";
            if (!values.unitMeasurement) errors.unitMeasurement = "Unit measurement is required";
            if (!values.price) errors.price = "Price is required";

            return errors;
        },

        onSubmit: (values) => {
            const formData = new FormData(); // Use FormData to handle file and other inputs
            for (const key in values) {
                formData.append(key, values[key]); // Append all form values
            }

            if (selectedFile) {
                formData.append("file", selectedFile); // Append the file if selected
            }

            handlePropertyCreation(formData); // Send FormData to the handler
        },
    });

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]); // Capture the selected file
    };

    const handleStateChange = (event) => {
        const selected = event.target.value;
        setSelectedState(selected);
        setSelectedDistrict("");
        formik.setFieldValue("state", selected);
        formik.setFieldValue("city", "");
    };

    const handleDistrictChange = (event) => {
        const selected = event.target.value;
        setSelectedDistrict(selected);
        formik.setFieldValue("city", selected);
    };

    const selectedStateObject = statesAndDistricts.find(stateObj => stateObj.state === selectedState);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Property Listing</h2>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Type</label>
                    <select
                        name="type"
                        className="form-select"
                        value={formik.values.type}
                        onChange={formik.handleChange}
                    >
                        <option value="">Select Type</option>
                        <option value="sale">For Sale</option>
                        <option value="rent">For Rent</option>
                        <option value="lease">For Lease</option>
                    </select>
                    {formik.errors.type ? <div className="text-danger">{formik.errors.type}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Property Type</label>
                    <select
                        name="propertyType"
                        className="form-select"
                        value={formik.values.propertyType}
                        onChange={formik.handleChange}
                    >
                        <option value="">Select Property Type</option>
                        <option value="Farm Land">Farm Land</option>
                        <option value="Dairy Farm">Dairy Farm</option>
                        <option value="Poultry Farm">Poultry Farm</option>
                        <option value="Agri Industrial">Agri Industrial</option>
                        <option value="Other">Other</option>
                    </select>
                    {formik.errors.propertyType ? <div className="text-danger">{formik.errors.propertyType}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>State</label>
                    <select
                        name="state"
                        className="form-select"
                        value={selectedState}
                        onChange={handleStateChange}
                    >
                        <option value="">Select State</option>
                        {statesAndDistricts.map(stateObj => (
                            <option key={stateObj.state} value={stateObj.state}>{stateObj.state}</option>
                        ))}
                    </select>
                    {formik.errors.state ? <div className="text-danger">{formik.errors.state}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>City (District)</label>
                    <select
                        name="city"
                        className="form-select"
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        disabled={!selectedState}
                    >
                        <option value="">Select City</option>
                        {selectedStateObject && selectedStateObject.districts.map(district => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                    {formik.errors.city ? <div className="text-danger">{formik.errors.city}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Ownership</label>
                    <select
                        name="ownerShip"
                        className="form-select"
                        value={formik.values.ownerShip}
                        onChange={formik.handleChange}
                    >
                        <option value="">Select Ownership</option>
                        <option value="owned">Owned</option>
                        <option value="leased">Leased</option>
                    </select>
                    {formik.errors.ownerShip ? <div className="text-danger">{formik.errors.ownerShip}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Map Location</label>
                    <input
                        type="text"
                        name="mapLocation"
                        className="form-control"
                        value={formik.values.mapLocation}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.mapLocation ? <div className="text-danger">{formik.errors.mapLocation}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.description ? <div className="text-danger">{formik.errors.description}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Locality</label>
                    <input
                        type="text"
                        name="locality"
                        className="form-control"
                        value={formik.values.locality}
                        onChange={formik.handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Address</label>
                    <input
                        type="text"
                        name="address"
                        className="form-control"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Area</label>
                    <input
                        type="number"
                        name="area"
                        className="form-control"
                        value={formik.values.area}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.area ? <div className="text-danger">{formik.errors.area}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Unit Measurement</label>
                    <select
                        name="unitMeasurement"
                        className="form-select"
                        value={formik.values.unitMeasurement}
                        onChange={formik.handleChange}
                    >
                        <option value="">Select Unit Measurement</option>
                        <option value="sqft">Square Feet</option>
                        <option value="acres">Acres</option>
                        <option value="hectares">Hectares</option>
                    </select>
                    {formik.errors.unitMeasurement ? <div className="text-danger">{formik.errors.unitMeasurement}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Price</label>
                    <input
                        type="number"
                        name="price"
                        className="form-control"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.price ? <div className="text-danger">{formik.errors.price}</div> : null}
                </div>

                <div className="mb-3">
                    <label className="form-label" style={{ color: 'black' }}>Upload Property Image</label>
                    <input
                        type="file"
                        name="file"
                        className="form-control"
                        onChange={handleFileChange} // Capture file input
                    />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
