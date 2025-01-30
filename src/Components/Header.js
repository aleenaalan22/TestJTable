import React from "react";
import { CRow, CCol } from '@coreui/react'
import './custom.css'
import 'fa-icons';
import Menu from "./Menu";

const Header = () => {

    return (
        <CRow className="header">
            <CCol md={2} sm={4}><h2 className="p-3">DEMO</h2></CCol>
            <Menu />
        </CRow>
    )
}

export default Header;