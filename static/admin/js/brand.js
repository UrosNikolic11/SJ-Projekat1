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






    // choose brand

    document.getElementById('chooseBrand').addEventListener('click', e => {
        e.preventDefault();
    document.getElementById('deleteBrandButton').disabled = false;
    document.getElementById('updateBrandBtn').disabled = false;
     
    let s = document.getElementById('BrandSelect').value;
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

    document.getElementById('updateNaziv').value = resenje[0];
    document.getElementById('updateZemlja').value = resenje[2];
    });

    //choose brand



     //popuni brand select
     fetch('http://localhost:9100/brand/getBrand', {
        
    })
        .then( res => res.json() )
        .then( data => {
            

                console.log(data);

                const lst = document.getElementById('BrandSelect');
                 data.forEach( el => {

                     lst.innerHTML += `<option><b>ID:</b> ${el.id},<b>Naziv:</b> ${el.naziv}, <b>Datum osnivanja:</b> ${el.datumOsnivanja},
                     <b>Zemlja:</b> ${el.zemlja}, <b>Osnivac:</b> ${el.osnivac}
                    
                     
                     
                     </option>`;
                });
            
        });
   //popuni brand select






        //dodaj brand
        document.getElementById('addBrandBtn').addEventListener('click', e => {

            e.preventDefault();
        
            const data = {
                naziv: document.getElementById('addNaziv').value,
                zemlja: document.getElementById('addZemlja').value,
                osnivac: document.getElementById('addOsnivac').value,
                godinaOsnivanja: document.getElementById('addGodinaOsnivanja').value
            };
            
            fetch('http://localhost:9100/brand/addBrand', {
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
                        
                        alert("Uspesno ste dodali brand u bazu podataka!");
                        window.location.reload();
        
                    }
                });
        
        
        });
         //dodaj brand




         //obrisi brand
        document.getElementById('deleteBrandButton').addEventListener('click', e => {
            e.preventDefault();
            
           
            let brand =  document.getElementById('BrandSelect').value;
            const array = brand.split(',');  
            const array2 = array[0].split(':');
            const idDelete = array2[1];
            
            const data = {
                id: idDelete
            };
            
            console.log(data);

            fetch('http://localhost:9100/brand/deleteBrand', {
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
                    alert("Uspesno ste obrisali brand iz baze !");
                    window.location.reload();
                    
                }
            });
        });      
//obrisi brand




//update brand

document.getElementById('updateBrandBtn').addEventListener('click', e => {
    e.preventDefault();
   
    let user =  document.getElementById('BrandSelect').value;
    const array = user.split(',');  
    const array2 = array[0].split(':');
    const idDelete = array2[1];

    console.log(idDelete + " ID DELETE");
    
    const data = {
        id: idDelete,
        naziv:document.getElementById('updateNaziv').value,
        zemlja:document.getElementById('updateZemlja').value
    };
    
    console.log(data);
    
    fetch('http://localhost:9100/brand/updateBrand', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
     })
   
    .then( res => res.json() )
    .then( data => {
        if(data == "True"){
            window.location.reload();
            alert("Uspesno ste izmenili brand!");
        }
        else{
            alert(data);
        }
    });
});
}