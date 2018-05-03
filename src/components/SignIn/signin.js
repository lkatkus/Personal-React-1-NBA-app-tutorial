// MAIN IMPORT
import React, { Component } from 'react';

// OTHER IMPORTS
import FormField from '../widgets/FormFields/formfields';
import { firebase } from '../../firebase';

// CSS
import styles from './signin.css';

// COMPONENT
class SignIn extends Component {
    state = {
        registerError:'',
        loading:false,
        formdata:{
            email:{
                element:'input',
                value:'',
                config:{
                    name:'email_input',
                    type:'email',
                    placeholder:'Enter your email'
                },
                validation:{
                    required:true,
                    email:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            password:{
                element:'input',
                value:'',
                config:{
                    name:'password_input',
                    type:'password',
                    placeholder:'Enter your password'
                },
                validation:{
                    required:true,
                    password:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            }
        }
    }

    updateForm = (element) => {
        const newFormdata = {
            ...this.state.formdata
        }

        const newElement = {
            ...newFormdata[element.id]
        }

        newElement.value = element.event.target.value;
        
        // VALIDATION
        if(element.blur){
            let validData = this.validate(newElement);
            
            // ADD VALIDATION STATUS TO STATE
            newElement.valid = validData[0];
            // ADD ERROR MESSAGE TO STATE
            newElement.validationMessage = validData[1];
        }
        // SET TOUCHED STATUS
        newElement.touched = element.blur;

        // UPDATING DATA
        newFormdata[element.id] = newElement;

        // UPDATE STATE IF VALID
        this.setState({
            formdata:newFormdata
        });
    }

    validate = (element) => {
        let error = [true,''];

        if(element.validation.password){
            const valid = element.value.length >= 5;
            const message = `${!valid ? 'This must be greater than 5' : ''}`
            error = !valid ? [valid, message] : error;
        }

        if(element.validation.email){
            const valid = /\S+@\S+\.\S+/.test(element.value);
            const message = `${!valid ? 'Enter a valid email' : ''}`
            error = !valid ? [valid, message] : error;
        }

        if(element.validation.required){
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'This field is required' : ''}`
            error = !valid ? [valid, message] : error;
        }

        return error;
    }

    submitButton = () => {
        return(
            this.state.loading
            ? 'loading...'
            :
                <div>
                    <button onClick={ (event) => {this.submitForm(event,false)} }> Register now </button>
                    <button onClick={ (event) => {this.submitForm(event,true)} }> Log in </button>
                </div>
        )
    }

    submitForm = (event,type) => {
        event.preventDefault();

        if(type != null){
            
            let dataToSubmit = {};
            let formIsValid = true;

            for(let key in this.state.formdata){
                dataToSubmit[key] = this.state.formdata[key].value;
            }
            for(let key in this.state.formdata){
                formIsValid = this.state.formdata[key].valid && formIsValid;
            }

            if(formIsValid){
                this.setState({
                    loading:true,
                    registerError:''
                })
                if(type){
                    firebase.auth()
                    .signInWithEmailAndPassword(
                        dataToSubmit.email,
                        dataToSubmit.password   
                    )
                    .then(()=>{
                        this.props.history.push('/');
                    })
                    .catch((error)=>{
                        this.setState({
                            loading:false,
                            registerError: error.message
                        })

                    })
                }else{
                    firebase.auth()
                    .createUserWithEmailAndPassword(
                        dataToSubmit.email,
                        dataToSubmit.password)
                    .then(()=>{
                        this.props.history.push('/');
                    })
                    .catch((error)=>{
                        this.setState({
                            loading:false,
                            registerError: error.message
                        })

                    })
                }
            }

        }
    }

    showError = () => {
        return(
            this.state.registerError !== ''
            ? <div className={styles.errorLabel}>{this.state.registerError}</div>
            : null
        )
    }

    render(){
        return(
            <div className={styles.logContainer}>
                <form onSubmit={(event)=>{this.submitForm(event,null)}}>
                    <h2>Register / Log In</h2>
                    <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={ (element) => {this.updateForm(element)} }
                    />

                    <FormField
                        id={'password'}
                        formdata={this.state.formdata.password}
                        change={ (element) => {this.updateForm(element)} }
                    />

                    { this.submitButton() }
                    { this.showError() }
                </form>
            </div>
        )
    }
}

export default SignIn;