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
                    url: '../product.json',
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
            let temp = `<div class="checkout d-flex center fd-col">
                            <div class="checkout-header d-flex center">
                                <img src=${product.image} alt=${JSON.stringify(product.name)}>
                            </div>
                            <div class="checkout-body d-flex">

                            </div>
                        </div>`
            display.html(temp)
            // Additional code to handle the product, e.g., display on the page
        })
        .catch((err) => {
            console.error(err); 
        });

});
