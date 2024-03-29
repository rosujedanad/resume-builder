import styles from "./styles.module.css";

function Login() {
    return (
        <div className={styles.container}>
            
            <div className={styles.form_container}>
                <div className={styles.left}>
                    <img className={styles.img} src="./images/green_illustration.jpeg" alt="login"/>
                </div>
                <div className={styles.right}>
                    <h2 className={styles.from_heading}>Hey there!</h2>
                    <p className={styles.text1}>Welcome</p>
                    <p className={styles.text}> You're just one step away from crafting your professional resume.</p>
                    <p className={styles.text2}>Sign in with</p>
                    <button className={styles.google_btn}>
						<img src="./images/google.png" alt="google icon" />
						<span>Google</span>
					</button>
                </div>

            </div>
        </div>
    );
}

export default Login;