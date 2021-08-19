import {passwordInputBoxOutput,emailInputBoxOutput,formBox} from '../script/modules/form.js';
//code to check wheather browser is compatible with database or not
// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
 window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)b

//sign up inputs fields created with thier respective class with parent as inputElments
const signup_emailBox = new emailInputBoxOutput(document.querySelector('#signup_email_input'));
const signup_passwordBox = new passwordInputBoxOutput(document.querySelector('#signup_password_input'));
//login input fields
const login_emailBox = new emailInputBoxOutput(document.querySelector('#login_email_input'));
const login_passwordBox = new passwordInputBoxOutput(document.querySelector('#login_password_input'));

//animation code 
const displayTimeline = gsap.timeline();
displayTimeline.from('.logo_wrapper', {duration: .35, opacity:0,x:-50,ease:Back.easeInOut.config(1.4)});
displayTimeline.from('.input_form', {duration: .35, opacity:0,x:500,ease:Back.easeInOut.config(1.4)});
displayTimeline.from('.quote_wrapper', {duration: .35, opacity:0,y:200,ease:Back.easeInOut.config(1.4)});
displayTimeline.from('.hero_image', {duration: .35, opacity:0,x:-200,y:200,ease:Back.easeInOut.config(1.2)});

//toggle between sign_up and login form
 function switchform(){
    const switch_animation = gsap.timeline();
    switch_animation.fromTo('.input_form[data-formactive]', {duration: .2, display:'block',x:0,opacity:1,ease:Back.easeInOut.config(1.4)}, {duration: .2, display:'none',x:-500,opacity:0,ease:Back.easeInOut.config(1.4)});
    switch_animation.fromTo('.input_form[data-formhidden]', {duration: .2, display:'none',x:500,opacity:0,ease:Back.easeInOut.config(1.4)}, {duration: .5, display:'block',x:0,opacity:1});
    const active_form = document.querySelector('.input_form[data-formactive]');
    const hidden_form = document.querySelector('.input_form[data-formhidden]');
    active_form.removeAttribute('data-formactive');
    active_form.setAttribute('data-formhidden','');
    hidden_form.removeAttribute('data-formhidden');
    hidden_form.setAttribute('data-formactive','');
   
 }
// switching forms with buttons
document.getElementsByClassName('sign_up_button')[0].onclick = ()=>{switchform()};  
document.getElementsByClassName('sign_up_button')[1].onclick = ()=>{switchform()};  
// form submitting validation 
class SignUpForm extends formBox{
    constructor(form_para,...inputBoxes){
        super(form_para,...inputBoxes);
    }
    SubmitForm(){ 
         //returns false if validation is not completed
        if(!this.ValidateForm()){return false;};
        //saves data in data base 
       const DBrequest = window.indexedDB.open('Acadmer');
       const userObject = {email:this.inputBoxes[0].inputElement.value,password:this.inputBoxes[1].inputElement.value};

       DBrequest.onsuccess = function(){
           // checking if database is created or not 
           if(!'user' in this.result.objectStoreNames){
           this.result.createObjectStore('user',{keyPath:"email"});
           }
       }
       DBrequest.onupgradeneeded = function(){
            const req  = this.result; 
           req.objectStore('user','readwrite');
           userObjectStore.add(userObject);
       }
       return false;
    }
}
class SignInForm extends formBox{
    constructor(form_para,...inputBoxes){
        super(form_para,...inputBoxes);
    }
    SubmitForm(){
         //returns false if validation is not completed
        if(!this.ValidateForm()){return false;};  
        console.log('login in successfull'); 
    }
}
//form objects 
const signup_form = new SignUpForm(document.getElementById('signUpForm'),signup_emailBox,signup_passwordBox);
const signin_form = new SignInForm(document.getElementById('signInForm'),login_emailBox,login_passwordBox);

