// MAIN IMPORT
import React, { Component } from 'react';

// ADDONS
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { firebase, firebaseTeams } from '../../firebase';
import Uploader from '../widgets/FileUploader/fileuploader';

// OTHER COMPONENTS
import FormField from '../widgets/FormFields/formfields';

// CSS
import styles from './dashboard.css';

class Dashboard extends Component {

    state = {
        editorState: EditorState.createEmpty(),
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
            },

            body:{
                element:'texteditor',
                value:'',
                valid:true
            },

            teams:{
                element:'select',
                value:'',
                config:{
                    name:'teams_input',
                    options:[]
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

    componentDidMount(){
        this.loadTeams();
    }

    loadTeams = () => {
        firebaseTeams.once('value')
        .then((snapshot)=>{
            let teams = [];

            snapshot.forEach((childSnapshot)=>{
                teams.push({
                    id: childSnapshot.val().teamId,
                    name: childSnapshot.val().city
                })
            })

            const newFormdata = {...this.state.formdata};
            const newElement = {...newFormdata['teams']}

            newElement.config.options = teams;
            newFormdata['teams'] = newElement;

            this.setState({
                formdata: newFormdata
            })
        })
    }

    updateForm = (element, content = '') => {
        const newFormdata = {
            ...this.state.formdata
        }

        const newElement = {
            ...newFormdata[element.id]
        }

        if(content === ''){
            newElement.value = element.event.target.value;
        }else{
            newElement.value = content;
        }
        
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
            console.log(dataToSubmit);
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

    onEditorStateChange = (editorState) => {
        
        // GETTING CURRENT STATE OF EDITOR
        let contentState = editorState.getCurrentContent();
        
        // FOR STORING IN DB
        let rawState = convertToRaw(contentState);
        let html = stateToHTML(contentState);

        this.updateForm({id:'body'}, html)

        this.setState({
            editorState
        })
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

                    <FormField
                        id={'teams'}showError
                        formdata={this.state.formdata.teams}
                        change={ (element) => {this.updateForm(element)} }
                    />

                    <Uploader/>

                    <Editor
                        editorState={this.state.editorState}
                        wrapperClassName="myEditorWrapper"
                        editorClassName="myEditorEditor"
                        onEditorStateChange={this.onEditorStateChange}
                    />
                    { this.submitButton() }
                    { this.showError() }

                </form>
            </div>
        )
    }
}

export default Dashboard;