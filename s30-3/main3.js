let phones = [
    {
        id: 54321,
        name: "iPhone 17 Pro",
        price: 20000000,
        quantity: 10,
        company: "Apple",
    },
    {
        id: 67890,
        name: "Galaxy Z Fold 6",
        price: 22000000,
        quantity: 7,
        company: "Samsung",
    },
    {
        id: 13579,
        name: "Xiaomi 14 Ultra",
        price: 18000000,
        quantity: 9,
        company: "Xiaomi",
    },
    {
        id: 24680,
        name: "OnePlus 12",
        price: 17000000,
        quantity: 6,
        company: "OnePlus",
    }
];

let menu = `  
1. Hiển thị danh sách điện thoại theo hãng (Người dùng chọn hãng để xem điện thoại trong danh mục đó).  
2. Thêm điện thoại mới vào cửa hàng.  
3. Tìm kiếm điện thoại theo tên hoặc ID.  
4. Mua điện thoại (Nhập ID điện thoại cần mua và số lượng, cập nhật lại kho).  
5. Sắp xếp điện thoại theo giá:  
    a. Tăng dần.  
    b. Giảm dần.  
6. Tính tổng số lượng điện thoại đã mua và in ra tổng tiền trong giỏ hàng.  
7. Hiển thị tổng số lượng điện thoại trong kho.  
8. Thoát chương trình.  
`;

let choice;
let cart = [];

while (choice !== 8) {
    choice = +prompt(menu);

    switch (choice) {
        case 1:
            displayPhonesByCompany();
            break;
        case 2:
            addPhone();
            break;
        case 3:
            let searchChoice = prompt(`  
                a. Tìm kiếm theo tên  
                b. Tìm kiếm theo ID`);

            if (searchChoice === 'a') {
                searchPhoneByName();
            } else if (searchChoice === 'b') {
                searchPhoneById();
            } else {
                console.log("Lựa chọn không hợp lệ");
            }
            break;
        case 4:
            buyPhone();
            break;
        case 5:
            break;
        case 6:
            break;
        case 7:
            break;
        case 8:
            console.log("Thoát chương trình thành công")
            break;
        default:
            console.log("Lựa chọn không hợp lệ")
            break;
    }
}

function displayPhonesByCompany() {
    let company = prompt("Nhập hãng điện thoại muốn tìm")
    console.log("Hãng: " + company);

    let filterPhones = phones.filter(function (phone) {
        return phone.company === company;
    });
    if (filterPhones.length === 0) {
        console.log("Không có điện thoại nào trong hãng này")
    } else {
        filterPhones.forEach(function (phone) {
            console.log(`  
                ID: ${phone.id}  
                Tên: ${phone.name}   
                Giá: ${phone.price} VND  
                Số lượng: ${phone.quantity}  
            `);
        });
    }
}

function addPhone() {
    let id = Math.floor(Math.random() * 99999 + new Date().getMilliseconds())
    let name = prompt("Nhập tên điện thoại")
    let price = +prompt("Nhập giá điện thoại")
    let quantity = +prompt("Nhập số lượng điện thoại")
    let company = prompt("Nhập hãng điện thoại:")

    if (isNaN(price) || isNaN(quantity) || price <= 0 || quantity <= 0) {
        console.log("Giá và số lượng điện thoại phải là số dương.");
        return;
    }

    let newPhone = {
        id: id,
        name: name,
        price: price,
        quantity: quantity,
        company: company
    };
    phones.push(newPhone);
    console.log("Đã thêm điện thoại vào cửa hàng thành công!");
}

function searchPhoneByName() {
    let name = prompt("Nhập tên điện thoại cần tìm kiếm")
    let results = phones.filter(function (phone) {
        return phone.name.includes(name)
    });
    if (results.length > 0) {
        results.forEach(function (result) {
            console.log(`  
                ID: ${result.id}  
                Tên: ${result.name}  
                Giá: ${result.price} VND  
                Số lượng: ${result.quantity}  
                Hãng: ${result.company}  
            `);
        });
    } else {
        console.log("Không tìm thấy điện thoại nào với tên đã nhập");
    }
}

function searchPhoneById() {
    let id = +prompt("Nhập ID điện thoại cần tìm kiếm");
    let result = phones.find(function (phone) {
        return phone.id === id;
    });

    if (result) {
        console.log(`  
            ID: ${result.id}  
            Tên: ${result.name}  
            Giá: ${result.price} VND  
            Số lượng: ${result.quantity}  
            Hãng: ${result.company}  
        `);
    } else {
        console.log("Không tìm thấy điện thoại nào với ID đã nhập");
    }
}

function buyPhone() {
    let phoneId = +prompt("Nhập ID điện thoại muốn mua");
    let phone = phones.find(p => p.id === phoneId);

    if (!phone) {
        console.log("Điện thoại không tồn tại");
        return;
    }
    let quantity = +prompt("Nhập số lượng điện thoại cần mua")
    if (quantity > phone.quantity || quantity <= 0) {
        console.log("Số lượng điện thoại trong kho không đủ")
    } else {
        console.log("Mua điện thoại thành công!")
        phone.quantity -= quantity;
        cart.push({
            id: phone.id,
            name: phone.name,
            price: phone.price,
            quantity: quantity
        });
    }
}