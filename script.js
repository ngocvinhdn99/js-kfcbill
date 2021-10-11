const items = [
    {
        name: 'Pizza Meat Lover Supreme',
        price: 8.9,
        quantity: 1
    },
    {
        name: 'Pizza Shrimp Mayonnaise',
        price: 7.9,
        quantity: 1
    },
    {
        name: 'Pizza Aloha',
        price: 6.9,
        quantity: 1
    }
]

const SHIPPING = 2

function add() {
    items.push({
        name: `Pizza ${Math.ceil(Math.random()*100)}`,
        quantity: 1,
        price: (Math.random() * 10).toFixed(1)
    })

    render()
}

function remove(index) {
    items.splice(index, 1)
    render()
}

function decrease(index) {
    items[index].quantity--
    if(items[index].quantity < 0) {
        items[index].quantity = 0
    }
    
    render()
}

function increase(index) {
    items[index].quantity++
    if(items[index].quantity > 9) {
        items[index].quantity = 9
    }

    render()
}


function render() {
    let subTotal = 0
    items.forEach((item) => {
        subTotal += item.price * item.quantity
    })

    const total = subTotal + SHIPPING

    const html = items.map((item, index) => {
        return `
            <li class="order-item">
                <span class="item-name">${item.name}</span>

                <span class="item-quantity">
                    <button class="dec">-</button>
                    <input type="number" class="quantity" value="${item.quantity}">
                    <button class="inc">+</button>
                </span>

                <span class="item-price">
                    <span>${(item.quantity * item.price).toFixed(1)} $</span>
                    <button class="delete delete-btn">X</button>
                </span>
            </li>
        `
    })

    $('.order-items').innerHTML = html.join('')

    
    const deleteBtns = [...$$('.delete-btn')]
    const decreaseBtns = [...$$('.dec')]
    const increaseBtns = [...$$('.inc')]

    for (let i = 0; i < deleteBtns.length; i++ ) {
        deleteBtns[i].addEventListener('click', () => {
            remove(i)
        })
    }
    
    for (let i = 0; i < decreaseBtns.length ; i++) {
        decreaseBtns[i].addEventListener('click', () => {
            decrease(i)
        })
    }

    for (let i = 0; i < increaseBtns.length ; i++) {
        increaseBtns[i].addEventListener('click', () => {
            increase(i)
        })
    }



    $('#sub-total').innerText = `${subTotal.toFixed(2)} $`
    $('#shipping').innerText = `${SHIPPING.toFixed(2)} $`
    $('#total').innerText = `${total.toFixed(2)} $`

}


$('#add-btn').addEventListener('click', () => {
    add()
})



render()

var order = document.querySelector('.order')
var checkoutBtn = order.querySelector('#checkout-btn')

var goodbye = document.querySelector('.goodbye')
var goodbyeBtn = goodbye.querySelector('.goodbye-btn')

checkoutBtn.addEventListener('click', () => {
    order.style.display = 'none'
    goodbye.style.display = 'block'
})

goodbyeBtn.addEventListener('click', () => {
    order.style.display = 'block'
    goodbye.style.display = 'none'
})