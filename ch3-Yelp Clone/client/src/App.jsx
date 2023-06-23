
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from './routes/Home';
import RestaurantdetailPage from './routes/RestaurantdetailPage';
import UpdatePage from './routes/UpdatePage';
import { RestaurantContextProvider } from './context/RestaurantContext';

function App() {


  return (
    <RestaurantContextProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<Home/>}/>
          <Route path="restaurants/:id" element={<RestaurantdetailPage/>} />
          <Route path="restaurants/:id/update" element={<UpdatePage/>} />
        </Route>
      </Routes>
    </BrowserRouter> 

    </RestaurantContextProvider>
    
  );
}

export default App;
