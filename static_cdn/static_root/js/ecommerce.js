$(document).ready(function(){
    //Contact Form Handler
    var contactForm = $(".contact-form");
    var cantactFormMethod = contactForm.attr("method");
    var contactFormEndPoint = contactForm.attr("action");

    function displaySubmitting(submitBtn, defaultText, doSubmit){
        if (doSubmit){
            submitBtn.addClass("disabled");
            submitBtn.html("<i class='fa fa-spin fa-spinner'></i> Sending...");
        } else {
            submitBtn.removeClass("disabled");
            submitBtn.html(defaultText);
        }
    }
    contactForm.submit(function(event){
        event.preventDefault();

        var contactFormSubmitBtn = contactForm.find("[type='submit']");
        var contactFormSubmitBtnTxt = contactFormSubmitBtn.text();

        var contactFormData = contactForm.serialize();
        var thisForm = $(this);
        displaySubmitting(contactFormSubmitBtn, "", true);
        $.ajax({
            method: cantactFormMethod,
            url: contactFormEndPoint,
            data: contactFormData,
            success: function(data){
                contactForm[0].reset();
                $.alert({
                    title: "Success!",
                    content: data.message,
                    theme: "modern",
                });
                setTimeout(function(){
                    displaySubmitting(contactFormSubmitBtn, contactFormSubmitBtnTxt, false)
                }, 500)
            },
            error: function(error){
                var jsonData = error.respnseJson;
                var msg = "";
                $.each(jsonData, function(key, value){
                    msg += key + ": " + value[0].message + "<br/>"
                });
                $.alert({
                    title: "Oops!",
                    content: msg,
                    theme: "modern",
                });
                setTimeout(function(){
                    displaySubmitting(contactFormSubmitBtn, contactFormSubmitBtnTxt, false)
                }, 500)
            }
        })
    });

    //Auto Search
    var searchForm = $(".search-form");
    var searchInput = searchForm.find("[name='q']");
    var typingTimer;
    var typingInterval = 1500;
    var searchBtn = searchForm.find('[type="submit"]');

    searchInput.keyup(function(event){
        clearTimeout();
        typingTimer = setTimeout(performSearch, typingInterval);
    });

    searchInput.keydown(function(event){
        clearTimeout(typingTimer);
    });

    function displaySearching(){
        searchBtn.addClass("disabled");
        searchBtn.html("<i class='fa fa-spin fa-spinner'></i> Searching...");
    }

    function performSearch(){
        displaySearching();
        var query = searchInput.val();
        setTimeout(function(){
            window.location.href='/search/?q=' + query
        }, 1000)
    }

    //Cart + Add item
    var productForm = $(".form-product-ajax");

    function getOwnedProduct(productId, submitSpan){
        var actionEndpoint = '/orders/endpoint/verify/ownership';
        var httpMethod = 'GET';
        var data = {
            product_id: productId
        };
        var isOwner;
        $.ajax({
            url: actionEndpoint,
            method: httpMethod,
            data: data,
            success: function(data){
                if (data.owner){
                    isOwner = true;
                    submitSpan.html("<a class='btn btn-warning' href='/library/'>In Library</a>")
                } else {
                    isOwner = false
                }
            },
            error: function(error){
                console.log(error)
            }
        });
        return isOwner
    }

    $.each(productForm, function(index, object){
       var $this = $(this);
       var isUser = $this.attr('data-user');
       var submitSpan = $this.find('.submit-span');
       var productInput = $this.find("[name='product_id']");
       var productId = productInput.attr('value');
       var productIsDigital = productInput.attr('data-is-digital');
       if (productIsDigital && isUser){
           var isOwned = getOwnedProduct(productId, submitSpan);
       }
    });

    productForm.submit(function(event){
        event.preventDefault();
        var thisForm = $(this);
        var actionEndpoint = thisForm.attr("action");
        var httpMethod = thisForm.attr("method");
        var formData = thisForm.serialize();

        $.ajax({
            url: actionEndpoint,
            method: httpMethod,
            data: formData,
            success: function(data){
                var submitSpan = thisForm.find('.submit-span');
                if (data.added){
                    submitSpan.html("<div class=\"btn-group\"><a class='btn btn-link' href=\"/cart/\">In cart</a><button type=\"submit\" class=\"btn btn-link\">Remove?</button></div>")
                } else {
                    submitSpan.html("<button type='submit' class='btn btn-success'>Add to cart</button>")
                }
                var navbarCount = $(".navbar-cart-count");
                navbarCount.text(data.cartItemCount);
                var currentPath = window.location.href;

                if (currentPath.indexOf("cart") !== -1) {
                    refreshCart()
                }
            },
            error: function(errorData){
                $.alert({
                    title: 'Oops',
                    content: 'An error occurred',
                    theme: 'modern',
                });
            }
        })
    });
    function refreshCart(){
        var cartTable = $('.cart-table');
        var cartBody = cartTable.find('.cart-body');
        var productRows = cartBody.find('.cart-product');
        var currentUrl = window.location.href;

        var refreshCartUrl = '/api/cart/';
        var refreshCartMethod = 'GET';
        var data = {};
        $.ajax({
            url: refreshCartUrl,
            method: refreshCartMethod,
            data: data,
            success: function(data){
                var hiddenCartItemRemoveForm = $('.cart-item-remove-form');
                if (data.products.length > 0){
                    productRows.html(" ");
                    i = data.products.length;
                    $.each(data.products, function(index, value){
                        var newCartItemRemove = hiddenCartItemRemoveForm.clone();
                        newCartItemRemove.css('display', 'block');
                        newCartItemRemove.find('.cart-item-product-id').val(value.id);
                        cartBody.prepend("<tr><th scope=\"row\">" + i + "</th><td><a href='" + value.url + "'>"
                            + value.name + "</a>" + newCartItemRemove.html() + "</td><td>" + value.price + "</td></tr>");
                        i --
                    });
                    cartBody.find('.cart-subtotal').text(data.subtotal);
                    cartBody.find('.cart-total').text(data.total);
                } else {
                    window.location.href = currentUrl;
                }
            },
            error: function(errorData){
                $.alert({
                    title: 'Oops',
                    content: 'An error occurred',
                    theme: 'modern',
                });
            }
        })

    }
});