function verifPassword(){
    let password1 = document.getElementById('password1');
    let password2 = document.getElementById('password2');
    if(password1.value == password2.value){
        if(password1.value.length >= 8){
            return true;
        } else {
            document.getElementById('message').innerHTML = 'longueur du mot de passe incorrect';
            return false;
        }
    } else {
        document.getElementById('message').innerHTML = 'les 2 mdp ne correspondent pas';
        return false;
    }
}

function listAge(min,max){
    if(max > min) {
        let liste = document.getElementById('age');
        for(let i=min;i<= max;i++) {
            liste.innerHTML+='<option value="'+i+'">'+i+' ans</option>';
        }
    } else {
        console.log("attention probleme avec la valeur de l'age");
    }
}

function listPays(){
let liste = ['france', 'us'] 
let selectPays = document.getElementById('pays');
for(let i=0;i <liste.length;i++){
    document.getElementById('pays').innerHTML+='<option value="'+liste[i]+'">'+liste[i]+' </option>';
    }
}

function verifLength(element,longueur) {
    let valeur = element.value;
    let booleen = false;
    if(valeur.length >= longueur) {
        booleen = true;
    } else {
        //alert('Ce champ doit contenir'+longueur+' caractères');
        booleen = false;
    }
    //verif la longueure du mdp et on adapte le background en consequence
    switch(valeur.length) {/*switch fait des cases remplace les if, else etc... */ 
    case 6:
        element.style.background = 'red';
        break
    case 8:
        element.style.background = 'orange';
        break
    case 12:
        element.style.background = 'green';
        break
}
    return booleen;
}
//fonction qui genere un mdp
function genereMdp(){
    // chaine de cara pour le mdp
    let caracteres = 'azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN0123456789&é_çà)=';
    // valeur aleatoire entre 0 et 8 pour le mdp
    let long = Math.floor(Math.random()*8);
    // longueuer minimum = 8 cara max 16 cara
    long = 8+long;
    // on instancie notre variables mdp
    let motdepasse = '';
    // genere mdp dans une boucle
    for(i=0;i<=long;i++){
        motdepasse+= caracteres.charAt(Math.floor(Math.random()*caracteres.length));
    }
    document.getElementById('password1').value = motdepasse;
    document.getElementById('password2').value = motdepasse;
}
function voirMdp(){
    document.getElementById('password1').setAttribute('type','text');
    document.getElementById('password2').setAttribute('type','text');
}
function cacherMdp(){
    document.getElementById('password1').setAttribute('type','password');
    document.getElementById('password2').setAttribute('type','password');
}
function affiche5mdp(){
    voirMdp();
    let cache = setTimeout('cacherMdp()', 5000);
}
function clickreclick(){
    let password1 = document.getElementById('password1');
    let password2 = document.getElementById('password2');
    if(password1.getAttribute('type') == 'text' && password2.getAttribute('type') == 'text') {
        cacherMdp();
        document.getElementById('btn-affiche').innerText = 'afficher mot de passe';
    } else {
        voirMdp();
        document.getElementById('btn-affiche').innerText = 'cacher mot de passe';
    }
}
function verifAge(){
    let age = document.getElementById('age');
    if(age.value >= 18){
        document.getElementById('message').innerText = "vous avez l'age necessaire";
        document.getElementById('submit').removeAttribute('disabled');
        document.getElementById('submit').innerText = 'Inscription';
        // changement de l'action du formulaire
        if(age.value < 21){
            document.forms['javascript'].setAttribute('action', 'jeune.php');
        }
        else if(age.value > 40){
            document.forms['javascript'].setAttribute('action', 'vieux.php');
        }
        else{
            document.forms['javascript'].setAttribute('action', 'action.php');
        }
        return true;

    } else {
        document.getElementById('submit').setAttribute('disabled', 'disabled');
        document.getElementById('submit').innerText = 'impossible de valider le formulaire';
        return false;
    }
}
function verifEmail(element){
    let regex = /^[a-z0-9.-]{4,}@+[a-z0-9.-]{4,}.+[a-z]{2,}$/i
    // /^ declare le regex [les cara autorisé] {nbre de cara ex: 2, jusqua infini}  pour signifier la regex $/i
    if(regex.test(element.value)) {
        // la regex est ok
        element.style.background = 'green';
    } else {
        // la regex ne passe pas
        element.style.background = 'red';
    }
}
function verifTel(element){
    let regex = /^[0-9]{10}$/i
    if(regex.test(element.value)) {
        element.style.background = 'green';
    } else {
        element.style.background = 'red';
    }
}

function verifForm(){
    let nom = document.getElementById('nom');
    let prenom = document.getElementById('prenom');
    let email = document.getElementById('email');
    if(nom.value != "" && prenom.value != "" && email.value != "") {
        // si la personne a + de 18 ans
        if (verifAge()) {
            // on verif si les mdp font plus de 8 cara et si ils sont identiques
            if(verifPassword()){
                return true;
            } else {
                // si les mdp sont pas identiques
                return false;
            }
        } else {
            // si la personne est mineur 
            return false;
        }
    } else {
        // si un des champs n'est pas rempli 
        if(nom.value == '') {
            document.getElementById('message').innerText = "veuillez renseignez votre nom";
        }
        else if(prenom.value == '') {
            document.getElementById('message').innerText = "veuillez renseignez votre prenom";
        }
        else if(email.value == '') {
            document.getElementById('message').innerText = "veuillez renseignez votre email";
        }
        return false;    
    }

}

listAge(12,70);
listPays();
verifAge();
(function(){
    let httpRequest;
    document.getElementById('ajax').addEventListener('click',makeRequest);

    function makeRequest() {
        // on instancie XMLHttpRequest
        httpRequest = new XMLHttpRequest();

        if(!httpRequest){
            console.log("erreur lors de la creation de l'instance");
            return false;
        }
        httpRequest.onreadystatechange = traiterRequete;
        httpRequest.open('GET', 'ajax.html');
        httpRequest.send();
    }
    function traiterRequete() {
        if(httpRequest.readystate === XMLHttpRequest.DONE) {
            if(httpRequest.statue === 200) {
                document.getElementById('retour_ajax').innerHTML = httpRequest.responseText;
            } else {
                console.log("erreur avec la requête");
            }
        }
    }
})();