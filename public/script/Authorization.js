function login() {
    let rt = false;
    $.ajax({
        type: "POST",
        async: false,
        url: 'https://app.dipendo.com/oauth/token',
        data: { "username": "huseyinyilmaz@celsancelik.com", "password": "asdasd528", "grant_type": "password", "client_id": "DipendoWeb" },
        success: response => {
            localStorage.setItem('token', response.token_type + ' ' + response.access_token);
            rt = true
        }
    })
    return rt
}

function loginControl() {
    let rt = false;
    $.ajax({
        async: false,
        url: 'https://app.dipendo.com/api/product-groups?offset=0&limit=10000&isActive=true',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        success: response => {
            rt = true
        }
    })
    return rt
}