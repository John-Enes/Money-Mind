import {useEffect, useState} from 'react'
import styles from './ProjectForm.module.css'
import Input from '../Form/Input/Input'
import Select from '../Form/Select/Select'
import SubmitButton from '../Form/Submit/SubmitButton'


function ProjectForm({ handleSubmit, projectData, btnText}){

    const[categories, setCategories] = useState([])
    const[project, setProject] = useState(projectData || {})
    
    useEffect(() =>{
        fetch('http://localhost:5000/categories', {
        method: "GET",
        headers:{
            'Content-Type': 'application/json'
        },
    })
    .then((resp) => resp.json())
    .then((data) =>{
        setCategories(data)
    })
    .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(project)
        console.log(project)
    }

    function handleChange(e){
        setProject({...project, [e.target.name]: e.target.value}) 
        console.log(project)
    }
    function handleCategory(e){
        setProject({...project, category:{
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }
        })
    }


    return (
        <form onSubmit={submit} className={styles.form}>
            <Input type='text'
             text="Project Name" 
             name="name" 
             placeholder="Enter Project Name"
             handleOnChange={handleChange}
             required
             />
             
            
            <Input 
            type="number"
            text="Project budget" 
            name="budget" 
            placeholder="Enter total budget"
            handleOnChange={handleChange}
            required
            />
            
            <Select 
            name={'category_id'} 
            text={'Select the category'} 
            options={categories}
            handleOnChange={handleCategory}
            value={project.category ? project.category.id : ""}
            />



            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm