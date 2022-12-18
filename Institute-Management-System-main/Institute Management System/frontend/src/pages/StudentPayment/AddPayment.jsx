import React, {useState} from "react"
import "./AddPayment2.css";
import axios from "axios";
import PaymentDetails from "./PaymentDetails";
import Header from "../../components/Header/Header";
import BG2 from "../../assets/images/paymentbackground.png"

export default function AddPayment(){

    const [student_id, setstudent_id] = useState("");
    const [classid, setclassid] = useState("");
    const [month, setmonth] = useState("");    
    const[amount,setamount] = useState("");
 
    const [bankname,setbankname] = useState("");
    const [branch,setbranch] = useState("");
    const [email,setemail] = useState("");
    const [contactnumber,setcontactnumber] = useState("");
    const [date,setdate] = useState("");
    
    const [paymentslip, setpaymentslip] = useState(

    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"

  );
  
    
    function sendData(e){
       // e.preventDefault();
  
       
        const NewPayment = {
            student_id,
            classid,
            month,
            amount,
            bankname,
            branch,
            email,
            contactnumber,
            date, 
            paymentslip            
        }

        
        axios.post("http://localhost:5000/payment/add", NewPayment).then(()=>{
            alert("Payment Added")

            console.log(NewPayment)
            }).catch((err)=>{
            alert(err)
        })

    }
    const postDetails = (pics) => {

    if (!pics) {

      return setpaymentslip("Please Select an Image");

    }

    setpaymentslip(null);


    if (pics.type === "image/jpeg" || pics.type === "image/png") {

      const data = new FormData();

      data.append("file", pics);

      data.append("upload_preset", "GlobalEducation");

      data.append("cloud_name", "dzjtj98dg");

      fetch("https://api.cloudinary.com/v1_1/dzjtj98dg/image/upload", {

        method: "post",

        body: data,

      })

        .then((res) => res.json())

        .then((data) => {

          console.log(data);

          setpaymentslip(data.url.toString());

        })

        .catch((err) => {

          console.log(err);

        });

    } else {

      return setpaymentslip("Please select an Image");

    }

  };

    return (

      
      <div>
        <Header/>
        <img src={BG2} alt="backimage" style={{position:"absolute", marginTop:"900px", marginLeft:"900px", opacity:"0.5", height:"800px", width:"800px"}} />

        <PaymentDetails/>
        <div style={{ marginTop: "50px" }}>
            <div className="wrapper022 wrapper--w900">
        
            <div className="card-heading">
              <h2 className="title022">Class Information</h2>
            </div>
            <div className="wrapper022 wrapper--w900">
              <div className="card022 card-6022">
                <div>
                  <form onSubmit={sendData}>
                    <div className="form-row022">
                      <div className="name">Student ID</div>
                      <div className="value">
                        <input
                          className="input--style-6022"
                          type="text"
                          required="required"
                          onChange={(e) => {
                            setstudent_id(e.target.value);
                          }}
                          
                        />
                      </div>
                    </div>
                    <div className="form-row022">
                      <div className="name">Class ID</div>
                      <div className="value">
                        <input
                          className="input--style-6022"
                          type="text"
                          required="required"
                          onChange={(e) => {
                            setclassid(e.target.value);
                          }}
                          
                        />
                      </div>
                    </div>
                  
                    
                    <div className="form-row022">
                      <div className="name">Month</div>
                      <div className="value">
                        <input
                          className="input--style-6022"
                          type="text"
                          required="required"
                          onChange={(e) => {
                            setmonth(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                   
                    
                      <div className="form-row022">
                      <div className="name">Amount</div>
                      <div className="value">
                        <input
                          className="input--style-6022"
                          type="text"
                          required="required"
                          onChange={(e) => {
                            setamount(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    
                  </form>
                  </div>
                </div>
              </div>
            </div>
            </div>
        <div>

          <div style={{ marginTop: "50px" }}>
            <div className="wrapper022 wrapper--w900">
            <div className="card-heading">
                <h2 className="title022">Payment Information</h2>
              </div>
              <div className="card022 card-6022">
                <div>
                  
                  <form onSubmit={sendData}>
                    <div className="form-row022">
                      <div className="name">Bank Name</div>
                      <div className="value">
               
                        <input
                          className="input--style-6022"
                          type="text"
                          value={bankname}
                          required="required"
                          onChange={(e) => {
                            setbankname(e.target.value);
                          }}
                        />
                        
                      </div>
                    </div>

                    <div className="form-row022">
                      <div className="name">Branch</div>
                      <div className="value">
                        <input
                          className="input--style-6022"
                          type="text"
                          value={branch}
                          required="required"
                          onChange={(e) => {
                            setbranch(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-row022">
                      <div className="name">Email</div>
                      <div className="value">
                        <input
                          className="input--style-6022"
                          type="text"
                          value={email}
                          required="required"
                          onChange={(e) => {
                            setemail(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-row022">
                      <div className="name">Contact Number</div>
                      <div className="value">
                        <input
                          className="input--style-6022"
                          type="tel"
                          value={contactnumber}
                          required="required"
                                                   
                          onChange={(e) => {
                            setcontactnumber(e.target.value);
                            
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-row022">
                      <div className="name">Date</div>
                      <div className="value">
                        <input
                          className="input--style-6022"
                          type="date"
                          value={date}
                          required="required"
                          onChange={(e) => {
                            setdate(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  
                   
                    <div className="form-row022">
                      <div className="name">Payment Slip</div>
                      <div className="value">
                        <div className="input-group js-input-file">
                          <input
                            className="input-file"
                            type="file"
                            name="file_cv"
                           
                            required="required"
                            id="file"
                            onChange={(e) => {
                              postDetails(e.target.files[0]);
                            }}
                          />
                          <label className="label--file022" htmlFor="file">
                            Choose file
                          </label>
                          <span className="input-file__info022">
                            No file chosen
                          </span>
                        </div>
                        <div className="label--desc022">
                          Upload the payment slip in .pdf format. Max file
                          size: 2 MB
                        </div>
                      </div>
                    </div>
                    <div className="card-footer022">
                      <button
                        className="btn btn--radius-2 btn--blue-2"
                        type="submit"
                      >
                        Pay Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

}