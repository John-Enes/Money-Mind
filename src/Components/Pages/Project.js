import { parse, v4 as uuidv4 } from 'uuid'
import styles from '../Layout/CSS/Project.module.css'
import { json, useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Loading from '../Layout/JS/Loading'
import Container from '../Layout/JS/Container'
import ProjectForm from '../Project/ProjectForm'
import Message from '../Layout/JS/Message'
import ServiceForm from '../Service/ServiceForm'
import ServiceCard from '../Service/ServiceCard'


function Project(){

    const{id} = useParams()

    const[project, setProject] = useState([])
    const[services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const[message, setMessage] = useState([])
    const[type, setType] = useState([])

    useEffect(() => {
        setTimeout(() => {
            fetch(`https://john-enes.github.io/APIMoneyMind/${id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(resp => resp.json())
            .then((data) =>{
                setProject(data)
                setServices(data.services)
            })
            .catch(err => console.log(err))
        }, 300);
        
    }, [id])

    function editPost(project){
        setMessage('')
        if(project.budget < project.cost){
            setMessage("The budget can't be less than the cost of the project ")
            setType('error')
            return false 
        }

        fetch(`https://john-enes.github.io/APIMoneyMind/${project.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
        .then(resp => resp.json())
        .then((data) =>{
            setProject(data)
            setShowProjectForm(false)
            setMessage("Updated project ")
            setType('success')
        })
        .catch(err => console.log(err))

    }

    function createService(){
        setMessage('')
        

        const LastService = project.services[project.services.length - 1]

        LastService.id = uuidv4()

        const LastServiceCost = LastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(LastServiceCost)

        if(newCost > parseFloat(project.budget)){
            
            setMessage('Budget exceeded, check the value of the service')
            setType('error')
            project.services.pop()
            return false
        }
        project.cost = newCost

        fetch(`https://john-enes.github.io/APIMoneyMind/${project.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then((data) =>{
            setShowProjectForm(false)
            setType('success')
        })
        .catch(err => console.log(err))
    }

    function removeService(id, cost){
        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        )
        const projectUpdated = {
            ...project,
            services: servicesUpdated,
            cost: parseFloat(project.cost) - parseFloat(cost)
        }
    
        fetch(`https://john-enes.github.io/APIMoneyMind/${projectUpdated.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        }).then(resp => resp.json())
        .then((data) =>{
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Service removed successfully!')
            setType('success')
        })
        .catch(err => console.log(err))
    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }
    
    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }
    
    return(<>
    {project.name ? (
        <div className={styles.project_details}>
            <Container customClass="column">
                {message && <Message type={type} msg={message}/>}
                <div className={styles.details_container}>
                    <h1> Project: {project.name}</h1>
                    <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? 'Edit Project' : 'Close'}</button>
                    {!showProjectForm ? (
                        <div className={styles.project_info}>
                            <p>
                                <span>Category:</span> {project.category.name}
                            </p>
                            <p>
                                <span>Total budget:</span> ${project.budget}
                            </p>
                            <p>
                                <span>Total used:</span> ${project.cost}
                            </p>
                        </div>
                    ): (
                        <div className={styles.project_info}> 
                           <ProjectForm handleSubmit={editPost} btnText="Finish editing" projectData={project}/>
                        </div>
                    )} 
                </div>
                <div className={styles.service_form_container}>
                        <h2>Add a service</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>{!showServiceForm ? 'Add service' : 'Close'}</button>
                        <div className={styles.project_info}>
                            {showServiceForm && (
                                <ServiceForm
                                    handleSubmit={createService}
                                    btnText={"Add Service"}
                                    projectData={project}
                                />
                            )}
                        </div>
                    </div>
                    <h2>Service</h2>
                    <Container customClass="start">
                        {services.length > 0 &&
                            services.map((service) => (
                                <ServiceCard
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}
                                />
                            ))
                        }
                        {services.length === 0 && <p>There are no registered services</p>} 
                    </Container>
            </Container>
        </div>
    ) : (
        <Loading/>
    )}
    </>)

    
}

export default Project