'use client'
import React, { useState, useEffect } from 'react'
import { Sidebar } from 'flowbite-react'
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiOutlineMinusSm,
  HiOutlinePlusSm,
  HiShoppingBag,
  HiTable,
  HiUser,
} from 'react-icons/hi'
import { twMerge } from 'tailwind-merge'
import {
  MDBIcon,
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBBtn,
  MDBBadge,
} from 'mdb-react-ui-kit'
import useGetUsers from '../../hooks/useGetUsers'
import { useRouter } from 'next/navigation'
import "./../../app/styles.css"

export default function App() {
  const { loggedUser } = useGetUsers()
  const [openNavSecond, setOpenNavSecond] = useState(false)
  const [authenticatedUser, setAuthenticatedUser] = useState(null)
  const [order,setOrder] = useState([])
  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem('AuthUser') != null) {
      let fetchUser = localStorage.getItem('AuthUser')
      let actualUser = JSON.parse(fetchUser)
      if (fetchUser) setAuthenticatedUser(actualUser)
    }
  }, [])
  
  useEffect(() => {
    if (localStorage.getItem('YourOrder') != null) {
      let fetchOrder = localStorage.getItem('YourOrder')
      let jsonData = JSON.parse(fetchOrder)
      setOrder(jsonData)
    }
  }, [order])

  return (
    <div>
      <MDBNavbar expand="lg" light bgColor="black" className=" text-white">
        <MDBContainer className="text-white" fluid>
          <MDBNavbarBrand className="text-white">
            <MDBIcon
              fas
              icon="dragon fa-2x me-3"
              style={{ color: '#ff6219' }}
            />{' '}
            Shopee
          </MDBNavbarBrand>
          <MDBNavbarToggler
            className="bg-white"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpenNavSecond(!openNavSecond)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar open={openNavSecond}>
            <MDBNavbarNav>
              <MDBNavbarLink
                className="text-white"
                active
                aria-current="page"
                href="/"
              >
              Home
              </MDBNavbarLink>
              {(authenticatedUser && authenticatedUser.name == "Admin") ?

                <MDBNavbarLink className="text-white" href="/addproducts">
                Add Product
              </MDBNavbarLink>
              :
              <MDBNavbarLink className="text-white" href="/Product">
                Product
              </MDBNavbarLink>
              }
              {authenticatedUser ? (
                <MDBBtn
                  onClick={() => {
                    localStorage.setItem('AuthUser', JSON.stringify(null))
                    window.location.href ='/'
                  }}
                  style={{ backgroundColor: '#ff6219' }}
                >
                  Log Out
                </MDBBtn>
              ) : (
                <MDBNavbarLink className="text-white" href="/Login">
                  Log In
                </MDBNavbarLink>
              )}
            </MDBNavbarNav>
            <div className="flex pr-4">
              <MDBNavbarBrand className="text-white">
              <span><MDBIcon fas className="pt-1 px-1" icon="user" />{authenticatedUser ?authenticatedUser.name : 'No user'}</span>
              </MDBNavbarBrand>
              <MDBNavbarLink className='relative py-4' href='/yourcart'>
              <MDBBadge pill className='absolute top-3 -right-2' color='danger'>{order.length}</MDBBadge>
              <span className='flex'>
                <MDBIcon fas  icon='shopping-cart fa-2x'></MDBIcon>
              </span>
            </MDBNavbarLink>
              <MDBNavbarLink
                hidden={authenticatedUser ? true : false}
                href="/SignUp"
                className='pt-3 px-4'
              >
                <span  style={{ color: 'white', backgroundColor: '#ff6219' }}className="  rounded-lg flex p-2 gap-2">
                  SignUp <MDBIcon fas className="pt-1" icon="user" />
                </span>
              </MDBNavbarLink>
            </div>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  )
}
