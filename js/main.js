let selector = document.querySelector ('#tel')
let im = new Inputmask('+7(999) 999-99-99')
im.mask(selector)
let validation = new JustValidate ('form')

validation.addField('#name', [
    {
        rule: 'required',
        errorMassage: 'Enter name!'
    },
    {
        rule: 'minLength',
        value:3,
        errorMassage: 'Minimum 3 characters!'
    }
]).addField('#tel',[
    {
        validator: (value) => {
            const phone = selector.inputmask.unmaskedvalue()
            return Boolean(Number(phone) && phone.length > 0)
        },
        errorMassage: 'Enter phone number'
    },
    {
        validator: (value) => {
            const phone = selector.inputmask.unmaskedvalue()
            return Boolean(Number(phone) && phone.length === 10)
        },
        errorMassage: 'Enter your phone number in full'
    }
]).onSuccess(async function () {
    let data = {
        name: document.getElementById('name').value,
        tel: selector.inputmask.unmaskedvalue()
    }
    let response = await fetch('mail.php', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
    let result = await response.text()

    alert(result)
})