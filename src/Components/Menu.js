import React from 'react'
import { CCol, CNav, CNavLink } from '@coreui/react'

const Menu = () => {
    return (
        <CNav className="side-menu" as="nav">
           <CCol md={3} sm="3"> <CNavLink href="/" >Welcome</CNavLink></CCol>
           <CCol><CNavLink href="/SampleTable" >Table</CNavLink></CCol> 
        </CNav>
    )
}

export default Menu