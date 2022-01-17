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


    // choose brand select
    fetch('http://localhost:9100/brand/getBrand', {
        
    })
        .then( res => res.json() )
        .then( data => {
            

                console.log(data);

                const lst = document.getElementById('BrandSelectLopta');
                 data.forEach( el => {

                     lst.innerHTML += `<option><b>ID:</b> ${el.id},<b>Naziv:</b> ${el.naziv}, <b>Datum osnivanja:</b> ${el.datumOsnivanja},
                     <b>Zemlja:</b> ${el.zemlja}, <b>Osnivac:</b> ${el.osnivac}
                     </option>`;
                });
            
        });
        //choose brand select

//dodaj loptu
        document.getElementById('addBall').addEventListener('click', e => {

            e.preventDefault();
        
            let brand =  document.getElementById('BrandSelectLopta').value;
            const array = brand.split(',');  
            const array2 = array[0].split(':');
            const idBrand = array2[1];

            const data = {
                naziv: document.getElementById('addNazivLopta').value,
                cena: document.getElementById('addCena').value,
                velicina: document.getElementById('addVelicina').value,
                sport: document.getElementById('addSport').value,
                opis: document.getElementById('addOpis').value,
                brandId: idBrand
            };
            
            fetch('http://localhost:9100/ball/addBall', {
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
                        
                        alert("Uspesno ste dodali loptu u bazu podataka!");
                        window.location.reload();
        
                    }
                });
        
        
        });
         //dodaj brand



//lopta select
         fetch('http://localhost:9100/ball/getBall', {
        
        })
            .then( res => res.json() )
            .then( data => {
                
    
                    console.log(data);
    
                    const lst = document.getElementById('LoptaSelect');
                     data.forEach( el => {
    
                         lst.innerHTML += `<option><b>ID:</b> ${el.id},<b>Naziv:</b> ${el.naziv}, <b>Cena:</b>${el.cena},
                         <b>Velicina:</b> ${el.velicina}, <b>Sport:</b> ${el.sport} 
                         </option>`;
                    });
                
            });
       //popuni lopta select




       //choose loptaa


    document.getElementById('chooseLopta').addEventListener('click', e => {
        e.preventDefault();
    document.getElementById('deleteLoptaButton').disabled = false;
    document.getElementById('updateLoptaBtn').disabled = false;
     
    let s = document.getElementById('LoptaSelect').value;
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

    document.getElementById('updateNazivLopta').value = resenje[0];
    document.getElementById('updateCena').value = resenje[1];
    });

    //choose lopta





    //obrisi loptu
    document.getElementById('deleteLoptaButton').addEventListener('click', e => {
        e.preventDefault();
        
       
        let brand =  document.getElementById('LoptaSelect').value;
        const array = brand.split(',');  
        const array2 = array[0].split(':');
        const idDelete = array2[1];
        
        const data = {
            id: idDelete
        };
        
        console.log(data);

        fetch('http://localhost:9100/ball/deleteBall', {
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
                alert("Uspesno ste obrisali loptu iz baze !");
                window.location.reload();
                
            }
        });
    });      

    //obrisi loptu


    //update lopta



document.getElementById('updateLoptaBtn').addEventListener('click', e => {
    e.preventDefault();
   
    let user =  document.getElementById('LoptaSelect').value;
    const array = user.split(',');  
    const array2 = array[0].split(':');
    const idDelete = array2[1];

    console.log(idDelete + " ID DELETE");
    
    const data = {
        id: idDelete,
        naziv:document.getElementById('updateNazivLopta').value,
        cena:document.getElementById('updateCena').value
    };
    
    console.log(data);
    
    fetch('http://localhost:9100/ball/updateBall', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
     })
   
    .then( res => res.json() )
    .then( data => {
        if(data == "True"){
            window.location.reload();
            alert("Uspesno ste izmenili loptu!");
        }
        else{
            alert(data);
        }
    });
});
}