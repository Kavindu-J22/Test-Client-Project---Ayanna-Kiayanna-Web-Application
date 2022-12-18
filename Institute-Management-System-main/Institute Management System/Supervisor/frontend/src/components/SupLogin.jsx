import "./SupLoginCSS.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import MuiAlert from "@material-ui/lab/Alert";
// import { Snackbar } from "@material-ui/core";
// import Alert from "@mui/material/Alert";
// import Stack from "@mui/material/Stack";

function LoginPage() {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //   const [addfail, setaddfail] = useState(false);
  //   function Alert(props) {
  //     return <MuiAlert variant="filled" {...props} />;
  //   }

  function sendData(e) {
    e.preventDefault();

    if (username == "GE21Sup" && password == "sup123") {
      history.push("/add");
    } else {
      alert("Login Failed!");
      //   setaddfail(true);
    }
  }
  //   const handleClose = () => {
  //     setaddfail(false);
  //   };

  return (
    <div>
      <div class="main">
        <p class="sign" align="center">
          Supervisor Login
        </p>{" "}
        <br />
        <form class="form1" onSubmit={sendData}>
          <input
            class="un "
            type="text"
            align="center"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />{" "}
          <br />
          <input
            class="pass"
            type="password"
            align="center"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <br /> <br />
          <button type="submit" class="submit" align="center">
            Sign in
          </button>
        </form>
      </div>
      {/* <Stack sx={{ width: "100px", marginTop: "-350px" }} spacing={2}>
        <Alert severity="error">Login Failed!</Alert>
      </Stack> */}
      {/* <Snackbar open={addfail} autoHideDuration={6000} onClose={handleClose}>
                
        <Alert
          sx={{ width: "100px", marginTop: "-350px" }}
          onClose={handleClose}
          severity="error"
        >
                    Login Failed!      
        </Alert>
              
      </Snackbar> */}
    </div>
  );
}
export default LoginPage;
