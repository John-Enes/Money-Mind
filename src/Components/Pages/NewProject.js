import { useNavigate } from 'react-router-dom'

import styles from "../Layout/CSS/NewProject.module.css"

import ProjectForm from "../Project/ProjectForm"

function NewProject() {

    const navigate = useNavigate()

    function createPost(project){
        // initialize cost and services
        project.cost = 0
        project.services = []

        fetch('https://john-enes.github.io/APIMoneyMind/', {
            method: 'POST',
            headers:{
                'Content-type': "application/json",
            },
            body: JSON.stringify(project),
         })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            //redirect
            navigate('/projects', {message: 'Project created successfully'})
        })
        .catch((err) => console.log(err))
    }


    return (
        <div className={styles.newproject_container}>
            <h1>CREATE PROJECT</h1>
            <p> Creat your project, then add the services </p>
            <ProjectForm handleSubmit={createPost} btnText="Create Project"/>
        </div>
    )
}

export default NewProject