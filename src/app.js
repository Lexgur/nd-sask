const url = 'https://in3.dev/inv/';
let items = []; // priskyrimas tik dėl tipo deklaravimo. Deklaravimas tik dėl aiškumo.
let sask = null; // null reiškia, kad dar nepasibaigė užklausa į serverį

fetch(url)
    .then(response => response.json())
    .then(data => {
        sask = data;
        renderSeller(sask);
        renderBuyer(sask);
        renderItems(sask);
        init(sask);
        getTotalAmountCount(sask);
        getTotalDiscount(sask);
        getWithoutPvm(sask);
        getPvmValue(sask);
        getFinalSum(sask);
    });

    
    const init = sask => {
        document.querySelector('[data-number]').innerText = sask.number;
        document.querySelector('[data-date]').innerText = sask.date;
        document.querySelector('[data-due-date]').innerText = sask.due_date;
        document.querySelector('[data-shipping-price]').innerText = `Transportavimo kaina: ${sask.shippingPrice} €`;
    }

    

const renderSeller = sask => {
    const ul = document.querySelector('[data-comp-seller]');
    const companyTemplate = document.querySelector('[data-company-template]');
    const div = companyTemplate.content.cloneNode(true);
    const seller = sask.company.seller;

    const name = div.querySelector('[data-company-name]');
    const address = div.querySelector('[data-company-address]');
    const code = div.querySelector('[data-company-code]');
    const vat = div.querySelector('[data-company-vat]');
    const phone = div.querySelector('[data-company-phone]');
    const email = div.querySelector('[data-company-email]');

    name.innerText = seller.name;
    address.innerText = seller.address;
    code.innerText = seller.code;
    vat.innerText = seller.vat;
    phone.innerText = seller.phone;
    email.innerText = seller.email;

    ul.appendChild(div);
}

const renderBuyer = sask => {
    const ul = document.querySelector('[data-comp-buyer]');
    const companyTemplate = document.querySelector('[data-company-template]');
    const div = companyTemplate.content.cloneNode(true);
    const buyer = sask.company.buyer;

    const name = div.querySelector('[data-company-name]');
    const address = div.querySelector('[data-company-address]');
    const code = div.querySelector('[data-company-code]');
    const vat = div.querySelector('[data-company-vat]');
    const phone = div.querySelector('[data-company-phone]');
    const email = div.querySelector('[data-company-email]');

    name.innerText = buyer.name;
    address.innerText = buyer.address;
    code.innerText = buyer.code;
    vat.innerText = buyer.vat;
    phone.innerText = buyer.phone;
    email.innerText = buyer.email;

    ul.appendChild(div);
}

const renderItems = sask => {
    const table = document.querySelector('[data-items]');  
    const itemTemplate = document.querySelector('[data-item-template]');  

    let items = sask.items;  
    const itemsSorted = items.sort((a, b) => a.price - b.price);  

    
    itemsSorted.forEach((item, index) => {
        const td = itemTemplate.content.cloneNode(true); 
        const counting = td.querySelector('[data-item-count]');
        const description = td.querySelector('[data-item-description]');
        const quantity = td.querySelector('[data-item-quantity]');
        const price = td.querySelector('[data-item-price]');
        const discount = td.querySelector('[data-item-discount]');

        counting.innerText = index + 1;
        description.innerText = item.description;
        quantity.innerText = item.quantity;
        price.innerText = `${item.price} €`;

        let discountText = '';
        
        if (item.discount && typeof item.discount === 'object' && Object.keys(item.discount).length > 0) {
                if (item.discount.type === "fixed") {
                    discountText = `- ${item.discount.value}€`;
                } else if (item.discount.type === "percentage") {
                    discountText = `- ${item.discount.value}%`;
                }
            discount.innerText = discountText;
        } else {
            discount.innerText = 'Be nuolaidų';
        }
        const tr = document.createElement('tr');
        tr.appendChild(td);
        table.appendChild(tr);  
    });
    
};

const getTotalAmountCount = sask => {
    document.querySelector('[data-total-count]').innerText = sask.items
        .map(item => item.quantity)
        .reduce((count, quantity) => count + quantity, 0);
    }

    let totalDiscount = 0;

const getTotalDiscount = sask => {
    totalDiscount = sask.items.reduce((total, item) => {
        let discountAmount = 0;
        if (item.discount && typeof item.discount === 'object' && Object.keys(item.discount).length > 0) {
            if (item.discount.type === 'fixed') {
                discountAmount = item.discount.value;
            } else if (item.discount.type === 'percentage') {
                discountAmount = (item.price * item.discount.value) / 100;
            }
        }
        return total + discountAmount;
    }, 0);

    document.querySelector('[data-total-discount]').innerText = totalDiscount.toFixed(2);
};

const getWithoutPvm = sask => {
    const withoutPvmValue = sask.items
        .map(item => item.price * item.quantity)
        .reduce((count, price) => count + price, 0);

    document.querySelector('[data-without-pvm]').innerText = withoutPvmValue.toFixed(2);
    return withoutPvmValue;
};

const getPvmValue = withoutPvmValue => {
    const pvmValue = (withoutPvmValue * 21) / 100;
    document.querySelector('[data-pvm]').innerText = pvmValue.toFixed(2);
    return pvmValue;
};

const getFinalSum = sask => {
    const withoutPvmValue = getWithoutPvm(sask);
    const pvmValue = getPvmValue(withoutPvmValue);
    const finalSum = withoutPvmValue - totalDiscount + pvmValue;
    document.querySelector('[data-with-pvm]').innerText = finalSum.toFixed(2);
};
