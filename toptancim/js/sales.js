let token = null;
let statusText = {
    '0' : 'Onay Bekliyor',
    '1' : 'Hazırlanıyor',
    '2' : 'Yolda',
    '3' : 'Teslim Edildi',
    '4' : 'Teslim Edilemedi',
    '5' : 'İptal Edildi'
}
let statusColors = {
    '0' : 'warning',
    '1' : 'warning',
    '2' : 'primary',
    '3' : 'success',
    '4' : 'danger',
    '5' : 'danger'
}

var formattedOutput = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
});

$(document).ready(ready)

function ready() {
    getSales();
}

function getSales() {
    $.ajax({
        url: ' http://210135.site/api/v2.php/[getSupplierOrderGroup]',
        type: 'POST',
        data: {
            'token':  localStorage.getItem("token"),
            'status': 2
        },
        success: response => {
            parseResponse = JSON.parse(response)
            if(parseResponse.data.token && parseResponse.data.token == "Invalid")
                location.assign('/login.html')
            else
                createOrders(parseResponse.data.orders);
        }
    })
}

function createOrders(data) {
    $('#Sales').html('')
    data.forEach(element => {
        $('#Sales').append(getHtml(element))
    });
}

function getHtml(order) {
    let itemsHTML = ''
    order.items.forEach(element => {
        itemsHTML += `<div class="row">
                        <div class="col-6 text-left">${element.item_name}</div>
                        <div class="col-2 text-right">${element.quantity}</div>
                        <div class="col-4 text-right">${formattedOutput.format(element.price)}</div>
                    </div>`
    })

    return `<div class="col">
                <div class="card mb-4 rounded-3 shadow-sm border-${statusColors[order.status]}">
                    <div class="card-header py-3 text-bg-primary border-primary">
                        <h4 class="my-0 fw-normal"><b>${order.customer.name}</b></h4>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title pricing-card-title">Sipariş No: ${order.order.order_id}</h5>
                        <h6 class="card-title pricing-card-title">Durumu: ${statusText[order.status]}</h6>
                        <hr>
                        <div>
                            ${itemsHTML}
                            <div class="row">
                                <div class="col-8 text-right"><b>TOPLAM</b></div>
                                <div class="col-4 text-right">${formattedOutput.format(order.order.total)}</div>
                            </div>
                        </div>
                        <button type="button" class="w-100 btn btn-lg btn-outline-primary" onclick="OrderDetail(${order.id})">Detay</button>
                    </div>
                </div>
            </div>`;
}

function OrderDetail(orderID, modalShow = true) {
    $.ajax({
        url: ' http://210135.site/api/v2.php/[getCustomerOrderDetail2]',
        type: 'POST',
        data: {
            'token': localStorage.getItem("token"),
            'id': orderID
        },
        success: response => {
            response = JSON.parse(response)
            order = response.data.orderItem
            $('#modalOrder #orderTitle').html(`${order.customer.name} <small>( ${order.order.order_id} )</small>`);
            $('#modalOrder #order_id').html(`${order.order.order_id}`);
            $('#modalOrder #status').html(`${statusText[order.status]} ${order.status == "5" ? '<small>('+order.cancel_message+')</small>' : ''}`);
            $('#modalOrder #address').html(`${order.deliveryAddress.address} ${order.deliveryAddress.district}/${order.deliveryAddress.city}`);
            $('#modalOrder #kargo_firma').html(`${order.kargo_firma || ''}`);
            $('#modalOrder #shipment_number').html(`${order.shipment_number || ''}`);

            let sum = 0;
            $('#items').html('')
            for (let i = 0; i < order.items.length; i++) {
                const element = order.items[i];
                $('#items').append(`<tr>
                    <td>${element.item_name}</td>
                    <td>${element.quantity}</td>
                    <td>${formattedOutput.format(element.price)}</td>
                </tr>`)
                sum += element.quantity * element.price;
            }
            $('#items').append(`<tr><td></td><td><b>TOPLAM</b></td><td><b>${formattedOutput.format(sum)}₺</b></td></tr>`)


            let buttons = '';
            if(order.status == "0"){
                buttons += `<button type="button" class="float-left btn btn-success" onclick="setStatu('submit',${order.id})">Onayla</button>`
                buttons += `<button type="button" class="float-left btn btn-danger" onclick="setStatu('cancel',${order.id})">İptal et</button>`
            }else if(order.status == "1"){
                buttons += `<button type="button" class="float-left btn btn-success" onclick="setStatu('on-shipment',${order.id})">Kargoya Verildi</button>`
                buttons += `<button type="button" class="float-left btn btn-danger" onclick="setStatu('cancel',${order.id})">İptal Et</button>`
            }else if(order.status == "2"){
                buttons += `<button type="button" class="float-left btn btn-secondary" onclick="updateShipmentNumber(${order.id},${order.order_id})">Kargo Bilgisi</button>`
                buttons += `<button type="button" class="float-left btn btn-success" onclick="setStatu('complete',${order.id})">Teslim Edildi</button>`
                buttons += `<button type="button" class="float-left btn btn-danger" onclick="setStatu('no-pickup',${order.id})">Teslim Edilemedi</button>`
                buttons += `<button type="button" class="float-left btn btn-danger" onclick="setStatu('cancel',${order.id})">İptal Et</button>`
            }else if(order.status == "4"){
                buttons += `<button type="button" class="float-left btn btn-success" onclick="setStatu('on-shipment',${order.id})">Tekrar Kargola</button>`
                buttons += `<button type="button" class="float-left btn btn-danger" onclick="setStatu('cancel',${order.id})">İptal Et</button>`
            }else if(order.status == "5"){
                buttons += `<button type="button" class="float-left btn btn-success" onclick="setStatu('submit',${order.id})">Tekrarla</button>`
            }
            $('#modalOrder .modal-footer').html(buttons);
        }
    })
    if(modalShow)
    $   ('#modalOrder').modal('show')
}

function updateShipmentNumber(id,order_id){
    let data = {
        'token': localStorage.getItem("token"),
        'id': order_id,
    }
    data.kargo_firma = prompt("Kargo firmasını yazınız");
    data.number = prompt("Takip numarasını yazınız");
    $.ajax({
        url: ' http://210135.site/api/v2.php/[updateShipmentNumber]',
        type: 'POST',
        data: data,
        dataType : "JSON",
        success : response => {
            if(response.success){
                OrderDetail(id,false)
                alert('İşlem başarılı')
            }else{
                alert(response.message)
            }
        }
    });
}

function setStatu(statu, id){
    let data = {
        'token': localStorage.getItem("token"),
        'id': id,
        'action' : statu,
    }
    if(statu == "cancel")
        data.text = prompt("Lütfen iptal sebebini giriniz:");

    $.ajax({
        url: ' http://210135.site/api/v2.php/[setOrderItemStatus]',
        type: 'POST',
        data: data,
        success : response => {
            response = JSON.parse(response)
            if(response.success == true && response.message == "OK"){
                OrderDetail(id,false)
                getSales()
            }
        }
    });
}