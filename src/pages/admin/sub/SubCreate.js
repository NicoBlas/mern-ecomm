import React, {useState, useEffect} from 'react'
import AdminNav from "../../../components/nav/AdminNav"
import {toast} from "react-toastify"
import {useSelector} from "react-redux"
import { getCategories } from '../../../functions/category'
import {createSub, getSub, removeSub,getSubs} from "../../../functions/sub" 
import {LoadingOutlined} from "@ant-design/icons"
import {Link} from "react-router-dom"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'

const SubCreate = () => {
  const {user} = useSelector((state) => ({...state}))
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [keyboard, setKeyboard] = useState("")
  const [category, setCategory] = useState("")
  const [subs, setSubs] = useState([])
 

  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(()=>{
    loadCategories()
    loadSubs()
  },[])

  const loadCategories = () => getCategories().then((c) => setCategories(c.data))

  const loadSubs = () => getSubs().then((c) => setSubs(c.data))

  const handleSubmit = (e) => {
    e.preventDefault()
    //
    
    setLoading(true)
    if(category === "None" || category === ""){
        setLoading(false)
        toast.error("Must select a Category")
        return
    }
    createSub({name, parent: category}, user.token)
    .then((res) => {
      setLoading(false)
      setName("")
      toast.success(`${res.data.name} was created`)
      loadSubs()
    }).catch((err) => {
      console.log(err)
      setLoading(false)
      if (err.response.status === 400 ) toast.error(err.response.data)
    })
  }

  const handleRemove = async (slug) =>{
    if(window.confirm("Delete")){
      setLoading(true)
      removeSub(slug, user.token)
        .then((res) =>{
          setLoading(false)
          toast.success(`SubCategory ${res.data.name} deleted` )
          loadSubs()
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
            {loading? <LoadingOutlined  style={{ fontSize: '56px', color: '#08c' }} /> : <h3>Create Sub Category</h3>}

            <div className='form-group'>
            <label>Category</label>
            
            <select name='category' className='form-select  mb-3 w-25 text-center fw-bold' onChange={(e)=>setCategory(e.target.value)}>
                <option>None</option>
                {categories.length > 0 && categories.map((c)=>
                    <option key={c._id} value={c._id}>{c.name}</option>
                )}
            </select>
            </div>
            <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>

            <h4 className='mb-4 mt-4'>Sub Categories</h4>
            <LocalSearch keyboard={keyboard} setKeyboard={setKeyboard} />

            {subs.filter(searched(keyboard)).length < 1?
              <p>No results for "{keyboard}"</p> : 
              subs.filter(searched(keyboard)).map((elem)=>{
                return(
                  <div className='alert alert-primary mt-2' key={elem._id}>
                    {capitalizarPrimeraLetra(elem.name)}
                    <span onClick={()=> handleRemove(elem.slug)} className='btn btn-sm float-end'>
                      <DeleteOutlined className='text-danger ' />
                    </span>{" "}
                    <Link to={`/admin/sub/${elem.slug}`}>
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

export default SubCreate