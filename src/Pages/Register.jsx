import styled from "styled-components";
import RegisterForm from "../Components/RegisterForm";

function Register() {

  //Page

  return (
    <RegisterDiv>
      <Page className="transition">
        <RegisterForm/>
      </Page>
    </RegisterDiv>
  )  
}

//Styling

const RegisterDiv = styled.div`
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

export default Register