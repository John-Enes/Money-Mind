import {useLocation} from 'react-router-dom'
import { useState, useEffect } from 'react'

import Loading from '../Layout/JS/Loading.js'
import Message from "../Layout/JS/Message"
import styles from "../Layout/CSS/Projects.module.css"
import Container from '../Layout/JS/Container.js'
import LinkButton from '../Layout/JS/LinkButton.js'
import ProjectCard from '../Project/ProjectCard.js'


function Projects() {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation()
    let message = ""
    if(location.state){
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('https://john-enes.github.io/APIMoneyMind/',{
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                },
            }).then((resp) => resp.json())
            .then((data) => {
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err)) 
        }, 300);
    }, [])

    function removeProject(id){
        fetch(`https://john-enes.github.io/APIMoneyMind/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(resp => resp.json())
        .then(data => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage('Project removed successfully!')

        })
        .catch(err => console.log(err))
        
    }



    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>My Projects</h1>
                <LinkButton to="/newproject" text="CREATE PROJECT!" />
            </div>
            {message && <Message type="sucess"msg={message}/>}
            {projectMessage && <Message type="sucess"msg={projectMessage}/>}
            <Container customClass="start">
                {projects.length > 0 &&
                projects.map((project) => <ProjectCard 
                id={project.id}
                name={project.name}
                budget={project.budget}
                category={project.category.name}
                key={project.id}
                handleRemove={removeProject}
                 />)}
            </Container>
            {!removeLoading && <Loading/>}
            {removeLoading && projects.length === 0 &&(
                <p>There are no registered projects</p>
            )}
        </div>
    )
}

export default Projects