import React from 'react'
import style from './style/FilterForm.module.css'

function FilterForm(props) {
    const[rad, setRad] = React.useState(1)
    const [loc, setLoc] = React.useState('')
    const [type, editArray] = React.useState([])

    const updateRad = (e) => {
        setRad(e.target.value)
    }
    const updateLoc = (e) => {
        setLoc(e.target.value)
    }
    const updateTypeArr = (e) => {
        if (e.target.checked) {
           type.push(e.target.value)
        } else {
            editArray(type.filter((elem) => {
                return elem !== e.target.value
            }))
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        props.setBinParameters(loc, type, rad)
    }
    
    return (
        <div>
            <form className={style.form}>
                <label htmlFor="loc">Location:</label><br/>
                <input className={style.location} value={loc} onChange={updateLoc} placeholder="optional" /><br/>
                <label htmlFor="rad">Radius: {rad}km</label><br/>
                <input required onChange={updateRad} type="range" min="1" max="200" value={rad}  name="rad"/><br/>
                <label htmlFor="loc">Waste Type:</label><br/>
                <input className={style.check} onChange={updateTypeArr} type="checkbox" name="plastic" value="plastic" />
                <label htmlFor="plastic">Plastic</label><br/>
                <input className={style.check} onChange={updateTypeArr} type="checkbox" name="paper" value="paper" />
                <label htmlFor="paper">Paper</label><br/>
                <input className={style.check} onChange={updateTypeArr} type="checkbox" name="landfill" value="landfill" />
                <label htmlFor="landfill">Landfill</label><br/>
                <input className={style.check} onChange={updateTypeArr} type="checkbox" name="electronic" value="electronic" />
                <label htmlFor="electronic">Electronic</label><br/>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default FilterForm
