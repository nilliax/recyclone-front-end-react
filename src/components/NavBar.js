import React from 'react'
import style from './style/NavBar.module.css'
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <div>
            <div className={style.flexContainer}>
                <div className={style.logo}>Recycle Pack</div>
                <div className={style.linkElem}>
                    <Link to='/login'>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default NavBar
