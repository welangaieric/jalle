document.addEventListener("DOMContentLoaded", function () {
    const adminId ='idxd55a5'
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
                               <div class="acknowledge ">
                                    <p>
                                        Thank you for shopping with us
                                    </p>
                                </div>
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
                                    <p>Ksh.<span id="item_price">${product.price}</span>/=</p>
                                </div>
                                <form id="shipping-form" class="d-flex fd-col center g-2">
                                    <div class="form__group">
                                        <input type="text" id="name" name="name" required placeholder=" ">
                                        <label for="name">Name</label>
                                    </div>
                                        <input type="text" id="item" name="item" hidden value=${JSON.stringify(product.name)} required placeholder=" ">

                                    <div class="form-group">
                                        <input type="radio" id="pickup" name="shippingMethod" value="pickup" required>
                                        <label for="pickup">Pick Up</label>
                                        <input type="radio" checked id="delivery" name="shippingMethod" value="delivery">
                                        <label for="delivery">Delivery</label>
                                    </div>
                                    <div class="form-group">
                                        <p>Addition of Ksh.200 on deliveries done within Turkana county for package less than 1KG. Additional weight costs ksh.400</p>
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
                                            <button type="button" class="quantity-control" id="sub">-</button>
                                            <input type="number" id="quantity" name="quantity" value="1" min="1" required>
                                            <button type="button" class="quantity-control" id="add">+</button>
                                        </div>
                                        <div class="price-container d-flex right">
                                             <div class="display-info d-flex fd-row g-1 ">
                                                <h3 class="d-flex blue fd-col center">Total</h3>
                                                <h5 class="d-flex fd-col center">Ksh.</h5>
                                            </div>
                                                                    
                                            <input type="number" readonly id="price" name="amount" value=${product.price}  required>
                                        </div>
                                        
                                    </div>

                                    <button type="button" class="btn place-order submit">Place Order</button>
                                </form>

                            </div>
                        </div>
                        `
            display.html(temp)
            function updateQuantity(change) {
                const quantityInput = document.getElementById('quantity');
                let currentValue = parseInt(quantityInput.value);
                let newValue = currentValue + change;
                if (newValue < 1) {
                    newValue = 1;
                }
                quantityInput.value = newValue;
                let display = $('#price')
                let price = $('#item_price').html()
                let final = newValue * parseInt(price)
                display.val(final)
            }
            $('#add').on('click',()=>updateQuantity(+1))
            $('#sub').on('click',()=>updateQuantity(-1))
            $('.place-order').on('click',(e)=>{
                const numberRegex = /^\d{10}$/;
                const phone = $('#phone');
                const buyButton = $('#buy');
                const phoneNumber = phone.val();
                if (!numberRegex.test(phoneNumber)) {
                    phone.addClass('error');
                    showSnackbar(`Invalid phone number`);
                }
                else{
                    $('#Shipping-form').on('submit',function(e){
                        e.preventDefault()
                        

                    })
                    const payload = {
                        adminId : adminId,
                        name: $('#name').val(),
                        item:$('#item').val(),
                        shippingMethod: $('input[name="shippingMethod"]:checked').val(),
                        phone: $('#phone').val(),
                        location: $('#location').val(),
                        additionalInfo: $('#additional-info').val(),
                        quantity: $('#quantity').val(),
                        amount: $('#price').val()
                    };
                    makePurchase(payload)
                    showSnackbar(`Payment request has been sent to ${phoneNumber}`)
                }
            })
           
            // Additional code to handle the product, e.g., display on the page
        })
        .catch((err) => {
            console.error(err); 
        });
        

        const serverUrl = 'https://konnektsmartlife.org'

        const makePurchase = async (payload)=>{
            let isRequestSent = false;
            try {
                if (!isRequestSent) {
                const response = await $.ajax({
                    type: 'POST',
                    url: `${serverUrl}/api/hotspot/send/${adminId}`,
                    data: payload,
                });
        
                console.log(response);
        
                if (response.status === 400) {
                    
                    return;
                }
                isRequestSent = true;
                
                await checkOutIDCheck(response.checkOutId,payload);
                                                
            }
            if(isRequestSent==='true')
                window.location.reload();
            } catch (err) {
                showSnackbar(`Cannot Process Request At The Moment`);
            }finally {
                isRequestSent = false;  // Reset the flag after the request is completed
            }  
        }
                
        async function checkOutIDCheck(checkoutId,payload) {
            const pollInterval = 3000; // Poll every 3 seconds (adjust as needed)
            const maxAttempts = 10; // Set a maximum number of attempts
            let attempts = 0;
            let conditionMet = false; // Flag to track whether the condition is met
        
            const checkStatus = async () => {
                try {
                    const response = await $.ajax({
                        type: 'post',
                        url: `${serverUrl}/api/hotspot/check/${checkoutId}/${adminId}`,
                    });
        
                    if (response.result.ResultCode === '0') {
                        // console.log(response);
                        showSnackbar('Payment Verified');
                        await acknowledge(payload); 
                        conditionMet = true; // Set the flag to true when the condition is met
                    } else {
                        console.log(response.result);
                        let data = response.result
                        conditionMet = true;
                        showSnackbar(data.ResultDesc);
                        // Set the flag to true when the condition is met

                    }
                } catch (error) {
                    console.error(error);
                    showSnackbar('Retying');
                        // Set the flag to true when the condition is met
                        
                }
            };
        
            const poll = async () => {
                if (!conditionMet && attempts < maxAttempts) {
                    attempts++;
        
                    await checkStatus();
        
                    // Check again after a delay
                    setTimeout(poll, pollInterval);
                } else {
                    
                        showSnackbar('Cannot Verify Payment');
                    
                }
            };
        
            // Start the polling process
            await poll();
        }
        function showSnackbar(message = '', buttonText = '', event) {

            const snackbar = document.querySelector('.mdc-snackbar');
            document.querySelector('.mdc-snackbar__label')
                .innerHTML = `${message}`;
        
            snackbar.classList.add('show');
            setTimeout(function () {
                snackbar.classList.remove("show");
            }, 6200);
    
        }
        async function acknowledge (payload) {
            try {
                $.ajax({
                    type:'post',
                    url:`${serverUrl}/jalle/acknowledge`,
                    data:payload,
                    success:function(result){
                        if(result.status===200){
                            showSnackbar('Payment Has been recieved. We will call you')
                            $('#acknowledge').addClass('show')
                        }
                    }
                })
            } catch (error) {
                
            }
        }
});
