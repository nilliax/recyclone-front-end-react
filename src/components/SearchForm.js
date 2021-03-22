import React from 'react'
import style from './style/FilterForm.module.css'

function FilterForm(props) {
    const [loc, setLoc] = React.useState('')

    const updateLoc = (e) => {
        setLoc(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.setLocation(loc)
    }
    
    return (
        <div>
            <form className={style.form}>
                <label htmlFor="loc">Location:</label><br/>
                <input className={style.location} value={loc} onChange={updateLoc} placeholder="optional" /><br/>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default FilterForm
