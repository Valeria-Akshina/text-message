import styless from './style/index.module.css'

export const Register = () => {
    return (
        <div className={styless.cardRegist}>
            <div className={styless.text}>
                <h1>Регистрация</h1>
                <h3>Зарегистрируйтесь, чтобы воспользоваться чатом</h3>
            </div>
            <div className={styless.allInput}>
                <div className={styless.inputGroup}>
                    <input type="text" className={styless.customInput} placeholder="Введите текст здесь"/>
                    <label className={styless.nameLabel}>Ваше имя</label>
                </div>
                <div className={styless.inputGroup}>
                    <input type="text" className={styless.customInput} placeholder="Введите текст здесь"/>
                    <label className={styless.nameLabel}>Email</label>
                </div>
                <div className={styless.inputGroup}>
                    <input type="text" className={styless.customInput} placeholder="Введите текст здесь"/>
                    <label className={styless.nameLabel}>Пароль</label>
                </div>
            </div>
            <button>Зарегистрироваться</button>
            <div className={styless.dividerClassic}>
                <div className={styless.line}></div>
                <div className={styless.text}>Или</div>
                <div className={styless.line}></div>
            </div>
            <div className={styless.footer}>
                <h4>Уже есть аккаунт? <a href="#">Войти</a></h4>
            </div>
        </div>
    )
}