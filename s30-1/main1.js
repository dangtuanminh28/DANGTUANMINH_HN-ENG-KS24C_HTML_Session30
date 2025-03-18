let product = [
    {
        id: 1,
        name: "mèn mén",
        price: 20000,
        quantity: 20,
        category: "món ăn dân tộc Mông",
    },
    {
        id: 2,
        name: "mứt",
        price: 80000,
        quantity: 21,
        category: "món ăn dân tộc Kinh",
    },
    {
        id: 3,
        name: "cơm lam",
        price: 40000,
        quantity: 15,
        category: "món ăn dân tộc Mông",
    },
    {
        id: 4,
        name: "bánh đậu xanh",
        price: 60000,
        quantity: 30,
        category: "món ăn dân tộc Kinh",
    }
];

let cart = [];

let menu = `
--------Menu--------
1. Hiển thị các sản phẩm theo tên danh mục.
2. Chọn sản phẩm để mua bằng cách nhập id sản phẩm.
3. Sắp xếp các sản phẩm trong cửa hàng theo giá:
4. Tính số tiền thanh toán trong giỏ hàng.
5. Thoát
`;
let choice;
while (choice !== 5) {
    choice = +prompt(menu);
    switch (choice) {
        case 1:
            showProduct();
            break;
        case 2:
            addToCart();
            break;
        case 3:
            arrangeProduct();
            break;
        case 4:
            calculateProduct();
            break;
        case 5:
            console.log("Thoát chương trình");
            break;
        default:
            console.log("Lựa chọn không hợp lệ!");
            break;
    }
}
//Hiển thị sản phẩm theo danh mục
function showByCategory() {
    let category = prompt("Nhập danh mục muốn xem:");
    let result = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    console.log(result.length ? result : "Không tìm thấy danh mục!");
}

//Mua hàng
function buyProduct() {
    let id = +prompt("Nhập ID sản phẩm muốn mua:");
    let product = products.find(p => p.id === id);

    if (!product) return console.log("Sản phẩm không có trong cửa hàng!");
    let quantity = +prompt("Nhập số lượng muốn mua:");

    if (quantity > product.stock) {
        console.log("Không đủ hàng!");
    } else {
        product.stock -= quantity;
        let cartItem = cart.find(c => c.id === id);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            cart.push({ id: product.id, name: product.name, price: product.price, quantity });
        }
        console.log("Thêm vào giỏ hàng thành công!");
    }
}

//Sắp xếp theo giá
function sortByPrice() {
    let order = prompt("Nhập '1' để tăng dần, '2' để giảm dần:");
    let sortedProducts = [...products];

    sortedProducts.sort((a, b) => order === '1' ? a.price - b.price : b.price - a.price);
    console.log(sortedProducts);
}

//Tính tổng tiền trong giỏ hàng
function calculateTotal() {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    console.log(`Tổng tiền phải trả: ${total.toLocaleString()} VND`);
}