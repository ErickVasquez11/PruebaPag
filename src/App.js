import Login from './Pages/Login/Login';
import Private from './Components/PrivateRoute/PrivateRoute'
import Home from './Pages/Home/Home';
import User from './Pages/UserMainPage/UserMainPage';
import Admin from './Pages/AdminMainPage/AdminMainPage';
import UserFavorite from './Pages/UserFavorites/UserFavoritePage';
import Error from './Pages/Error404/Error';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  //funciones ya listas
  /*  
  const { token , role } = await login("gp22_admin","t7kCJjgNd9BGkpgE")
  //llamar al login 
  login("gp22_admin","t7kCJjgNd9BGkpgE")

  // llamar a create post admin only
  createPost(token, role, "asdasdasdasd","asdasdasdasda","asdasdasdasd")

  //llamar a owned admin only
  aOwned(token,role, 15, 0)

  //llamar a toggle admin only
  Toggle(token, role, "6193113ec0eacd88db877059")

  //lammar a getall
  GetAll(token, 15,0)

  //llamar a like
  Like(token, "6193113ec0eacd88db877059")


  //llamar a comentario
  Commet (token,"6193113ec0eacd88db877059","increiasdasdble post wow")

  //llamar a update
  Update(token ,role,"6193113ec0eacd88db877059","la mejor descrion de los post","asdasasdasda","asdasdasda")

  GetFavorite(token)
  AddFavorite(token)
  */
  
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/*" element={<Error />} />

        <Route path="/admin" element={<Private role="admin"> <Admin/></Private>}/>
        <Route path="/user" element={<Private role="user"> <User/></Private>}/>
        <Route path="/userfavorite" element={<Private role="user"> <UserFavorite/></Private>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
