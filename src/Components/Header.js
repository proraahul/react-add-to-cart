import React, {useState, useEffect} from 'react';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {DLT} from "../Redux/Action/Action";


const Header = () => {

  const[price, setPrice] = useState(0);
  console.log(price);

  const getdata = useSelector((state)=> state.cartreducer.carts);
  console.log(getdata);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dlt =(id)=>{
    dispatch(DLT(id))
  }

  const total = ()=> {
    let price = 0;
    getdata.map((curElem, index) => {
      price = curElem.price * curElem.qnty + price
    });
    setPrice(price);
  };

  useEffect(() => {
    total()
  }, [total]);

  return (
    <>
        <nav className="navbar navbar-expand-lg  bg-body-tertiary bg-dark mx-5">
        <div className="container-fluid">
        <div className="navbar-nav">
           <NavLink className="navbar-brand" to="/"> Add to cart</NavLink>
           <NavLink className="nav-link active" aria-current="page" to="/" >Home</NavLink>
        </div>

      <Badge badgeContent={getdata.length} color="primary" 
      id="basic-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
      >
      <i className="fa-solid fa-2x fa-cart-shopping"></i>
    </Badge>
    </div>
    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >

        {
          getdata.length ? 
          <div className='card_details' style={{width:"24rem", padding:10}}>
            <table>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Restaurant Name</th>
                </tr>
              </thead>
              <tbody>
                {
                  getdata.map((e)=>{
                    const{id, imgdata, price, rname, qnty} = e;
                    return(
                      <>
                       <tr>
                        <td>
                          <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                          <img src={imgdata} alt='food' style={{width:"5rem", height:"5rem"}} />
                          </NavLink>
                        </td>
                        <td>
                          <p>{rname}</p>
                          <p>Price: ₹{price}</p>
                          <p>Quantity: ₹{qnty}</p>
                          <p style={{color:"red", fontSize:20, cursor:"pointer"}}
                           onClick={()=>dlt(id)} >
                            <i className='fas fa-trash smalltrash'></i>
                          </p>
                        </td>
                        <td className='mt-5' 
                        style= {{color:"red", fontSize:20, cursor:"pointer"}}
                        onClick={()=>dlt(id)}>
                        <i className='fas fa-trash largetrash'></i>
                        </td>
                       </tr>
                      </>
                    )
                  })
                }
                <p className='text-center'>Total : ₹{price}</p>
              </tbody>
            </table>
          </div>
          :
         <div className='card_details d-flex justify-content-center align-items-center px-5'>
          <i className='fas fa-close smallclose' 
          onClick={handleClose}
           style={{position:'absolute', top:2, right:20, fontSize:23,cursor:'pointer'}}></i>
          <p>Your cart is Empty</p>
          <img src='../cart.gif' alt='' style={{width:'3rem'}}/>
        </div>
}
      </Menu>
</nav>
    </>
  )
}

export default Header;
