// class for all input field enviroment in form
class inputBox {
    constructor(input_element) {
        this.inputElement = input_element;
        this.inputSection = input_element.parentElement.parentElement;
        this.inputIcon = this.inputSection.getElementsByClassName('input_icon')
        this.errorBox = this.inputSection.querySelector('.input_message_box');
        this.errorList = [];
        // prevent form from auto submitting on enter key press
        this.inputElement.onkeypress = (key) => { if (key.keyCode === 13) { return false; } }
        /*  runs all the validation methods every time user blurs on input field */
        this.inputElement.onblur = () => { this.validate_function(); };
        //default error for empty inpit fields
        this.errorList.push(new errorObject('emptyvalidation', 'you left the field empty', false));
    }
    showError(error_message_para) {
        const checkIcon = ' <polyline points="20 6 9 17 4 12"></polyline>';
        const alertIcon = '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>'
        //will show error send in parameter
        const show_message_box = function (inputBoxObject, errorText, iconColor, iconPath) {
            inputBoxObject.errorBox.style.opacity = '1';
            inputBoxObject.errorBox.querySelector('.error_message_text').innerHTML = errorText;
            inputBoxObject.inputElement.style.borderColor = iconColor;
            Array.from(inputBoxObject.inputIcon).forEach((ele) => { ele.style.stroke = iconColor });
            inputBoxObject.inputElement.style.color = iconColor;
            inputBoxObject.errorBox.querySelector('.error_box_icon').innerHTML = iconPath;
            inputBoxObject.errorBox.querySelector('.error_box_icon').style.stroke = iconColor;
        }
        if (error_message_para) {
            show_message_box(this, error_message_para, 'var(--red_color)', alertIcon);
        }
        else {
            show_message_box(this, ' ', 'var(--green_color)', checkIcon);
        }
    }
    emptyInputValidater() {
        const state = this.inputElement.value ? true : false;
        this.errorList.push(new errorObject('emptyvalidation', 'you left the field empty', state));
    }
}
// sub class for passwrd input box
class passwordInputBoxOutput extends inputBox {
    constructor(input_element) {
        /*   sends data to parent data to make object */
        super(input_element);
        /*shows password when clicked on icon */
        this.eyeIcon = this.inputSection.getElementsByClassName('eye_icon')[0];
        this.eyeIcon.onclick = () => { this.showPassword() };
    }

    /*  toggles input type on eyeIcon click*/
    showPassword = function () {
        console.log('working');
        if (this.inputElement.getAttribute('type') === 'password') {
            this.inputElement.setAttribute('type', 'text');
            this.eyeIcon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
        }
        else {
            this.inputElement.setAttribute('type', 'password');
            this.eyeIcon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
        }
    }
    minimunCharacterValidation() {
        const length = 6;
        const state = (this.inputElement.value.length >= length) ? true : false;
        this.errorList.push(new errorObject('emptyvalidation', 'minimun 6 characters are required', state));
    }

    validate_function() {
        //will erase the current error array so error objects dont overlap
        this.errorList.length = 0;
        this.emptyInputValidater();
        this.minimunCharacterValidation();
        //if no error is found then it will return false
        const foundError = this.errorList.find((ele) => { return ele.state === false }) ? this.errorList.find((ele) => { return ele.state === false }) : false;
        //calls showError with error_mesaage or empty string
        this.showError(foundError ? foundError.message : '');
    }
}
// sub class for passwrd input box
class emailInputBoxOutput extends inputBox {
    constructor(input_element) {
        /*   sends data to parent data to make object */
        super(input_element);
    }
    //validation for @ sign 
    validationForAtSign() {
        const state = (this.inputElement.value.includes('@')) ? true : false;
        this.errorList.push(new errorObject('emptyvalidation', '@  is missing in your email address', state));
    }
    //validation for .com  
    validationForDotComSign() {
        const state = (this.inputElement.value.includes('.com')) ? true : false;
        this.errorList.push(new errorObject('emptyvalidation', '.com is missing in your email address', state));
    }
    validate_function() {
        //will erase the current error array so error objects dont overlap
        this.errorList.length = 0;
        this.emptyInputValidater();
        this.validationForAtSign();
        this.validationForDotComSign();
        //if no error is found then it will return false
        const foundError = this.errorList.find((ele) => { return ele.state === false }) ? this.errorList.find((ele) => { return ele.state === false }) : false;
        //calls showError with error_mesaage or empty string
        this.showError(foundError ? foundError.message : '');
    }
}
//creates error objects for error list
class errorObject {
    constructor(name, message, state) {
        this.name = name;
        this.message = message;
        this.state = state;
    }
}
//creates form objects 
class formBox {
    //takes input field objects as parameter
    constructor(form, ...InputBoxes) {
        this.form = form;
        this.inputBoxes = [...InputBoxes];
        this.form.onsubmit = () => { return this.SubmitForm(); }
    }

    //returns false if form is not upto validation
    ValidateForm() {
        this.inputBoxes.forEach(ele => {ele.validate_function()});
        //loops through all input fields in the form
        return this.inputBoxes.every((ele) => {
            //loops through all error for a input field 
            return ele.errorList.every((error) => {
                //returns false if validation is not correct
                return error.state;
            })
        });
    }
}

export { inputBox, passwordInputBoxOutput, emailInputBoxOutput, formBox };
