import React, {useState, useEffect} from 'react'
import AdminNav from "../../../components/nav/AdminNav"
import {toast} from "react-toastify"
import {useSelector} from "react-redux"
import {createCategory, getCategories, removeCategory} from "../../../functions/category" 
import {LoadingOutlined} from "@ant-design/icons"
import {Link} from "react-router-dom"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'

const CategoryCreate = () => {
  const {user} = useSelector((state) => ({...state}))
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [keyboard, setKeyboard] = useState("")


  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(()=>{
    loadCategories()
  },[])

  const loadCategories = () => getCategories().then((c) => setCategories(c.data))

  const handleSubmit = (e) => {
    e.preventDefault()
    //

    setLoading(true)
    createCategory({name}, user.token)
    .then((res) => {
      setLoading(false)
      setName("")
      toast.success(`${res.data.name} was created`)
      loadCategories()
    }).catch((err) => {
      console.log(err)
      setLoading(false)
      if (err.response.status === 400 ) toast.error(err.response.data)
    })
  }

  const handleRemove = async (slug) =>{
    if(window.confirm("Delete")){
      setLoading(true)
      removeCategory(slug, user.token)
        .then((res) =>{
          setLoading(false)
          toast.success(`Category ${res.data.name} deleted` )
          loadCategories()
      })
        .catch((err)=>{
          if (err.response.status === 400 ) {
            setLoading(false)
            toast.error(err.response.data)
          }
        })
    }
  }



  const searched = (keyboard) => (c) => c.name.toLowerCase().includes(keyboard)

  return (
    <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-2'>
            <AdminNav />
          </div>

          <div className='col'>
            {loading? <LoadingOutlined  style={{ fontSize: '56px', color: '#08c' }} /> : <h3>Create Category</h3>}
            <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>

            <h4 className='mb-4 mt-4'>Categories</h4>
            <LocalSearch keyboard={keyboard} setKeyboard={setKeyboard} />

            {categories.filter(searched(keyboard)).length < 1?
              <p>No results for "{keyboard}"</p> : 
              categories.filter(searched(keyboard)).map((elem)=>{
                return(
                  <div className='alert alert-primary mt-2' key={elem._id}>
                    {capitalizarPrimeraLetra(elem.name)}
                    <span onClick={()=> handleRemove(elem.slug)} className='btn btn-sm float-end'>
                      <DeleteOutlined className='text-danger ' />
                    </span>{" "}
                    <Link to={`/admin/category/${elem.slug}`}>
                      <span className='btn btn-sm float-end'>
                        <EditOutlined className='text-warning' />
                      </span>{" "}
                    </Link>
                  </div>
                )
              }
              )
            } 

            
          </div>
          
        </div>
    </div>
  )
}

export default CategoryCreate