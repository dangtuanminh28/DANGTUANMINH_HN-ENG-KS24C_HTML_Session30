let books = [
    {
        id: 1,
        name: "Chí Phèo",
        price: 20000,
        quantity: 20,
        category: "Truyện ngắn",
    },
    {
        id: 2,
        name: "Tràng giang",
        price: 80000,
        quantity: 21,
        category: "Thơ",
    },
    {
        id: 3,
        name: "Tắt Đèn",
        price: 40000,
        quantity: 15,
        category: "Tiểu thuyết",
    },
    {
        id: 3,
        name: "Vũ Như Tô",
        price: 60000,
        quantity: 30,
        category: "Kịch",
    }
]

let menu = `
1. Hiển thị danh sách sách theo thể loại (Người dùng chọn thể loại để xem sách trong danh mục đó).
2. Thêm sách mới vào kho
3. Tìm kiếm sách theo tên hoặc id.
4. Mua sách (Nhập id sách cần mua và số lượng, cập nhật lại kho).
5. Sắp xếp sách theo giá:
        a. Tăng dần.
        b. Giảm dần.
6. Tính tổng số lượng sách đã mua và in ra tổng tiền trong giỏ hàng
7. Hiển thị tổng số lượng sách trong kho.
8. Thoát chương trình.
`

let choice;
let cart = [];

while (choice !== 8) {
    choice = +prompt(menu)

    switch (choice) {
        case 1:
            displayProductByCategory()
            break;
        case 2:
            addBook()
            break;
        case 3:
            let searchChoice = prompt(`  
                a. Tìm kiếm theo tên.  
                b. Tìm kiếm theo ID.`)

            if (searchChoice === 'a') {
                searchBookByName();
            } else if (searchChoice === 'b') {
                searchBookById()
            } else {
                console.log("Lựa chọn không hợp lệ")
            }
            break;
        case 4:
            buyBook()
            break;
        case 5:
            sortBookByPrice()
            break;
        case 6:
            calculateTotalBook()
            break;
        case 7:
            displayTotalBook()
            break;
        case 8:
            console.log("Thoát chương trình thành công");
            break;
        default:
            console.log("Lựa chọn không hợp lệ")
            break;
    }
}

function displayProductByCategory() {
    let category = prompt("Nhập thể loại sách muốn tìm")
    console.log("Thể loại: " + category);

    let fillterBook = books.filter(function (book, index) {
        return book.category === category
    });
    if (fillterBook.length === 0) {
        console.log("Không có sách nào trong danh mục này")
    } else {
        fillterBook.forEach(function (book, index) {
            console.log(`
                ID: ${book.id}
                Tên: ${book.name} 
                Giá: ${book.price}
                Số lượng: ${book.quantity}
                `);
        });
    }
}

function addBook() {
    let id = Math.floor(Math.random() * 99999 + new Date().getMilliseconds());
    let name = prompt("Nhập tên sách")
    let price = +prompt("Nhập giá sách")
    let quantity = +prompt("Nhập số lượng sách")
    let category = prompt("Nhập thể loại sách")

    if (isNaN(price) || isNaN(quantity)) {
        console.log("Giá và số lượng sách phải là số");
        return;
    }

    let newBook = {
        id: id,
        name: name,
        price: price,
        quantity: quantity,
        category: category
    };
    books.push(newBook);
    console.log("Đã thêm sách vào kho thành công!");
}

function searchBookByName() {
    let name = prompt("Nhập tên sách cần tìm kiếm");
    let results = books.filter(function (book) {
        return book.name.includes(name)
    })
    if (results.length > 0) {
        results.forEach(function (result) {
            console.log(`  
                ID: ${result.id}  
                Tên: ${result.name}   
                Giá: ${result.price} VND  
                Số lượng: ${result.quantity}  
                Thể loại: ${result.category}  
            `);
        });
    } else {
        console.log("Không tìm thấy sách nào với tên đã nhập");
    }
}

function searchBookById() {
    let id = +prompt("Nhập ID sách cần tìm kiếm");
    let result = books.find(function (book) {
        return book.id === id
    })

    if (result) {
        console.log(`  
            ID: ${result.id}  
            Tên: ${result.name}   
            Giá: ${result.price} VND  
            Số lượng: ${result.quantity}  
            Thể loại: ${result.category}  
        `);
    } else {
        console.log("Không tìm thấy sách nào với ID đã nhập");
    }
}

function buyBook() {
    let bookId = +prompt("Nhập Id sách muốn mua")
    let book = books.find(b => b.id === bookId)
    if (!book) {
        console.log("Sách không tồn tại")
        return
    }

    let quantity = +prompt("Nhập số lượng sách cần mua");
    if (quantity > book.quantity || quantity <= 0) {
        console.log("Số lượng sách trong kho không đủ");
    } else {
        console.log("Mua sách thành công!");
        book.quantity -= quantity;
        cart.push({
            id: book.id,
            name: book.name,
            price: book.price,
            quantity: quantity
        });
    }
}

function sortBookByPrice() {
    let order = prompt(`Chọn thứ tự sắp xếp:  
        a. Tăng dần   
        b. Giảm dần`);

    if (order === "a") {
        books.sort(function (a, b) {
            return a.price - b.price;
        });
        console.log("Sách được sắp xếp theo giá tăng dần");
    } else if (order === "b") {
        books.sort(function (a, b) {
            return b.price - a.price;
        });
        console.log("Sách được sắp xếp theo giá giảm dần");
    } else {
        console.log("Thứ tự không hợp lệ");
    }
}

function calculateTotalBook() {
    let total = 0;
    let totalQuantity = 0;
    cart.forEach(function (item) {
        total += item.price * item.quantity;
        totalQuantity += item.quantity;
    });
    console.log("Tổng số lượng sách đã mua: " + totalQuantity);
    console.log("Tổng tiền thanh toán trong giỏ hàng là: " + total);
}

function displayTotalBook() {
    let totalQuantityInStock = 0
    for (let i = 0; i < books.length; i++) {
        totalQuantityInStock += books[i].quantity;
    }
    console.log("Tổng số lượng sách trong kho: " + totalQuantityInStock);
}