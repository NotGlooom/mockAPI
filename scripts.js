/*const aventuriersLocal = [
    {
        "id": "1",
        "nom": "Oral Schmeler IV",
        "couleur": "#6c6b67",
        "avatar" : "https://picsum.photos/id/76/200"
    },
    {
        "id": "2",
        "nom": "Tad McLaughlin",
        "couleur": "#5d5c62",
        "avatar" : "https://picsum.photos/id/65/200"
    },
    {
        "id": "3",
        "nom": "Matteo Wunsch",
        "couleur": "#454f41",
        "avatar" : "https://picsum.photos/id/64/200"
    },
    {
        "id": "4",
        "nom": "Jack Beahan MD",
        "couleur": "#386b1f",
        "avatar" : "https://picsum.photos/id/22/200"
    }
];*/

/*
Fonction qui à partir
 */

function creerCarte(aventurier){
    $("#aventuriers").append(`
     <li class="card col-3 m-2">
     <div class="card-body">
        <h2 class="card-title h5">${aventurier.name}</h2>
        <div class="card-text">
            <p>AGE : ${aventurier.age}</p>
            <p>ID : ${aventurier.id}</p>
        </div>
       <input type="button" onclick="afficherDetails(${aventurier.id})" class="btn btn-primary" value="Voir détails">
       <input type="button" onclick="supprimer(${aventurier.id})" class="btn btn-primary" value="Supprimer">
     </div>
    </li>`);
}

function creerFormulaire(aventurier){
    $("#aventuriers").append(`
     <li class="card col-3 m-2">
     <div class="card-body">
        <h2 class="card-title h5">${aventurier.id}</h2>
        <div class="card-text">
            <form onsubmit="modifier(${aventurier.id})" action="#" method="post">
            <div class="mb-3">
                <label for="nom-mod" class="form-label">Nom</label>
                <input type="text" class="form-control" id="nom-mod" value="${aventurier.name}" required>
            </div>
            <div class="mb-3">
                <label for="age-mod" class="form-label">Age</label>
                <input type="number" class="form-control" id="age-mod" value="${aventurier.age}" required min="0">
            </div>
            <button type="submit" class="btn btn-primary">Modifier</button>
        </form>
        </div>
       <input type="button" onclick="afficherDetails(${aventurier.id})" class="btn btn-primary" value="Voir détails">
       <input type="button" onclick="supprimer(${aventurier.id})" class="btn btn-primary" value="Supprimer">
     </div>
    </li>`);
}

function afficherDetails(id){
    $("#aventuriers").text("");
    $.getJSON('https://656dcdefbcc5618d3c23fe00.mockapi.io/personne/'+id)
        .done(function(aventuriers){
            creerFormulaire(aventuriers)
        })
        .fail(function (error){
            $('.alert').text(error.status).removeClass('d-none')
        });
}

function modifier(id){
    event.preventDefault();
    const personne = new Personne($('#nom-mod').val(), $('#age-mod').val())

    fetch('https://656dcdefbcc5618d3c23fe00.mockapi.io/personne/'+id, {
        method: 'PUT', // or PATCH
        headers: {'content-type':'application/json'},
        body: JSON.stringify(personne)
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error ("Erreur "+res.status);
    }).then(task => {
        // Do something with updated task
        affichertout()
    }).catch(error => {
        $('.alert').text(error.message).removeClass('d-none');
    })
}

/* localement
aventuriersLocal.forEach(function (aventurier){
    creerCarte(aventurier)
})*/

/*facon JavaScript (sans biblioteque)*/
function affichertout() {
    $("#aventuriers").text("")
    fetch('https://656dcdefbcc5618d3c23fe00.mockapi.io/personne/')
        .then(function (reponse){
            //Un problème s'est produit
            if(!reponse.ok){
                //lancer une expedition (pas de distinction de syntaxe entre exception et erreur)
                throw new Error ("Erreur "+reponse.status);
            }
            return reponse.json();
        })
        .then(function (aventuriers) {
            aventuriers.forEach(function (aventurier) {
                creerCarte(aventurier);
            });
        })
        //attraper et gérer
        .catch(function (erreur) {
            $('.alert').text(erreur.message).removeClass('d-none');
        });
}

affichertout();

function supprimer(id) {
    fetch('https://656dcdefbcc5618d3c23fe00.mockapi.io/personne/'+id, {
        method: 'DELETE',
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error ("Erreur "+res.status);
    }).then(personne => {
        // Do something with deleted task
        affichertout()
    }).catch(error => {
        $('.alert').text(error.message).removeClass('d-none');
    })
}

function Personne(nom = "", age = 0){
    this.name = nom
    this.age = age
}

function ajouter() {
    event.preventDefault();
    const personne = new Personne($('#nom').val(), $('#age').val())

    fetch('https://656dcdefbcc5618d3c23fe00.mockapi.io/personne/', {
        method: 'POST',
        headers: {'content-type':'application/json'},
        // Send your data in the request body as JSON
        body: JSON.stringify(personne)
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error ("Erreur "+res.status);
    }).then(task => {
        affichertout()
        $('#nom').val("")
        $('#age').val(0)
    }).catch(error => {
        $('.alert').text(error.message).removeClass('d-none');
    })
}


/* facon JQuery

$.getJSON('aventuriers_locals.json')
    .done(function(aventuriers){
        aventuriers.forEach(function (aventurier) {
            creerCarte(aventurier)
        });
    })
    .fail(function (error){
        $('.alert').text(error.status).removeClass('d-none')
    });*/



