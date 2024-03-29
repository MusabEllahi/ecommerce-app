'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { Card } from 'flowbite-react'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBBtn,
  MDBRipple,
} from 'mdb-react-ui-kit'
import { ClipLoader } from 'react-spinners'

const About = () => {
  const Swal = require('sweetalert2')
  const [product, setProduct] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [authUser, setAuthUser] = useState([])
  const [bucket, setBucket] = useState([])
  const [order,setOrder] = useState([])

  const addToCart = (productData) => {
    let cloneBucket = [...bucket]
    if(authUser == null){

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "LogIn First"
      });
      return
    }
    let isAlreadyAdded = false;
    for (let i=0;i<cloneBucket.length;i++){
      if(productData.ProductName == cloneBucket[i].ProductName){
        isAlreadyAdded =true;
        break;
      }

    };
    if (isAlreadyAdded) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "warning",
        title: productData.ProductName +" is Already Added",
        iconColor:"red"
      });
      return
    }
    cloneBucket.push({...productData,quantity:1})
    setBucket(cloneBucket)
    localStorage.setItem("YourOrder",JSON.stringify(cloneBucket))
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer
        toast.onmouseleave = Swal.resumeTimer
      },
    })
    Toast.fire({
      icon: 'success',
      title: 'Item Added in your Cart',
    })

  }
  useEffect(() => {
    if (localStorage.getItem('YourOrder') != null) {
      let fetchOrder = localStorage.getItem('YourOrder')
      let jsonData = JSON.parse(fetchOrder)
      setBucket(jsonData)
      }

  
}, [])
useEffect(() => {
  if (localStorage.getItem('AuthUser') != null) {
    let fetchUser = localStorage.getItem('AuthUser')
    let jsonData = JSON.parse(fetchUser)
    setAuthUser(jsonData)
  }}, [])

useEffect(() => {
  if (localStorage.getItem('ProductsList') != null) {
    let fetchProduct = localStorage.getItem('ProductsList')
    let jsonData = JSON.parse(fetchProduct)
    setProduct(jsonData)

    setIsLoading(false)
  }
}, [])
  

  if (isLoading) {
    return (
      <div className="bg-white h-screen w-screen flex justify-center items-center top-0 absolute z-[100]">
        <svg
          className="animate-spin  h-5 w-5 text-blue-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    )
  }

  return (

    <div>
    
    <MDBContainer fluid className=" my-5 text-center">
        <h4 className="mt-4 mb-5">
        <strong>Fashions</strong>
        </h4>
        <MDBRow>
          {product && product.length > 0 ? (
            product.map((item, index) => {
              return (
                <MDBCol
                key={index}
                hidden={item.categorie != 'Fashions'}
                sm="6"
                md="4"
                lg="3"
                className="mb-4 justify-center"
                >
                  <MDBCard key={index}>
                    <MDBRipple
                      rippleColor="light"
                      rippleTag="div"
                      className="bg-image d-flex justify-center rounded hover-zoom"
                      >
                      <MDBCardImage
                        src={item.imgUrl}
                        fluid
                        className=" max-h-[120px]"
                        />
                      <a href="#!">
                        <div className="mask">
                          <div className="d-flex justify-content-start align-items-end h-100">
                            <h5>
                              <span className="badge bg-primary ms-2">New</span>
                            </h5>
                          </div>
                        </div>
                        <div className="hover-overlay">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: 'rgba(251, 251, 251, 0.15)',
                            }}
                            ></div>
                        </div>
                      </a>
                    </MDBRipple>
                    <MDBCardBody>
                      <a href="#!" className="text-reset">
                        <h5 className="card-title mb-3">{item.ProductName}</h5>
                      </a>
                      <a href="#!" className="text-reset">
                        <p>{item.categorie}</p>
                      </a>
                      <h6>{item.price}</h6>
                      <MDBBtn
                        onClick={() => addToCart(item)}
                        color="black"
                        className="my-4"
                        size="lg"
                        >
                        Add to Cart
                      </MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              )
            })
          ) : (
            <h1>No Product Found</h1>
          )}
        </MDBRow>
      </MDBContainer>

      <MDBContainer fluid className=" my-5 text-center">
      <h4 className="mt-4 mb-5">
      <strong>Laptops</strong>
      </h4>
      <MDBRow>
          {product && product.length > 0 ? (
            product.map((item, index) => {
              return (
                <MDBCol
                key={index}
                  hidden={item.categorie != 'Laptops'}
                  sm="6"
                  md="4"
                  lg="3"
                  className="mb-4 justify-center "
                  >
                  <MDBCard >
                    <MDBRipple
                      rippleColor="light"
                      rippleTag="div"
                      className="bg-image d-flex justify-center rounded hover-zoom"
                      >
                      <MDBCardImage src={item.imgUrl} fluid className="" />
                      <a href="#!">
                        <div className="mask">
                          <div className="d-flex justify-content-start align-items-end h-100">
                            <h5>
                              <span className="badge bg-primary ms-2">New</span>
                            </h5>
                          </div>
                        </div>
                        <div className="hover-overlay">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: 'rgba(251, 251, 251, 0.15)',
                            }}
                            ></div>
                        </div>
                      </a>
                    </MDBRipple>
                    <MDBCardBody>
                      <a href="#!" className="text-reset">
                        <h5 className="card-title mb-3">{item.ProductName}</h5>
                      </a>
                      <a href="#!" className="text-reset">
                        <p>{item.categorie}</p>
                      </a>
                      <h6>{item.price}</h6>
                      <MDBBtn
                        onClick={() => addToCart(item)}
                        color="black"
                        className="my-4"
                        size="lg"
                      >
                        Add to Cart
                      </MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              )
            })
          ) : (
            <h1>No Product Found</h1>
          )}
        </MDBRow>
        </MDBContainer>

      <MDBContainer fluid className=" my-5 text-center">
        <h4 className="mt-4 mb-5">
          <strong>Mobile Phones</strong>
          </h4>
          <MDBRow>
          {product && product.length > 0 ? (
            product.map((item, index) => {
              return (
                <MDBCol
                key={index}
                hidden={item.categorie != 'Mobile Phones'}
                sm="6"
                md="4"
                lg="3"
                className="mb-4 justify-center w-[350px] "
                >
                  <MDBCard>
                    <MDBRipple
                      rippleColor="light"
                      rippleTag="div"
                      className="bg-image d-flex justify-center rounded hover-zoom"
                      >
                      <MDBCardImage
                        src={item.imgUrl}
                        fluid
                        className="max-h-[180px]"
                      />
                      <a href="#!">
                        <div className="mask">
                          <div className="d-flex justify-content-start align-items-end h-100">
                            <h5>
                              <span className="badge bg-primary ms-2">New</span>
                            </h5>
                          </div>
                        </div>
                        <div className="hover-overlay">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: 'rgba(251, 251, 251, 0.15)',
                            }}
                          ></div>
                        </div>
                      </a>
                    </MDBRipple>
                    <MDBCardBody>
                      <a href="#!" className="text-reset">
                        <h5 className="card-title mb-3">{item.ProductName}</h5>
                      </a>
                      <a href="#!" className="text-reset">
                        <p>{item.categorie}</p>
                      </a>
                      <h6>{item.price}</h6>
                      <MDBBtn
                        onClick={() => addToCart(item)}
                        color="black"
                        className="my-4"
                        size="lg"
                        >
                        Add to Cart
                      </MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              )
            })
          ) : (
            <h1>No Product Found</h1>
          )}
        </MDBRow>
      </MDBContainer>
    </div>
    )}


    export default About
    