
document.addEventListener("DOMContentLoaded", function() {
    const addToCartBtn = document.querySelector(".btn");
    if (!addToCartBtn) return; 

    const productName = document.querySelector(".col-2 h1").textContent;
    const productPrice = parseFloat(document.querySelector(".col-2 h4").textContent.replace('$', ''));
    const productImg = document.getElementById("ProductImg").src;
    const qtyInput = document.querySelector(".col-2 input");

    addToCartBtn.addEventListener("click", function(e) {
        e.preventDefault();

        const quantity = parseInt(qtyInput.value);
        const product = {
            name: productName,
            price: productPrice,
            quantity: quantity,
            img: productImg
        };

      
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

       
        const existing = cart.find(item => item.name === product.name);
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart!");
    });
});



document.addEventListener("DOMContentLoaded", function() {
    const cartTableBody = document.querySelector("#cartTable tbody");
    const cartTotal = document.getElementById("cartTotal");
    const checkoutBtn = document.getElementById("checkoutBtn");

    if (!cartTableBody || !checkoutBtn) return; 

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {
        cartTableBody.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const row = document.createElement("tr");
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            row.innerHTML = `
                <td><img src="${item.img}" width="50"></td>
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td><input type="number" value="${item.quantity}" min="1" class="qtyInput" data-index="${index}"></td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button class="removeBtn" data-index="${index}">Remove</button></td>
            `;
            cartTableBody.appendChild(row);
        });

        cartTotal.textContent = "Total: $" + total.toFixed(2);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    
    cartTableBody.addEventListener("change", (e) => {
        if (e.target.classList.contains("qtyInput")) {
            const index = e.target.dataset.index;
            const newQty = parseInt(e.target.value);
            cart[index].quantity = newQty;
            renderCart();
        }
    });

   
    cartTableBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("removeBtn")) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            renderCart();
        }
    });

    
    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        alert("Checked out successfully!");
        localStorage.removeItem("cart");
        renderCart();
    });

    renderCart();
});
