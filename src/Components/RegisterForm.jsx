import { useState } from 'react'
import styled from "styled-components";

function RegisterForm() {
  const [errors, setErrors] = useState({});
  const [isAuthorised, setIsAuthorised] = useState("")
  const [inputValues, setInputValues] = useState({
    userName: '',
    password: '',
    passwordCon: '',
    email: '',
    lastName: '',
    firstName: '',
  });


  const setInputValue = (fieldName, value) => {

    //Function used each time field is updated to update the stored value
    const new_values = {...inputValues}
    new_values[fieldName] = value
    setInputValues(new_values);
  };
  
  const getInputValue = (fieldName) => {

    //Used to return a field value

    return inputValues[fieldName];
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //Input validation
  
    const newErrors = {};
   
            if (!event.target[0].value) {
              newErrors.firstName = 'First name cannot be empty';
          } else {
            const firstNamePattern = /[A-Za-z]*/
            if (!firstNamePattern.test(event.target[0].value)) {
              newErrors.firstName = 'First name must be valid';
                }
            }
          if (!event.target[1].value) {
              newErrors.lastName = 'Last name cannot be empty';
          } else {
            const lastNamePattern = /^[A-Za-z]*$/
            if (!lastNamePattern.test(event.target[1].value)) {
              newErrors.lastName = 'Last name must be valid';
                }
            }
        if (!event.target[2].value) {
          newErrors.email = 'Email cannot be empty';
        } else {
          const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
          if (!emailPattern.test(event.target[2].value)) {
            newErrors.email = 'Email address must be valid';
              }
          }
          if (!event.target[3].value) {
        newErrors.userName = 'Username cannot be empty';
      } else {
        const userNamePattern = /^[a-zA-Z0-9]{1,30}$/
        if (!userNamePattern.test(event.target[3].value)) {
          newErrors.userName = 'Username must be valid';
            }
        } 
        if (!event.target[4].value) {
          newErrors.password = 'Password cannot be empty';
        } else {const passwordPattern = /^[a-zA-Z0-9 ]{1,30}$/
          if (!passwordPattern.test(event.target[4].value)) {
            newErrors.password = 'Password must be valid';
            }}
          if (!event.target[5].value) {
            newErrors.passwordCon = 'Password confrim cannot be empty';
          } else {const passwordConPattern = new RegExp(getInputValue('password'))
            if (!passwordConPattern.test(event.target[5].value)) {
              newErrors.passwordCon = 'Password must match';
              }}
        
  
    setErrors(newErrors);
    if (!Object.keys(newErrors).length > 0) {
      FetchRegister(event); //Function which saves the information if the information is acceptable
    }
  }
  

  function FetchRegister(e) {
    console.log(e)
  }

  return (
    <Window onSubmit={handleSubmit}>
      <Head>
        <img src="./IABT_logo.png" alt="logo" />
      </Head>
      <div className={isAuthorised} id="center" >
      <div className="Entry">
          <input 
            onChange={(e) => setInputValue('firstName', e.target.value)}
            type="text"
            placeholder="First name" 
            value={getInputValue('firstName')}
          />{errors.firstName && <h6>{errors.firstName}</h6>}
          </div>
          <div className="Entry">
          <input 
            onChange={(e) => setInputValue('lastName', e.target.value)}
            type="text"
            placeholder="Last name" 
            value={getInputValue('lastName')}
          />{errors.lastName && <h6>{errors.lastName}</h6>}
          </div>
          <div className="Entry">
          <input 
            onChange={(e) => setInputValue('email', e.target.value)}
            type="text"
            placeholder="Email" 
            value={getInputValue('email')}
          />{errors.email && <h6>{errors.email}</h6>}
          </div>
        <div className="Entry">
          <input 
            onChange={(e) => setInputValue('userName', e.target.value)}
            type="text"
            placeholder="Username" 
            value={getInputValue('userName')}
          />{errors.userName && <h6>{errors.userName}</h6>}
          </div>
          <div className="Entry">
          <input 
            onChange={(e) => setInputValue('password', e.target.value)}
            type="password"
            placeholder="Password" 
            value={getInputValue('password')}
          />{errors.password && <h6>{errors.password}</h6>}
          </div>
          <div className="Entry">
          <input 
            onChange={(e) => setInputValue('passwordCon', e.target.value)}
            type="password"
            placeholder="Confirm Password" 
            value={getInputValue('passwordCon')}
          />{errors.passwordCon && <h6>{errors.passwordCon}</h6>}
          </div>
      </div>
      <button type="submit">Register</button>
    </Window>      
)

}

const Window = styled.form`
display: grid;
align-items: end;
justify-items: center;
color: #313131;
font-weight: 600;

.Entry {
  padding-top: 1rem;
}

#center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

h6 {
  margin: 0rem 0rem 0rem 3rem;
  color: red;
  font-size: 10px;
}
 input {
  padding: 0rem 0rem 0rem 2rem;
  border-radius:3rem;
  border: 3px solid black;
  width: 15rem;
  height: 2.5rem;
  font-size: 1rem;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
 }
.border-red {
input {
  border: 1.5px solid red;
}}
.border-green {
input {
  border: 1.5px solid green;
}}
button {
  margin-top: 2rem;
  align-self: center;
  width: 15rem;
  height: 3rem;
  border: 2px solid #2580c7;
  border-radius: 3rem;
  background: #2580c7;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 30px;
  color: #ffffff;
  :hover :active {
    background: #313131;
    color: #eedede;
  }
}
`

const Head = styled.div`
display: flex;
img {
  height: 300px;
}
`
export default RegisterForm
