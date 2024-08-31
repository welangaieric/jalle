document.addEventListener("DOMContentLoaded", function () {

    // Function to grab the query parameter value from the URL
    function getQueryParameter(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Store the value of the "item" query parameter in a variable
    const itemName = getQueryParameter('item');

    // Function to fetch product data
    const fetchData = (itemName) => {
        return new Promise((resolve, reject) => {
            if (itemName) {
                $.ajax({
                    type: 'GET',
                    url: 'https://welangaieric.github.io/jalle/product.json',
                    success: function(result) {
                        
                        if (Array.isArray(result)) {
                            const foundProduct = result.find(item => item.name === itemName);
                            
                            if (foundProduct) {
                                resolve(foundProduct); 
                            } else {
                                reject('Product not found');
                            }
                        } else {
                            reject('Invalid data format, expected an array');
                        }
                    },
                    error: function(err) {
                        reject("An error occurred: " + err);
                    }
                });
            } else {
                reject('Item not found');
            }
        });
    };
    fetchData(itemName)
        .then((product) => {
            console.log(product); 
            let display = $('#checkout')
            let temp = `
                        <div class="row d-flex center">
                            <h2 class="text-black">Product Details</h2>
                        </div>
                        <div class="checkout d-flex jcs aic fd-col">
                            <div class="checkout-header d-flex center">
                                <img src=${product.image} alt=${JSON.stringify(product.name)}>
                            </div>
                             <div class="checkout-body jcs aic g-2 d-flex fd-col ">
                               
                                <div class="row strain d-flex left g-1">
                                    <h3 class="blue">Name:</h3>
                                    <p>${product.name}</p>
                                </div>
                                <div class="row strain d-flex left g-1">
                                    <h3 class="blue">Description:</h3>
                                    <p>${product.description}</p>
                                </div>
                                <div class="row strain d-flex left g-1">
                                    <h3 class="blue">Price:</h3>
                                    <p>${product.price}</p>
                                </div>
                                <form id="shipping-form" class="d-flex fd-col center g-2">
                                    <div class="form__group">
                                        <input type="text" id="name" name="name" required placeholder=" ">
                                        <label for="name">Name</label>
                                    </div>

                                    <div class="form-group">
                                        <input type="radio" id="pickup" name="shippingMethod" value="pickup" required>
                                        <label for="pickup">Pick Up</label>
                                        <input type="radio" id="delivery" name="shippingMethod" value="delivery">
                                        <label for="delivery">Delivery</label>
                                    </div>

                                    <div class="form__group">
                                        <input type="text" id="phone" name="phone" required placeholder=" ">
                                        <label for="phone">Phone</label>
                                    </div>

                                    <div class="form__group">
                                        <input type="text" id="location" name="location" required placeholder=" ">
                                        <label for="location">Location</label>
                                    </div>

                                    <div class="form__group">
                                        <textarea id="additional-info" name="additionalInfo" placeholder=" "></textarea>
                                        <label for="additional-info">Additional Information</label>
                                    </div>

                                    <div class="form__group price-section">
                                        <div class="quantity-container">
                                            <button type="button" id='sub'>-</button>
                                            <input type="number" id="quantity" name="quantity" value="1" min="1" required>
                                            <button type="button" id='add'>+</button>
                                        </div>
                                        <div class="price-container d-flex right">
                                            <p>ksh.</p>
                                            <input type="number" readonly id="price" name="price" value=${product.price}  required>
                                        </div>
                                        
                                    </div>

                                    <button type="submit" class="btn submit">Submit</button>
                                </form>

                            </div>
                        </div>`
            display.html(temp)
            function updateQuantity(change) {
                const quantityInput = document.getElementById('quantity');
                let currentValue = parseInt(quantityInput.value);
                let newValue = currentValue + change;
                if (newValue < 1) {
                    newValue = 1;
                }
                quantityInput.value = newValue;
            }
            $('#add').on('click',()=>updateQuantity(+1))
            $('#sub').on('click',()=>updateQuantity(-1))
            // Additional code to handle the product, e.g., display on the page
        })
        .catch((err) => {
            console.error(err); 
        });

});
