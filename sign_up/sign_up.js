class inputBox {
    constructor(input_element) {
        this.inputElement = input_element;
        this.inputSection = input_element.parentElement.parentElement;
        this.inputIcon = this.inputSection.getElementsByClassName('input_icon')
        this.errorBox = this.inputSection.querySelector('.input_message_box');
        this.errorList = [];
    }
    showError(error_maessge){
      //will show error send in parameter
      if(error_maessge){
        this.errorBox.style.opacity = '1';
        this.errorBox.querySelector('.error_message_text').innerHTML = error_maessge;       
        this.inputElement.style.borderColor = "var(--red_color)";
        Array.from(this.inputIcon).forEach((ele)=>{ele.style.stroke ="var(--red_color)" });
        this.inputElement.style.color = 'var(--red_color)';
      }
      else{
        this.errorBox.style.opacity = '0';
        this.inputElement.style.borderColor = "blue";
        Array.from(this.inputIcon).forEach((ele)=>{ele.style.stroke ="blue" });
        this.inputElement.style.color = 'blue';

      }
    }
    emptyInputValidater(){
        const state = this.inputElement.value ?true:false;
        this.errorList.push(new errorObject('emptyvalidation','you left the field empty',state));
    }
}
class errorObject {
    constructor(name,message,state){
        this.name = name;
        this.message = message;
        this.state = state;
    }
}
const emailBox = new inputBox(document.querySelector('#email_input'));
const passwordBox = new inputBox(document.querySelector('#password_input'));

 //toggles icon based on input type
passwordBox.eyeIcon = passwordBox.inputSection.getElementsByClassName('eye_icon')[0];
passwordBox.showPassword = function () {

    if (this.inputElement.getAttribute('type') === 'password') {
        this.inputElement.setAttribute('type', 'text');
        this.eyeIcon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
    }
    else {
        this.inputElement.setAttribute('type', 'password');
        this.eyeIcon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
    }
}
passwordBox.eyeIcon.oninput = () => {passwordBox.showPassword()};

/* validations for password box */
