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
listAge(12,70);