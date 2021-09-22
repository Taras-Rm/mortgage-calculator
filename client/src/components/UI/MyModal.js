import React from "react";
import s from "./MyModal.module.css"

const MyModal = ({children, visible, setVisible}) => {

    return (
        <div className={`${s.myModal} ${visible && s.active}`} onClick={() => setVisible(false)}>
            <div className={s.myModal_content} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default MyModal;