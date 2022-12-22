import React, { useState } from "react";
import Cards from "react-credit-cards";
import axios from "axios";
import Header from "../../components/Header/Header";
import PaymentDetails from "./PaymentDetails";
import "react-credit-cards/es/styles-compiled.css";

// import { creditCardType } from "card-validator";
// import valid from "card-validator";

export default function AddOnlinePayment() {
	const [student_id, setstudent_id] = useState("");
  const [classid, setclassid] = useState("");
	const [month, setmonth] = useState("");  
	const[amount,setamount] = useState("");

	const [cvc, setcvc] = useState("");
  const [expiry, setexpiry] = useState("");
  const [name, setname] = useState("");
  const [number, setnumber] = useState("");
	const [focus, setfocus] = useState("");

	

	  function sendData(e){
       // e.preventDefault();
  
       
        const NewOnlinePayment = {
            student_id,
            classid,
            month,
            amount,
            cvc,
            expiry,
            name,
            number,
                      
        }

        
        axios.post("http://localhost:5000/online/addonline", NewOnlinePayment).then(()=>{
            alert("Payment Added")

            console.log(NewOnlinePayment)
            }).catch((err)=>{
            alert(err)
        })

    }
	
	  let errors={};
	  errors.cname = false;
  	errors.cnumber = false; 
  	errors.cexp = false;
  	errors.ccvv = false;
	
	
    //const [errors, setErrors] = useState({})

    // const handleFocus = (e) => {
    //     setData({ 
    //         ...data,
    //         focus: (e.target.name === 'cardSecurityCode') ? 'cvc' : e.target.name
    //     });
    // }

	// const handleInputChange = (e) => {
	// 	setname({
	// 		...name,
	// 		[e.target.name]: e.target.value
	// 	});
	// };

    //  const handleSubmit = e => {
    //     e.preventDefault()
    //     setErrors(validateInfo(values))
    // };
	// function validateInfo(values){
	// 	let creditCard = valid.number(values.cardNumber);

 	// 	creditCard.expirationDate = valid.expirationDate(values.cardExpiration);
  	// 	creditCard.cvv = valid.cvv(values.cardSecurityCode);
  	// 	creditCard.cardholderName = valid.cardholderName(values.cardName);

	// 	let errors={};
	// 	errors.cname = false;
  	// 	errors.cnumber = false; 
  	// 	errors.cexp = false;
  	// 	errors.ccvv = false;

	// 	 if (values.cardSecurityCode === null || !values.cardSecurityCode.trim()) {
    // 		errors.message = "Credit card CVC is not complete";
  	// 	} else if (creditCard.cvv.isValid) {
    // 		errors.ccvv = true;
  	// 	} else {
    // 		errors.message = "Credit card CVC is invalid";
  	// 	}


  	// 	return errors;
	// }
	// function validateCVC(CVC){

	// }

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
              <div className="card022 card-6022">
                <div>
                  <form onSubmit={sendData}>
                    <div className="form-row">
                      <div className="name">Student ID</div>
                      <div className="value">
                        <input
                          className="input--style-6"
                          type="text"
                          required="required"
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
              <div className="card022 card-6022">
                <div>
			<Cards
				cvc={cvc}
				expiry={expiry}
				focused={focus}
				name={name}
				number={number}
			/>
			<form onSubmit={sendData}>
				<div className="form-row">
                      <div className="name">Card Number</div>
                      <div className="value">
				<input
					type="tel"
					name="number"
					placeholder="Card Number"
					value={number}
					//onChange={handleInputChange}
					// onFocus={handleFocus}
                	// isValid={errors.ccvv}
					onChange={(e) => {
                            setnumber(e.target.value);
                          }}
					onFocus ={(e)=> {
						setfocus(e.target.name);
					}}
				/>
				 </div>
                    </div>
				<div className="form-row">
                      <div className="name">Expire Date</div>
                      <div className="value">
				<input
					type="date"
					name="expiry"
					placeholder="MM/YY Expiry"
					value={expiry}
					// onChange={handleInputChange}
					// onFocus={handleFocus}
                //	isValid={errors.cexp}
					onChange={(e) => {
                            setexpiry(e.target.value);
                          }}
					onFocus ={(e)=> {
						setfocus(e.target.name);
					}}
				/>
				  </div>
                    </div>
					<div className="form-row">
                      <div className="name">Your Name</div>
                      <div className="value">
				<input
					type="text"
					name="name"
					placeholder="Your Name"
					values = {name}
					// onChange={handleInputChange}
					// onFocus={handleFocus}
                	//isvalid={errors.cname}
					onChange={(e) => {
                            setname(e.target.value);
                          }}
					onFocus ={(e)=> {
						setfocus(e.target.name);
					}}
					
				/>
				  </div>
                    </div>
				<div className="form-row">
                <div className="name">CVC</div>
                <div className="value">
				<input
					type="tel"
					name="cvc"
					placeholder="CVC"
					value={cvc}
					// onChange={handleInputChange}
					// onFocus={handleFocus}
                	//isValid={errors.cnumber}
					onChange={(e) => {
                            setcvc(e.target.value);
                          }}
					onFocus ={(e)=> {
						setfocus(e.target.name);
					}}
				/>
				 </div>
                    </div>
					 <div className="card-footer">
                      <button
                        className="btn btn--radius-2 btn--blue-2"
                        type="submit"
						size={"block"}
              			data-testid="validateButton"
              			id="validateButton"             
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

