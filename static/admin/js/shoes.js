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

                const lst = document.getElementById('BrandSelectPatika');
                 data.forEach( el => {

                     lst.innerHTML += `<option><b>ID:</b> ${el.id},<b>Naziv:</b> ${el.naziv}, <b>Datum osnivanja:</b> ${el.datumOsnivanja},
                     <b>Zemlja:</b> ${el.zemlja}, <b>Osnivac:</b> ${el.osnivac}
                     </option>`;
                });
            
        });
        //choose brand select

//dodaj loptu
        document.getElementById('addShoes').addEventListener('click', e => {

            e.preventDefault();
        
            let brand =  document.getElementById('BrandSelectPatika').value;
            const array = brand.split(',');  
            const array2 = array[0].split(':');
            const idBrand = array2[1];

            const data = {
                naziv: document.getElementById('addNazivPatika').value,
                cena: document.getElementById('addCenaPatika').value,
                broj: document.getElementById('addBroj').value,
                tip: document.getElementById('addTip').value,
                opis: document.getElementById('addOpisPatika').value,
                brandId: idBrand
            };
            
            fetch('http://localhost:9100/shoes/addShoes', {
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
                        
                        alert("Uspesno ste dodali patike u bazu podataka!");
                        window.location.reload();
        
                    }
                });
        
        
        });
         //dodaj brand



//lopta select
         fetch('http://localhost:9100/shoes/getShoes', {
        
        })
            .then( res => res.json() )
            .then( data => {
                
    
                    console.log(data);
    
                    const lst = document.getElementById('PatikaSelect');
                     data.forEach( el => {
    
                         lst.innerHTML += `<option><b>ID:</b> ${el.id},<b>Naziv:</b> ${el.naziv}, <b>Cena:</b>${el.cena},
                         <b>Broj:</b> ${el.broj}, <b>Tip:</b> ${el.tip} 
                         </option>`;
                    });
                
            });
       //popuni lopta select




       //choose loptaa


    document.getElementById('choosePatika').addEventListener('click', e => {
        e.preventDefault();
    document.getElementById('deletePatikaButton').disabled = false;
    document.getElementById('updatePatikaBtn').disabled = false;
     
    let s = document.getElementById('PatikaSelect').value;
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

    document.getElementById('updateNazivPatika').value = resenje[0];
    document.getElementById('updateCenaPatika').value = resenje[1];
    });

    //choose lopta





    //obrisi loptu
    document.getElementById('deletePatikaButton').addEventListener('click', e => {
        e.preventDefault();
        
       
        let brand =  document.getElementById('PatikaSelect').value;
        const array = brand.split(',');  
        const array2 = array[0].split(':');
        const idDelete = array2[1];
        
        const data = {
            id: idDelete
        };
        
        console.log(data);

        fetch('http://localhost:9100/shoes/deleteShoes', {
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
                alert("Uspesno ste obrisali patiku iz baze !");
                window.location.reload();
                
            }
        });
    });      

    //obrisi loptu


    //update lopta



document.getElementById('updatePatikaBtn').addEventListener('click', e => {
    e.preventDefault();
   
    let user =  document.getElementById('PatikaSelect').value;
    const array = user.split(',');  
    const array2 = array[0].split(':');
    const idDelete = array2[1];

    console.log(idDelete + " ID DELETE");
    
    const data = {
        id: idDelete,
        naziv:document.getElementById('updateNazivPatika').value,
        cena:document.getElementById('updateCenaPatika').value
    };
    
    console.log(data);
    
    fetch('http://localhost:9100/shoes/updateShoes', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
     })
   
    .then( res => res.json() )
    .then( data => {
        if(data == "True"){
            window.location.reload();
            alert("Uspesno ste izmenili patiku!");
        }
        else{
            alert(data);
        }
    });
});
}