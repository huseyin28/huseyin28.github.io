$(document).ready(ready)

async function ready() {
    let control = await loginControl();
    if (control) {
        LoadList()
    } else {
        if (await login()) {
            LoadList()
        } else {
            alert('İşlem başarısız lütfen daha sonra tekrar deneyin')
        }
    }
}


function LoadList() {

}

