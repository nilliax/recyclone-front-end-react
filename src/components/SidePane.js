import React from 'react'
import {useState} from 'react'
import { IconContext } from 'react-icons'
import { FaFilter, FaHome, FaSearch,
        FaExpandArrowsAlt, FaPlusSquare } from 'react-icons/fa'
import style from './style/SidePane.module.css'

function SidePane(props) {

    const iconStyle = {
        color: "white",
        size: "3vh",
    }

    return (
        <div className={style.root}>
        <IconContext.Provider value={iconStyle}>
            <div className={style.elem} onClick={() => props.setters.setMenu('filter')}>
                <FaFilter />
            </div>
            <div className={style.elem} onClick={() => props.setters.setMenu('search')}>
                <FaSearch />
            </div>
            <div className={style.elem} onClick={() => props.setters.setMenu('home')}>
                <FaHome />
            </div>
            <div className={style.elem} onClick={() => props.setters.setMenu('add')}>
                <FaPlusSquare />
            </div>
            <div className={style.elem} onClick={() => props.setters.setMenu('fullScreen')}>
                <FaExpandArrowsAlt />
            </div>
        </IconContext.Provider>
        </div>
    )
}

export default SidePane
