async function Getir() {
    const ID = $('#pid').val()

    let control = await loginControl();
    if(control){
        getStockCount(ID || 53701)
    }else{
        if(await login()){
            getStockCount(ID || 53701)
        }else{
            alert('İşlem başarısız lütfen daha sonra tekrar deneyin')
        }
    }
}

function getStockCount(pid) {
    $.ajax({
        url: 'https://app.dipendo.com/api/purchase-items/' + pid,
        headers: {
            Authorization: localStorage.getItem('token')
        }
    }).then(response => {
        console.log(response)
        $('#purchaseCount').html(response.purchaseCount+' m');
        $('#stockCount').html(response.stockCount+' m');
        $('#txtPid').html(response.purchaseItemId);
        getOthers(response.product.id, pid)
    }).fail(err => {
        if (err.status == 401) {
            login()
        }
        console.log(err);
    })
}

function getOthers(productId, pid) {
    GetStatu1(productId, pid)
    GetStatu2(productId, pid)
    GetStatu3(productId, pid)
}

function GetStatu1(productId, PurItemId) {
    $.ajax({
        url: `https://app.dipendo.com/api/sale-items?productId=${productId}&status=1&offset=0&limit=1000`,
        headers: { "Authorization": localStorage.getItem('token') }
    }).then(response => {
        let toplam = 0;
        $('#kesilecekler').html('')
        response.forEach(element => {
            if (element.purchaseItem.purchaseItemId == PurItemId) {
                $('#kesilecekler').append(`( ${element.saleCount}m ) ${element.customer.title} <br>`)
                toplam += element.saleCount
            }
        });
        $('#kesileceklerToplam').html(toplam)
    })
}

// Sevke hazırlar statu 2
function GetStatu2(productId, PurItemId) {
    $.ajax({
        url: `https://app.dipendo.com/api/sale-items?productId=${productId}&status=2&offset=0&limit=1000`,
        headers: { "Authorization": localStorage.getItem('token') }
    }).then(response => {
        let toplam = 0;
        $('#bekleyenler').html('')
        response.forEach(element => {
            if (element.purchaseItem.purchaseItemId == PurItemId)
                $('#bekleyenler').append(`( ${element.saleCount}m ) ${element.customer.title} <br>`)
            toplam += element.saleCount
        });
        $('#bekleyenlerToplam').html(toplam)
    })
}

// gönderilenler statu 3
function GetStatu3(productId, PurItemId) {
    $.ajax({
        url: `https://app.dipendo.com/api/sale-items?productId=${productId}&status=3&offset=0&limit=1000`,
        headers: { "Authorization": localStorage.getItem('token') }
    }).then(response => {
        let toplam = 0;
        $('#gonderilenler').html('')
        for (let i = response.length - 1; i >= 0; i--) {
            if (response[i].purchaseItem.purchaseItemId == PurItemId) {
                $('#gonderilenler').append(`( ${response[i].saleCount}m ) ${response[i].customer.title} <br>`)
                toplam += response[i].saleCount
            }
        }
        $('#gonderilenlerToplam').html(toplam)
    })
}