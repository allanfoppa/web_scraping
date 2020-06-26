import React from 'react'
import { useHistory } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'

import './index.css'

export default function Logout(){

    const history = useHistory()

    const handleLogout = () => {
        history.push('/')
    }

    return(
        <span className="c-logout" onClick={handleLogout}>
            <FiLogOut size="20" color="#000"></FiLogOut>
        </span>
    )
}