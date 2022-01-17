function init() {
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];
    if(token == null || token == ""){
        window.location.replace("/admin/login");
    }


    document.getElementById('logout').addEventListener('click', e => {
        e.preventDefault();
        document.cookie = `token=;SameSite=Lax`;
        window.location.replace("/admin/login");
    });

    //CHOSE BTN
    document.getElementById('choose').addEventListener('click', e => {
        e.preventDefault();
    document.getElementById('deleteUserButton').disabled = false;
    document.getElementById('updateBtn').disabled = false;
     
    let s = document.getElementById('UserSelect').value;
    const array = s.split(',');
    console.log(array);
    const resenje = [];
    let jedan = array[1].split(':');
    resenje[0] = jedan[1];
    let dva = array[2].split(':');
    resenje[1] = dva[1];
    let tri = array[3].split(':');
    resenje[2] = tri[1];
    let cetri = array[4].split(':');
    resenje[3] = cetri[1];

    document.getElementById('updateIme').value = resenje[0];
    document.getElementById('updatePrezime').value = resenje[1];
    document.getElementById('updateUsername').value = resenje[2];
    document.getElementById('updateEmail').value = resenje[3];
    });
 //CHOSE BTN






   //popuni korisnike select
    fetch('http://localhost:9100/user/getUser', {
        
    })
        .then( res => res.json() )
        .then( data => {
            

                console.log(data);

                const lst = document.getElementById('UserSelect');
                 data.forEach( el => {

                let admin = 'moderator';
                if(el.admin == 1){
                    admin = 'admin';
                }

                     lst.innerHTML += `<option><b>ID:</b> ${el.id},<b>Ime:</b> ${el.ime}, <b>Prezime:</b> ${el.prezime},
                     <b>Username:</b> ${el.username}, <b>E-mail:</b> ${el.email},
                     <b>Role:</b> ${admin}
                     
                     
                     </option>`;
                });
            
        });
   //popuni korisnike select




        //dodaj korisnika
   document.getElementById('addBtn').addEventListener('click', e => {

    e.preventDefault();

    const data = {
        ime: document.getElementById('addIme').value,
        prezime: document.getElementById('addPrezime').value,
        username: document.getElementById('addUsername').value,
        password: document.getElementById('addPassword').value,
        email: document.getElementById('addEmail').value,
        admin: document.getElementById('addAdmin').value
    };

    fetch('http://localhost:9100/user/addUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then( res => {


            if (res.status == 500) {
                alert("Nuspesno dodavanje u bazu!");
            }
            else if (res.status == 400) {
                alert("Wrong password!");
            }
            else {
                console.log("AAAAAAAAAAAAA");
                alert("Uspesno ste dodali korisnika u bazu podataka!");
                window.location.reload();

            }
        });


});
 //dodaj korisnika





//obrisi korisnika
        document.getElementById('deleteUserButton').addEventListener('click', e => {
            e.preventDefault();
            console.log('usao');
           
            let user =  document.getElementById('UserSelect').value;
            const array = user.split(',');  
            const array2 = array[0].split(':');
            const idDelete = array2[1];
            
            const data = {
                id: idDelete
            };
            
            console.log(data);

            fetch('http://localhost:9100/user/deleteUser', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
             })
            .then( res => {
                
                
                if (res.status == 500) {
                    alert("Nuspesno dodavanje u bazu!");
                }
                else if (res.status == 400) {
                    alert("Wrong password!");
                }
                else {
                    alert("Uspesno ste obrisali korisnika iz baze !");
                    window.location.reload();
                    
                }
            });
        });      
//obrisi korisnika






//update korisnika

document.getElementById('updateBtn').addEventListener('click', e => {
    e.preventDefault();
   
    let user =  document.getElementById('UserSelect').value;
    const array = user.split(',');  
    const array2 = array[0].split(':');
    const idDelete = array2[1];

    console.log(idDelete + " ID DELETE");
    
    const data = {
        id: idDelete,
        ime:document.getElementById('updateIme').value,
        prezime:document.getElementById('updatePrezime').value,
        email:document.getElementById('updateEmail').value.replace(/\s/g, ''),
        username:document.getElementById('updateUsername').value,
    };
    
    console.log(data);
    
    fetch('http://localhost:9100/user/updateUser', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
     })
   
    .then( res => res.json() )
    .then( data => {
        if(data == "True"){
            window.location.reload();
            alert("Uspesno ste izmenili korisnika!");
        }
        else{
            alert(data);
        }
    });
});

}