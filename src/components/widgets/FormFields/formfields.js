// MAIN IMPORT
import React from 'react';

// CSS
import styles from './formfields.css'

// COMPONENT
const FormFields = ({formdata, change, id}) => {
    
    const showError = () => {
        let errorMessage = null;

        if(formdata.validation && !formdata.valid){
            errorMessage = (
                <div className={styles.labelError}>
                    {formdata.validationMessage}
                </div>
            )
        }

        return errorMessage;
    }

    const renderTemplate = () => {
        let formTemplate = null;

        switch (formdata.element) {
            case ('input'):
                formTemplate = (
                    <div>
                        <input
                            {...formdata.config}
                            onBlur = {(event) => {change({event, id, blur:true})}}
                            onChange = {(event) => {change({event, id, blur:false})}}
                        />
                        {showError()}
                    </div>
                )
                break;
        
            default:
                formTemplate = null;
                break;
        }

        return formTemplate;
    }

    return(
        <div>
            {renderTemplate()}
        </div>
    )
}

export default FormFields;