import axios from 'axios'
import Swal from 'sweetalert2'



import Cookies from "universal-cookie"
import md5 from 'md5';
//const baseUrl = "http://localhost:3001/api/login"
const baseUrl = "http://localhost:3001/api/user"
//const baseUrl = "http://localhost:4000/api/users"



// ejemplo tomado de https://www.youtube.com/watch?v=JKenEw4S5BQ


const cookies = new Cookies()




const API_KEY_TOKEN =
  '52b2165c5a8252eef0a3781c5a31bc9fc9a4bca0f5085a8650ea3306057f31d9'

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      Swal.fire({
        title: 'Sesión Expirada',
        text: 'Su sesión ha expirado',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      }).then(result => {
        if (result.isConfirmed) {
          logOut()
          window.location.href = '/login'
        }
      })
    } else {
      return Promise.reject(error)
    }
  }
)

export const setTitle = payload => ({
  type: 'SET_TITLE',
  payload,
})

export const setWraper = payload => ({
  type: 'SET_WRAPER',
  payload,
})

export const setLoading = payload => ({
  type: 'SET_LOADING',
  payload,
})

export const setSocket = payload => ({
  type: 'SET_SOCKET',
  payload,
})


/*
 const setUser2=(payload, redirectionUrl) => async dispatch () => {
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

*/


export const setUser = (payload, redirectionUrl) => async dispatch => {
  const { user, password } = payload
  
  console.log ("Entramos al metodo setUser 🎈🎈🎈!!!!!!!!!");
  console.log (user, password);
  console.log (`url: ${baseUrl}`)

  try {

    localStorage.setItem('password', password)

   // await axios.get(baseUrl, {params:{username:this.state.form.username, password:md5(this.state.form.password)}})


   /* const res = await axios({
      method: 'get',
      url: baseUrl,
      auth: {
        username: user,
        password,
      },
      data: {
        apiKeyToken: API_KEY_TOKEN,
      },
      params:{username:this.state.form.username, password:md5(this.state.form.password)},
    })*/

    const res = await axios.post (baseUrl, {params:{username:user, password:md5(password)}})

        console.log ("Legue hasta aqui 👲👲👲")
        console.log ("Datos recibidos")
        console.log (res.data)


        console.log ("token ")
        console.log (res.data[0].token)
        console.log ("user ")
        console.log (res.data[0].username)

        console.log ("name")
        console.log (res.data[0].nombre)

        console.log ("id")
        console.log (res.data[0].id)

        console.log ("role")
        console.log (res.data[0].role)
        console.log ("BranchCD")
        console.log (res.data[0].branch_id)
        console.log ("department")
        console.log (res.data[0].department)
     
        



        localStorage.setItem ('token', res.data[0].token)
        localStorage.setItem ('user', res.data[0].username)
        localStorage.setItem ('name', res.data[0].nombre)
        localStorage.setItem ('id', res.data[0].id)
        localStorage.setItem ('role', res.data[0].role)
        localStorage.setItem ('BranchCD', res.data[0].branch_id)
        localStorage.setItem ('department', res.data[0].department)

        window.location.href = redirectionUrl

        dispatch({
          type: 'LOGIN_REQUEST',
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario o contraseña incorrectos',
        })
      }
}


/*
// respaldo serUser

export const setUser = (payload, redirectionUrl) => async dispatch => {
  const { user, password } = payload
  console.log(user, password);
  console.log(`url: ${process.env.REACT_APP_API}auth/sing-in`)
  try {

    localStorage.setItem('password', password)
    const res = await axios({
      method: 'post',
      url: `${process.env.REACT_APP_API}auth/sing-in`,
      auth: {
        username: user,
        password,
      },
      data: {
        apiKeyToken: API_KEY_TOKEN,
      },
    })

    console.log("Legue hasta aqui 👲👲👲")

    localStorage.setItem('token', res.data.token)
    localStorage.setItem('user', res.data.user.user)
    localStorage.setItem('name', res.data.user.name)
    localStorage.setItem('id', res.data.user.id)
    localStorage.setItem('role', res.data.user.role)
    localStorage.setItem('BranchCD', res.data.user.BranchCD)
    localStorage.setItem('department', res.data.user.department)

    window.location.href = redirectionUrl

    dispatch({
      type: 'LOGIN_REQUEST',
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Usuario o contraseña incorrectos',
    })
  }
}

*/






export const logOut = () => ({
  type: 'LOG_OUT',
})

//CRUD

const storedJwt = localStorage.getItem('token')

export const getAll = (endPoint, typeAction) => async dispatch => {
  try {
    const res = await axios({
      url: `${process.env.REACT_APP_API}${endPoint}`,
      headers: { Authorization: `Bearer ${storedJwt}` },
      method: 'get',
    })
    console.log(res.data)
    dispatch({
      type: typeAction,
      payload: res.data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const get = (endPoint, typeAction) => async dispatch => {
  try {
    const res = await axios({
      url: `${process.env.REACT_APP_API}${endPoint}`,
      headers: { Authorization: `Bearer ${storedJwt}` },
      method: 'get',
    })
    dispatch({
      type: typeAction,
      payload: res.data.data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const create = (endPoint, typeAction, data) => async dispatch => {
  try {
    await axios({
      url: `${process.env.REACT_APP_API}${endPoint}`,
      headers: { Authorization: `Bearer ${storedJwt}` },
      method: 'post',
      data: data,
    })
    dispatch({
      type: typeAction,
    })
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
    })
    Toast.fire({
      icon: 'success',
      title: 'Se guardo correctamente',
    })
  } catch (error) {
    console.log(error)
    Swal.fire({
      title: 'Error!',
      text: 'Ah ocurrido un error',
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
    })
  }
}

export const update = (endpoint, typeAction, data) => async dispatch => {
  try {
    const res = await axios({
      url: `${process.env.REACT_APP_API}${endpoint}`,
      headers: { Authorization: `Bearer ${storedJwt}` },
      method: 'put',
      data: data,
    })
    dispatch({
      type: typeAction,
      payload: { ...data, id: res.data.data ? parseInt(res.data.data) : 0 },
    })
  } catch (error) {
    console.log(error)
  }
}

export const deleted = (endpoint, typeAction) => async dispatch => {
  try {
    const res = await axios({
      url: `${process.env.REACT_APP_API}${endpoint}`,
      headers: { Authorization: `Bearer ${storedJwt}` },
      method: 'delete',
    })
    dispatch({
      type: typeAction,
      payload: res.data.data,
    })
  } catch (error) {
    console.log(error)
  }
}

export const createFile =
  (endPoint, typeAction, data, fileName) => async dispatch => {
    const formData = new FormData()
    Object.keys(data).map(key => {
      if (key === fileName) {
        return formData.append(key, data[key][0])
      } else {
        return formData.append(key, data[key])
      }
    })
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API}${endPoint}`,
        headers: {
          Authorization: `Bearer ${storedJwt}`,
          'Content-Type': 'multipart/form-data',
        },
        method: 'post',
        data: formData,
      })
      dispatch({
        type: typeAction,
        payload: res.data.data,
      })
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
      })
      Toast.fire({
        icon: 'success',
        title: 'Se guardo correctamente',
      })
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: 'Error!',
        text: 'Ah ocurrido un error',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      })
    }
  }

export const updateFile =
  (endPoint, typeAction, data, fileName) => async dispatch => {
    const formData = new FormData()
    // eslint-disable-next-line
    Object.keys(data).map(key => {
      if (key === fileName) {
        if (data[key].length > 0) {
          return formData.append(key, data[key][0])
        }
      } else {
        return formData.append(key, data[key])
      }
    })
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_API}${endPoint}`,
        headers: {
          Authorization: `Bearer ${storedJwt}`,
          'Content-Type': 'multipart/form-data',
        },
        method: 'put',
        data: formData,
      })
      dispatch({ type: typeAction, payload: res.data.data })
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
      })
      Toast.fire({
        icon: 'success',
        title: 'Se guardo correctamente',
      })
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: 'Error!',
        text: 'Ah ocurrido un error',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      })
    }
  }
