import styless from './style/styles.module.css'
import { Link } from 'react-router-dom'

export const Entrance = () => {
    return (
        <div className={styless.cardRegist}>
            <div className={styless.text}>
                <h1>Вход</h1>
                <h3>Пожалуйста, войдите в свою учетную запись, чтобы продолжить работу</h3>
            </div>
            <div className={styless.allInput}>
                <div className={styless.inputGroup}>
                    <input type="text" className={styless.customInput} placeholder="Введите текст здесь"/>
                    <label className={styless.nameLabel}>Email</label>
                </div>
                <div className={styless.inputGroup}>
                    <input type="password" className={styless.customInput} placeholder="Введите текст здесь"/>
                    <label className={styless.nameLabel}>Пароль</label>
                </div>
            </div>
            <button>Войти</button>
            <div className={styless.dividerClassic}>
                <div className={styless.line}></div>
                <div className={styless.text}>Или</div>
                <div className={styless.line}></div>
            </div>
            <div className={styless.footer}>
                <h4>Нужна учетная запись? <Link to="/register">Создайте её</Link></h4>
            </div>
        </div>
    )
}