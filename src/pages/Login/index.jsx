import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setUser } from '../../actions'
import logoFull from '../../assets/static/logo.svg'
import './Login.scss'
import Title from '../../components/Title'
import Button from '../../components/Button'



import Cookies from "universal-cookie"
import axios from 'axios';
import md5 from 'md5';
//const baseUrl = "http://localhost:3001/api/login"
const baseUrl = "http://localhost:3001/api/users"
//const baseUrl = "http://localhost:4000/api/users"
const superagent = require('superagent');


const cookies = new Cookies()




const Login = props => {
  const [user, setUser] = useState({})


  
  // se llama cuando se realiza un cambio en el campo de texto que contiene el nombre de usuario

  const handlerInput = event => {
    
    console.log("evento ..");
    console.log(event.target.value);

    setUser({
      ...user,
      [event.target.name]: event.target.value,
    })
  }

  const hanlderSubmit = event => {
    console.log("entramos al metodo hanlderSubmit 👩‍🚒👩‍🚒👩‍🚒")
    event.preventDefault()
    props.setUser(user, '/')
  }

  const iniciarSesion=async () => {
    console.log("Se llammo a la funcion inicarSesion")
    await axios.get(baseUrl, {params:{username:this.state.form.username, password:md5(this.state.form.password)}})

    .then(response =>{
        console.log("Recibimos respuesta del servidor 👨‍🚒👨‍🚒👩‍🚒👨‍🚒 !!")
        console.log("response.data")
        console.log(response.data);
        console.log("Estamos aqui 🕵️‍♀️🕵️‍♀️🕵️‍♀️")    
        return response.data;                    
    })
    .then ( response => {
        // El inicio de sesion es correcto
        console.log("Se recibio una respuesta")
                
        if (response.length >0){
            var respuesta = response[0] 
            cookies.set('id', respuesta.id, {path:"/"} )
            cookies.set('apellido_paterno', respuesta.apellido_paterno, {path:"/"} )
            cookies.set('apellido_matero', respuesta.apellido_materno,  {path:"/"} )
            cookies.set('nombre', respuesta.nombre,  {path:"/"} )
            cookies.set('username', respuesta.nombre,  {path:"/"} )
            //mensaje de bienvenida
            alert(`Bienvenido ${respuesta.nombre} ${respuesta.apellido_paterno}`)
            // redirigimos al usuario al menu
            window.location.href="./menu"
        }
        else{
         alert("No se pudo iniciar: usuario o contraseña incorrectos")
        }   
    }

    )
    .catch(error=>{
        console.log("Hay un error en la solicitud y respuesta: 🦸‍♂️🦸‍♀️")
        console.log(error);
    })
}   // FIN DE INICIAR SESION 

  
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__container__left">
          <img
            src={logoFull}
            alt=""
            onClick={() => {
              window.location.href = 'https://marathongroup.mx'
            }}
          />
        </div>
        <div className="login__container__right">
          <form onSubmit={hanlderSubmit}>

          
            <Title className="-small">Bienvenido</Title>
            <label htmlFor="user">
              <span>Usuario</span>
              <input type="text" name="user" onChange={handlerInput} />
            </label>
            <label htmlFor="password">
              <span>Password</span>
              <input type="password" name="password" onChange={handlerInput} />
            </label>
            <Button type="submit">
              Iniciar Sesión
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  setUser,
}

export default connect(null, mapDispatchToProps)(Login)
