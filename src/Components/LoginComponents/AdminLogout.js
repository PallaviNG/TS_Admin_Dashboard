import React from 'react'
import { useEffect } from 'react';
import { removeAuthToken } from './../../Service/adminService';

export default function AdminLogout(props) {

    useEffect(() => {
        let token = localStorage.getItem("token");
        removeAuthToken(token);
    });

    return (
        <div className="content formComponent">
            <h4>Logged out from Dashboard Successuly!!!</h4>
        </div>
    )
}
