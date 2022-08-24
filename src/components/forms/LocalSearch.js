import React from 'react'

const LocalSearch = ({keyboard, setKeyboard}) => {

    const handleSearchChange = (e) =>{
        e.preventDefault()
        setKeyboard(e.target.value.toLowerCase())
    
      }
    return (
        <input type="search" placeholder='Search' value={keyboard} onChange={handleSearchChange} className="form-control mb-4 mt-4" />

    )
}

export default LocalSearch