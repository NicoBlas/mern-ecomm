import React, {useState, useEffect} from 'react'
import AdminNav from "../../../components/nav/AdminNav"
import {toast} from "react-toastify"
import {useSelector} from "react-redux"
import { getCategories } from '../../../functions/category'
import {createSub, getSub, updateSub,removeSub,getSubs} from "../../../functions/sub" 
import {LoadingOutlined} from "@ant-design/icons"
import {Link, useParams, useNavigate} from "react-router-dom"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'


const SubUpdate = () => {
  const {user} = useSelector((state) => ({...state}))
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [parent, setParent] = useState("")
 
  let {slug} = useParams()

  let navigate = useNavigate()

  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(()=>{
    loadCategories()
    loadSubs()
  },[])

  const loadCategories = () => getCategories().then((c) => setCategories(c.data))

  const loadSubs = () => getSub(slug).then((s) => {
    setName(s.data.name)
    setParent(s.data.parent)
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    //
    
    setLoading(true)
    if(parent === "None" || parent === ""){
        setLoading(false)
        toast.error("Must select a Category")
        return
    }
    updateSub(slug, {name, parent}, user.token)
    .then((res) => {
      setLoading(false)
      setName("")
      toast.success(`${res.data.name} category was updated`)
      navigate("/admin/sub")
    }).catch((err) => {
      console.log(err)
      setLoading(false)
      if (err.response.status === 400 ) toast.error(err.response.data)
    })
  }




  const searched = (keyboard) => (c) => c.name.toLowerCase().includes(keyboard)

  return (
    <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-2'>
            <AdminNav />
          </div>
          <div className='col'>
            {loading? <LoadingOutlined  style={{ fontSize: '56px', color: '#08c' }} /> : <h3>Update Sub Category</h3>}

            <div className='form-group'>
            <label>Category</label>
            
            <select name='category' className='form-select  mb-3 w-25 text-center fw-bold' onChange={(e)=>setParent(e.target.value)}>
                <option>None</option>
                {categories.length > 0 && categories.map((c)=>
                    <option key={c._id} value={c._id} selected={c._id === parent} >{c.name}</option>
                )}
            </select>
            </div>
            <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
       
          </div>    
        </div>
    </div>
  )
}

export default SubUpdate