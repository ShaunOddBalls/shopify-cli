(document.addEventListener("DOMContentLoaded", ()=>{

    let currentSelectedProds = []

    let design_list = []; 
    function get_designs(){
    var design_list_url = `https://oddballs-data--development.gadget.app/apps/oddballs-data/metaobject?handle=design_list_with_extras`;
    var design_url = `https://oddballs-data--development.gadget.app/apps/oddballs-data/metaobject?handle=design`;

    var params1 = { type: 'GET', url: design_list_url, dataType: 'html' };
    var params2 = { type: 'GET', url: design_url, dataType: 'html' };

            Promise.all([$.ajax(params1), $.ajax(params2)])
            .then(([response1, response2]) => {
            
            const jsonData = JSON.parse(response1);
            const designValue = jsonData[0].node.fields.find(field => field.key === 'list').value;
            const designArray = JSON.parse(designValue);

            const jsonData2 = JSON.parse(response2);
            for(design_id of designArray){
                for(node of jsonData2){
                if(node.node.id == design_id){
                    design_list.push(node)
                }
                }
            }
            })
    
    }
    get_designs();


    const currentFormLoc = document.querySelector("#current-form-loc");
    let currentFormEle
    const choiceList = [];
    const addPair = () =>{
        const checkedInputs = Array.from(document.querySelectorAll(".current-form input:checked"));
        const categoryInput = checkedInputs.find((input)=>{
            return input.classList.contains("category-input")
        })
        const typeInput = checkedInputs.find((input)=>{
            return input.classList.contains("type-input")
        })
        const sizeInput = checkedInputs.find((input)=>{
            return input.classList.contains("size-input")
        })
        let category = (categoryInput.value)
        let type  = (typeInput.value)
        let size = (sizeInput.value)
        const selection = {
            category,
            type,
            size
        }
        choiceList.push(selection);

    }

    const updateFinalUi = () =>{
        console.log(currentSelectedProds)
        const selectedProdsEle = document.getElementById("selected-prods");
        let mensProdEle = document.getElementById("mens-prod")
        let womensProdEle = document.getElementById("womens-prod")
        let kidsProdEle = document.getElementById("kids-prod")
        const mensProds = currentSelectedProds.filter((prod)=>{
            return prod.category == "mens"
        })
        const womensProds = currentSelectedProds.filter((prod)=>{
            return prod.category == "womens"
        })
        const kidsProds = currentSelectedProds.filter((prod)=>{
            return prod.category == "kids"
        })
        if(mensProds.length == 0){
            mensProdEle.style.display = "none"
        }
        if(womensProds.length == 0){
           womensProdEle.style.display = "none"
        }
        if(kidsProds.length == 0){
           kidsProdEle.style.display = "none"
        }      
        const mensChoices = choiceList.filter((choice)=>{
            return choice.category == "mens"
        })
        const womensChoices = choiceList.filter((choice)=>{
            return choice.category == "womens"
        })
        const kidsChoices = choiceList.filter((choice)=>{
            return choice.category == "kids"
        })
        const mensImage = mensProds[0]?.image;
        const mensImageEle = mensProdEle.querySelector("img");
        mensImageEle.src=mensImage;
        const mensSizesEle = document.querySelector("#mens-prod .sizes");
        mensSizesEle.innerHTML = "";
        mensChoices.forEach((choice)=>{
            let size = choice.size
            const tempEle = document.createElement("div");
            tempEle.innerHTML = size
            mensSizesEle.appendChild(tempEle)
        })
        const womensImage = womensProds[0]?.image;
        const womensImageEle = womensProdEle.querySelector("img");
        womensImageEle.src=womensImage
        const womensSizesEle = document.querySelector("#womens-prod .sizes");
        womensSizesEle.innerHTML= ""
        womensChoices.forEach((choice)=>{
            let size = choice.size
            const tempEle = document.createElement("div");
            tempEle.innerHTML = size
            womensSizesEle.appendChild(tempEle)
        })
        const kidsImage = kidsProds[0]?.image;
        const kidsImageEle = kidsProdEle.querySelector("img");
        kidsImageEle.src=kidsImage
        const kidsSizesEle = document.querySelector("#kids-prod .sizes");
        kidsSizesEle.innerHTML = ""
        kidsChoices.forEach((choice)=>{
            let size = choice.size
            const tempEle = document.createElement("div");
            tempEle.innerHTML = size
            kidsSizesEle.appendChild(tempEle)
        })
    }

    const designLoc = document.getElementById("prints-loc");

    const createOption = (matchingDesign,prods) => {
        const imageUrl = matchingDesign.node.fields.find((field)=>{return field.key=="img_url"}).value
        const optionEle = document.createElement('div');
        optionEle.className="w-full rounded-md option-wrapper relative";
        const image = document.createElement("img");
        image.src = imageUrl
        image.className = "w-full absolute top-0 h-full rounded-md left-0";
        const placeholder = document.createElement("div");
        placeholder.style.width="100%"
        placeholder.style.paddingTop="100%"
        optionEle.appendChild(image)
        optionEle.appendChild(placeholder);
        designLoc.appendChild(optionEle)
        optionEle.addEventListener("click", ()=>{
            currentSelectedProds = prods;
            updateFinalUi();
        })

    }
    const createOptions = (data) =>{
        let prodFound = false
        Object.entries(data).forEach(([prodDesign, prods]) => {
            const matchingDesign = design_list.find((design)=>{
                return design.node.fields.find((field)=>{return field.key=="tag"}).value == prodDesign.replace("design-", "");
            })
            if(matchingDesign){
                if(!prodFound){
                    currentSelectedProds = prods
                    prodFound = true;
                }
                createOption(matchingDesign,prods)
            }
        });
        updateFinalUi();

    } 
    const getMatches = async () => {
          try {
            const res = await fetch("https://oddballs-data--development.gadget.app/apps/oddballs-data/matching-pyjamas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ choices: choiceList })
            });

            if (!res.ok) {
            throw new Error(`Request failed: ${res.status}`);
            }

            const data = await res.json();
            createOptions(data)
        } catch (err) {
            console.error("Error sending choices:", err);
        }
    
    }
    const deleteForm = () => {
        currentFormEle.remove();
    }
    const createForm = () => {
        const formTemplate = document.querySelector('.section-template');
        const formClone = formTemplate.cloneNode(true);
        formClone.classList.add("current-form")
        currentFormEle = formClone;
        formClone.style.display="block";
        formClone.classList.remove("section-template");
        const cloneInputs = Array.from(formClone.querySelectorAll("input"))
        cloneInputs.forEach((input)=>{
            input.name = input.name + "-for-realsies";
        })

        currentFormLoc.appendChild(formClone)
        
    }
    const addPairjamasToCart = () => {
        let prodsToAdd = []
        console.log(currentSelectedProds);
        console.log(choiceList);
        choiceList.forEach((choice)=>{
            let matchingProd = currentSelectedProds.find((prod)=>{
                return prod.category = choice.category && prod.variants[0].title == choice.size;
            })
            prodsToAdd.push(matchingProd);
        })
            for(product of prodsToAdd){
              const form = document.createElement('form');
                form.method = 'post';
                form.action = '/cart/add';
                form.id = `product-form-${product.id}`;
                form.acceptCharset = 'UTF-8';
                form.classList.add('flex', 'h-full', 'flex-col', 'border-t', 'bg-white', 'product-form', "hidden");
                form.enctype = 'multipart/form-data';
                form.setAttribute('data-product-id', product.id);
                form.setAttribute('novalidate', 'novalidate');
                form.setAttribute('data-type', 'add-to-cart-form');
                const hiddenInputs = [
                    { name: 'form_type', value: 'product' },
                    { name: 'utf8', value: '✓' },
                    { name: 'id', value: product.variants[0].id, class: 'product-selected-variant-id', 'data-product-id': product.id },
                    { name: 'quantity', value: '1', class: 'product__quantity', id: 'qty-template--16162885926973__main' },
                    { name: 'attributes[_freeshp]', value: '' },
                    { name: 'properties[_co]', value: '{{ settings.mutlibuy_variant | json }}' },
                    { name: 'product-id', value: product.id },
                    { name: 'properties[_Perfect Pairjamas]', value: product.id }
                ];
                hiddenInputs.forEach(inputData => {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = inputData.name;
                    input.value = inputData.value;
                    if (inputData.class) input.classList.add(inputData.class);
                    if (inputData.id) input.id = inputData.id;
                    if (inputData['data-product-id']) input.setAttribute('data-product-id', inputData['data-product-id']);
                    
                    form.appendChild(input);
                });
                  const atcButton = document.createElement('button');
                  atcButton.type = 'submit';
                  atcButton.classList.add('add-to-cart-button', 'hidden');
                  form.appendChild(atcButton);
                  const prodData = document.createElement('input');
                  prodData.classList.add("js-prod-data")
                  prodData.value = JSON.stringify(product.product);
                  prodData.setAttribute("type", "hidden");
                  prodData.id = "product-json-" + product.prodId;
                  form.append(prodData);
                  form.addEventListener('submit', function(event) {
                      event.preventDefault();
                  });

        document.getElementById("form-loc").append(form);
        
      }

      addFormsToCart(0)

    }

    async function addFormsToCart(index) {
          const forms = document.querySelectorAll('#match-balls-form-container .product-form');
          for (let form of forms) {
              const addToCartButton = form.querySelector('.add-to-cart-button');
              addToCartButton.click();
              await ppAddToCart(form, form.querySelector('.product-selected-variant-id').value);
          }
       document.querySelector('#add-match-to-cart').innerHTML = "Add To Cart";
    }

function ppAddToCart(form, currentVariant) {
    return new Promise((resolve, reject) => {
        const productData = JSON.parse(form.querySelector('.js-prod-data').value);

        const formData = new FormData(form);
        const dataString = new URLSearchParams(formData).toString();
        fetch('/cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
            body: dataString,
        })
        .then(response => {
            console.log('Cart add response:', response);
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then((json) => {
                    throw new Error(json.description || 'Failed to add to cart');
                });
            }
        })
        .then(cartItem => {
            console.log('Item added to cart:', cartItem);
            const event = new CustomEvent('itemAddedToCart', {
                detail: {
                    variant: currentVariant,
                    product: productData,
                    formData: formData,
                },
            });
            document.dispatchEvent(event);
            const quantityDiv = document.getElementById("cart-items-number");
            const resetRevent = new CustomEvent('revertToCart');
            document.dispatchEvent(resetRevent);

            const cartevent = new CustomEvent('updateCart');
            document.dispatchEvent(cartevent);

            resolve(cartItem); // Resolve the promise when item is successfully added
        })
        .catch(error => {
            console.error('ATC: Error adding to cart:', error);
            reject(error); // Reject the promise if there's an error
        });
    });
}

    document.addEventListener("click", (e)=>{
        if(e.target.closest("#add-pairjamas-to-cart")){
            addPairjamasToCart()
        }
        if(e.target.closest(".add-another-cta")){
            addPair()
            deleteForm()
            createForm()
        }
        if(e.target.closest(".find-pairs-cta")){
            addPair()
            // deleteForm()
            getMatches()
        }
    })
    createForm();
}))