import React from 'react'
import style from './style/FilterForm.module.css'

function FilterForm({binToAdd, addNewBin}) {
    const [type, editTypes] = React.useState([])
    const [color, editColors] = React.useState([])

    const updateArr = (e, arr) => {
        if (e.target.checked) {
           arr.push(e.target.value)
        } else {
            editTypes(arr.filter((elem) => {
                return elem !== e.target.value
            }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        binToAdd.types = type;
        binToAdd.colors = color;
        addNewBin()
    }
    
    return (
        <div>
            <form className={style.form}>
                <label htmlFor="loc">Waste Type:</label><br/>
                <input className={style.check} onChange={(e) => updateArr(e, type)} type="checkbox" name="plastic" value="plastic" />
                <label htmlFor="plastic">Plastic</label><br/>
                <input className={style.check} onChange={(e) => updateArr(e, type)} type="checkbox" name="paper" value="paper" />
                <label htmlFor="paper">Paper</label><br/>
                <input className={style.check} onChange={(e) => updateArr(e, type)} type="checkbox" name="landfill" value="landfill" />
                <label htmlFor="landfill">Landfill</label><br/>
                <input className={style.check} onChange={(e) => updateArr(e, type)} type="checkbox" name="electronic" value="electronic" />
                <label htmlFor="electronic">Electronic</label><br/><br/>

                <label htmlFor="loc">Color:</label><br/>
                <input className={style.check} onChange={(e) => updateArr(e, color)} type="checkbox" name="blue" value="blue" />
                <label htmlFor="plastic">Blue</label><br/>
                <input className={style.check} onChange={(e) => updateArr(e, color)} type="checkbox" name="green" value="green" />
                <label htmlFor="paper">Green</label><br/>
                <input className={style.check} onChange={(e) => updateArr(e, color)} type="checkbox" name="black" value="black" />
                <label htmlFor="landfill">Black</label><br/>
                <input className={style.check} onChange={(e) => updateArr(e, color)} type="checkbox" name="grey" value="grey" />
                <label htmlFor="electronic">Grey</label><br/>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default FilterForm
