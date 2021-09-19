class growlalert { 
  static  showAlert(message,type){
        const htmlElement = document.createElement('span');
        htmlElement.style.padding = '1rem';
        htmlElement.innerHTML = 'hello';
        htmlElement.style.position = 'absolute';
        htmlElement.style.top = '1rem';
        document.getElementsByTagName('body')[0].appendChild(htmlElement);
    }
}