import styled from "styled-components";
import Home from "../Components/Home";

function Register() {

  //Page

  return (
    <HomeDiv>
      <Page className="transition">
        <Home/>
      </Page>
    </HomeDiv>
  )  
}

//Styling

const HomeDiv = styled.div`
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