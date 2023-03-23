import React, { useEffect, useState } from 'react'
import { useNavigate, useNavigation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {DLT, ADD, REMOVE} from '../Redux/Action/Action'
const CardsDetails = () => {

  const[cart, setCart] = useState([])
  console.log(cart);

  const{id} = useParams();
  // console.log(id)

  const history = useNavigate();

  const dispatch = useDispatch()

  const getdata = useSelector((state)=> state.cartreducer.carts);
  // console.log(getdata); 

  const compare = ()=>{
    let comparedata = getdata.filter((e)=>{
      return e.id == id
    })
    setCart(comparedata); 
  }

//add data
const send = (e) => {
    dispatch(ADD(e));
}

  const dlt =(id) => {
    dispatch(DLT(id))
    history('/');
  }

  const remove = (item)=>{
      dispatch((REMOVE(item)))
  }

  useEffect(() => {
    compare();
  }, [id])
  

  return (
    <>
      <div className='container mt-2'>
        <h2 className='text-center'>Items Details Page</h2> 
        <section className='container mt-3'>
          <div className='iteamsdetails'>
            {
              cart.map((e)=> {
                const{imgdata, id, price, rname, rating, somedata, address, qnty} = e;
                return(
                  <>
                    <div className='items_img'>
                    <img src={imgdata} alt='food'/>
                    </div>
                   <div className='details'>
               <table>
                <tr className='d-flex my-3'>
                  <td>
                      <p> <strong>Restaurant</strong> : {rname}</p>
                      <p> <strong>Price </strong> : ₹ {price}</p>
                      <p> <strong>Dishes</strong> : {address} </p>
                      <p> <strong>Total</strong> : ₹ {price * qnty }</p>
                    <div className='my-2 d-flex justify-content-around align-items-center' 
                    style={{width:100,cursor:'pointer',background:"#ddd", color:'#111'}}>
                      <span style={{fontSize:24}} onClick={qnty<=1? ()=>dlt(id):()=>remove(e)}>-</span>
                      <span style={{fontSize:22}}>{qnty}</span>
                      <span style={{fontSize:24}} onClick={()=>send(e)}>+</span>
                    </div>
                  </td>
                  <td>
                    <p> <strong>Rating :</strong> <span style={{background:"green", color:"#fff", padding:"2px 5px", borderRadius:"5px"}}>{rating}★</span></p>
                    <p> <strong>Order Review :</strong> <span>{somedata}</span></p>
                    <p> <strong>Remove :</strong> <span><i className='fas fa-trash'
                    onClick={()=>dlt(id)}
                    style={{color:"red", fontSize:20,cursor:"pointer"}}></i></span></p>
                  </td>
                </tr>
              </table>
            </div>
          </>
            )
           })
            }
          </div>
        </section>
      </div>
    </>
  )
}

export default CardsDetails;    