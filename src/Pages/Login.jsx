import styled from "styled-components";
import LoginForm from "../Components/login";

function Login() {

  //Page

  return (
    <LoginDiv>
      <Page className="transition">
        <LoginForm/>
      </Page>
    </LoginDiv>
  )  
}

//Styling

const LoginDiv = styled.div`
    .transition { //Entrance animation
        animation: fade 0.3s linear;
        @keyframes fade {
            0% {
            opacity:80%
            }
            100% {
            opacity: 100%;
            }
        }
    }
`

 const Page = styled.div`
  display: grid;
  background: #ffffff;
p {
  font-family: sans-serif;
  font-size: 20pt;
}

`

export default Login