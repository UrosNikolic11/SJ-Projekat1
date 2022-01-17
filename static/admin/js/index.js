
function init(){
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
}