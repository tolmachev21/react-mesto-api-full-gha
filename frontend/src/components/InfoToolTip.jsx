

function InfoToolTip({ name, isSuccessful, isOpen, onClose }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_type_registration">
                <button className="popup__close-button" onClick={onClose} type="button" aria-label={`Закрыть окно статуса авторизации`}></button>
                <div className={`popup__registration-image ${isSuccessful ? '' : 'popup__registration-image_type_error'}`} />
                <h2 className="popup__registration-title">{isSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
            </div>
        </div>
    );
};

export default InfoToolTip;