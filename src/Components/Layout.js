import React from "react";
import {CRow } from '@coreui/react'
import Header from "./Header";
import { Routes, Route } from "react-router"
import Welcome from "./Welcome";
import SampleTable from "./SampleTable";

const Layout = () => {

    return (
        <CRow>
            <Header />
                <Routes>
                    <Route exact="true" path="/" element={<Welcome />} />
                    <Route path="/SampleTable" element={<SampleTable />} />
                </Routes>
        </CRow>
    )

}

export default Layout