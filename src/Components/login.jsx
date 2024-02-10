import styled from "styled-components";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Loading2 as Loading } from "./Loading";
import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';

function LoginForm() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const [isAuthorised, setIsAuthorised] = useState("")
    const { register, handleSubmit, formState: { errors } } = useForm();
    const FetchLogin = async (information) => {
      
      //Function is executed on a login attempt

      setIsLoading(true)


      const res = await fetch('https://IABT.azurewebsites.net/login', {
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

          const res = await fetch(`https://cpa-flask.azurewebsites.net/auth/add`,{
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
      setIsLoading(false)
    }

    
  
    return (
        <Window onSubmit={handleSubmit(FetchLogin)}>
          <Head>
            <img src="./IABT_logo.png" alt="logo" />
          </Head>
          <div className={isAuthorised} id="center" >
              <input 
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                placeholder="Username" 
                value={userName}
                {...register("userName", { required: true, pattern: /^[a-zA-Z0-9]{1,30}$/ })}
              />{errors.userName && <h6>Username is required</h6>}
              <input 
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password" 
                value={password}
                {...register("password", { required: true,pattern: /^[a-zA-Z0-9 ]{1,30}$/  })}
              />{errors.password && <h6>Password is required</h6>}
          </div>
          <button type="submit">Login</button>
          <br></br>
          <div>{isLoading ? <Loading className="Show"/> : <Loading className="Hide"/> }</div>
          <FooterText to={"/Register"}>Register</FooterText>
        </Window>      
    )  
  }
  
  //Styling

  const Window = styled.form`
    justify-self: center;
    display: grid;
    justify-content: center;
    align-items: end;
    justify-items: center;
    color: #313131;
    font-weight: 600;
    transition: 1s;
    opacity: 0.92;
    margin-bottom: 2rem;
    padding: 1rem 0rem 2rem 0rem;

    #center {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    h6 {
      color: red;
    }
     input {
      ::placeholder {
        text-align: center;
      }
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
      width: 5rem;
      justify-self: center;
      :hover {
        background: #313131;
        color: #eedede;
      }
    }
  .Show {
      visibility: visible;
    }
  .Hide {
    visibility: hidden;
  }`
  
  const FooterText = styled(Link)`
    text-decoration: none;
    color: #313131;
    font-weight: 700;
  `
  const Head = styled.div`
    display: flex;
    img {
      width:100%;
      height: 100%;
    }
  `
  export default LoginForm