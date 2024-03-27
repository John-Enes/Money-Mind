import styles from "../Layout/CSS/Home.module.css"
import savings from '../../img/savings.svg'
import LinkButton from "../Layout/JS/LinkButton"
function Home() {
    return (
        <section className={styles.home_container}>
            <h1>Welcome to <span>Money Mind</span></h1>
            <p>Manage your projects now!</p>
            <LinkButton to="/newproject" text="CREATE PROJECT!" />
            <img src={savings} alt="Money Mind"></img>
        </section>
    )
}

export default Home