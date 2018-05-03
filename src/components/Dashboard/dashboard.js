// MAIN IMPORT
import React, { Component } from 'react';

import FormField from '../widgets/FormFields/formfields';

// CSS
import styles from './dashboard.css';

class Dashboard extends Component {

    state = {
        postError:'',
        loading:false,
        formdata:{
            author:{
                element:'input',
                value:'',
                config:{
                    name:'author_input',
                    type:'text',
                    placeholder:'Enter author name'
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            title:{
                element:'input',
                value:'',
                config:{
                    name:'title_input',
                    type:'text',
                    placeholder:'Enter post title'
                },
                validation:{
                    required:true,
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
                    <button type="submit">Add post</button>
                </div>
        )
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formdata){
            dataToSubmit[key] = this.state.formdata[key].value;
        }
        for(let key in this.state.formdata){
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }

        if(formIsValid){
            console.log('submit post');
        }else{
            this.setState({
                postError:'something went wrong'
            })
        }
    }

    showError = () => {
        return(
            this.state.postError !== ''
            ? <div className={styles.errorLabel}>{this.state.postError}</div>
            : null
        )
    }

    render(){
        return(
            <div className={styles.postContainer}>
                <form onSubmit={this.submitForm}>
                <h2>Add Post</h2>
                    <FormField
                        id={'author'}showError
                        formdata={this.state.formdata.author}
                        change={ (element) => {this.updateForm(element)} }
                    />

                    <FormField
                        id={'title'}showError
                        formdata={this.state.formdata.title}
                        change={ (element) => {this.updateForm(element)} }
                    />

                    { this.submitButton() }
                    { this.showError() }

                </form>
            </div>
        )
    }
}

export default Dashboard;