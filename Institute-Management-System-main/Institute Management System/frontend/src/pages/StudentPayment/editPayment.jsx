import React, {useState,useEffect} from "react"
import "./AddPayment2.css";
import axios from "axios";
import PaymentDetails from "./PaymentDetails";
import Header from "../../components/Header/Header";


export default function EditPayment(props){

    const id = props.match.params.student_id;
    console.log(id);

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

  // get data

  useEffect(() => {

    getResults();

  }, []);



  function getResults() {

    let mounted = true;

    fetch(`http://localhost:5000/rejectpayment/get/${id}`)

      .then((res) => res.json())

      .then((result) => {

        if (mounted) {

          setstudent_id(result[0].student_id);

          setclassid(result[0].classid);

          setmonth(result[0].month);

          setamount(result[0].amount);

          setbankname(result[0].bankname);

          setbranch(result[0].branch);

          setemail(result[0].email);

          setcontactnumber(result[0].contactnumber);

          setdate(result[0].date);

            setpaymentslip(result[0].paymentslip);



          // console.log(result);

        }

      });

    return () => (mounted = false);

  }
    


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

        axios.put(`http://localhost:5000/rejectpayment/update/${student_id}`, NewPayment).then(()=>{
            alert("Payment Updated")

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
        

        <PaymentDetails/>
        <div style={{ marginTop: "50px" }}>
            <div className="wrapper wrapper--w900">
        
            <div className="card-heading">
              <h2 className="title">Class Information</h2>
            </div>
            <div className="wrapper wrapper--w900">
              <div className="card card-6">
                <div>
                  <form onSubmit={sendData}>
                    <div className="form-row">
                      <div className="name">Student ID</div>
                      <div className="value">
                        <input
                          className="input--style-6"
                          type="text"
                          required="required"
                          value={student_id}
                          onChange={(e) => {
                            setstudent_id(e.target.value);
                          }}
                          
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="name">Class ID</div>
                      <div className="value">
                        <input
                          className="input--style-6"
                          type="text"
                          required="required"
                          value={classid}
                          onChange={(e) => {
                            setclassid(e.target.value);
                          }}
                          
                        />
                      </div>
                    </div>
                  
                    
                    <div className="form-row">
                      <div className="name">Month</div>
                      <div className="value">
                        <input
                          className="input--style-6"
                          type="text"
                          required="required"
                          value={month}
                          onChange={(e) => {
                            setmonth(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                   
                    
                      <div className="form-row">
                      <div className="name">Amount</div>
                      <div className="value">
                        <input
                          className="input--style-6"
                          type="text"
                          required="required"
                          value={amount}
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
            <div className="wrapper wrapper--w900">
            <div className="card-heading">
                <h2 className="title">Payment Information</h2>
              </div>
              <div className="card card-6">
                <div>
                  
                  <form onSubmit={sendData}>
                    <div className="form-row">
                      <div className="name">Bank Name</div>
                      <div className="value">
               
                        <input
                          className="input--style-6"
                          type="text"
                          required="required"
                          value={bankname}
                          onChange={(e) => {
                            setbankname(e.target.value);
                          }}
                        />
                        
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="name">Branch</div>
                      <div className="value">
                        <input
                          className="input--style-6"
                          type="text"
                          required="required"
                          value={branch}
                          onChange={(e) => {
                            setbranch(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="name">Email</div>
                      <div className="value">
                        <input
                          className="input--style-6"
                          type="text"
                          required="required"
                          value={email}
                          onChange={(e) => {
                            setemail(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="name">Contact Number</div>
                      <div className="value">
                        <input
                          className="input--style-6"
                          type="text"
                          required="required"
                          value={contactnumber}
                          onChange={(e) => {
                            setcontactnumber(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="name">Date</div>
                      <div className="value">
                        <input
                          className="input--style-6"
                          type="date"
                          required="required"
                          value={date}
                          onChange={(e) => {
                            setdate(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  
                   
                    <div className="form-row">
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
                          <label className="label--file" htmlFor="file">
                            Choose file
                          </label>
                          <span className="input-file__info">
                            No file chosen
                          </span>
                        </div>
                        <div className="label--desc">
                          Upload the payment slip in .pdf format. Max file
                          size: 2 MB
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
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