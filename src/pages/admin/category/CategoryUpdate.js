import React, {useState, useEffect} from 'react'
import AdminNav from "../../../components/nav/AdminNav"
import {toast} from "react-toastify"
import {useSelector} from "react-redux"
import {createCategory, getCategory, updateCategory} from "../../../functions/category" 
import {LoadingOutlined} from "@ant-design/icons"
import {Link, useNavigate, useParams} from "react-router-dom"
import CategoryForm from '../../../components/forms/CategoryForm'

const CategoryUpdate = () => {
  const {user} = useSelector((state) => ({...state}))
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  let {slug} = useParams()
  let navigate = useNavigate()

  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(()=>{
    loadCategory()
    console.log("slug is: ",slug)
  },[])

  const loadCategory = () => getCategory(slug).then((c) => setName(c.data.name))

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    updateCategory(slug,{name}, user.token)
        .then((res)=>{
            setLoading(false)
            setName("")
            toast.success(`Category ${slug} Updated`)
            navigate("/admin/category")
        })
        .catch((err)=>{
            console.log(err)
            setLoading(false)
            if(err.response.status === 400) toast.error(err.response.data)
        })
  }

  
  return (
    <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-2'>
            <AdminNav />
          </div>

          <div className='col'>
            {loading? <LoadingOutlined  style={{ fontSize: '56px', color: '#08c' }} /> : <h4>Update Category</h4>}
            <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
          </div>
          
        </div>
    </div>
  )
}

export default CategoryUpdate