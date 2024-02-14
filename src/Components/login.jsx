import styled from "styled-components";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';

function LoginForm() {
    const navigate = useNavigate()
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const [isAuthorised, setIsAuthorised] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm();
    const FetchLogin = async (information) => {
      
      //Function is executed on a login attempt

      const res = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: `'${information.userName}'`
        }),
      });

      const data = await res.json() //Returns hashed password

      const match = await bcrypt.compare(information.password,data.password)
      //Returned data contains coorect hashed pssword, employee account haas been registered, role of account
    
      if (match) {

          //If the authentication was successful

          const res = await fetch(`https://iabt.azurewebsites.net/login`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({username : information.userName})
        }) //Adding Auth Key to database
        const auth_data = await res.json()

        if (auth_data.success === 'Failed') {
          
          //If the authentication was unsuccesful (unexpected event)

          setIsAuthorised('border-red')
          sessionStorage.clear()
          alert(`There was an error authenticating your credentials.\n${auth_data.error}`)
        } else {

          //If the authentication was successful
          Cookies.remove('auth_key')
          Cookies.set('auth_key',auth_data.key)
          navigate('/Home')   
        } 
        } else { 

        //If there is no match for the specified username and password

        setIsAuthorised('border-red')
      }
    }

    
  
    return (
        <Window onSubmit={handleSubmit(FetchLogin)}>
          <Head>
            <img src="./IABT_logo.png" alt="logo" />
          </Head>
          <div className={isAuthorised} id="center" >
            <div className="Entry">
              <input 
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                placeholder="Username" 
                value={userName}
                {...register("userName", { required: true, pattern: /^[a-zA-Z0-9]{1,30}$/ })}
              />{errors.userName && <h6>Username is required</h6>}
              </div>
              <div className="Entry">
              <input 
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password" 
                value={password}
                {...register("password", { required: true,pattern: /^[a-zA-Z0-9 ]{1,30}$/  })}
              />{errors.password && <h6>Password is required</h6>}
              </div>
          </div>
          <button type="submit">Sign in</button>
          <FooterText to={"/Register"}>Not Registered? Create an Account</FooterText>
        </Window>      
    )  
  }
  
  //Styling

  const Window = styled.form`
    display: grid;

    align-items: end;
    justify-items: center;
    color: #313131;
    font-weight: 600;

    #center {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;

      .Entry {

      }
    }

    h6 {
      margin: 0rem 0rem 0rem 3rem;
      color: red;
      font-size: 15px;
    }
     input {
      padding: 0rem 0rem 0rem 2rem;
      border-radius:3rem;
      border: 3px solid black;
      width: 15rem;
      height: 3rem;
      font-size: 1.5rem;
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
  
  const FooterText = styled(Link)`
  justify-self: center;
  align-self: flex-start;
    text-decoration: none;
    color: #313131;
    font-weight: 500;
    font-size: 15px;
  `
  const Head = styled.div`
    display: flex;
    img {
      height: 300px;
    }
  `
  export default LoginForm