(document.addEventListener("DOMContentLoaded", ()=>{

    let currentSelectedProds = []
    let currentSelectedDesign;
    const firstStage = document.getElementById("inital-stage");
    const finalStage = document.getElementById("final-stage")
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
    let choiceList = [];
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
            size,
            swapped : false
        }
        choiceList.push(selection);

    }

    const swapChoice = (cat, len) =>{
          choiceList = choiceList.map((choice) => {
            if (choice.category === cat && choice.type === len) {
            return {
                ...choice,
                isSwapped: !choice.isSwapped
            };
            }
            return choice;
        });
        updateFinalUi();
    }

    const updateFinalUi = () => {
        const currentDesignEle = document.getElementById("current-design-name");
        currentDesignEle.innerHTML = currentSelectedDesign;

        const categories = ["mens", "womens", "kids"];
        const lengths = ["short", "long"];

        categories.forEach((cat) => {
            lengths.forEach((len) => {
            const prodEle = document.getElementById(`${cat}-prod-${len}`);
            if (!prodEle) return; 
            const prods = currentSelectedProds.filter(
                (prod) => prod.category === cat && prod.length === len
            );
            
            if (prods.length === 0) {
                prodEle.style.display = "none";
                return;
            }
            console.log(prods)
            
            
            prodEle.style.display = "block";
            const choices = choiceList.filter(
                (choice) => choice.category === cat && choice.type === len
            );
            const hasDifferentStyles = prods.some((prod)=>{
                return prod.isButtonUp
            }) &&   prods.some((prod)=>{
                return !prod.isButtonUp
            })
            let prodToUse = !hasDifferentStyles || !choices[0].isSwapped ? prods.find((prod)=>{
                return !prod.isButtonUp
            }) : prods.find((prod)=>{
                return prod.isButtonUp
            })
            console.log(choices)

            const price = prodToUse?.variants[0]?.price || 0;
            const compPrice = prodToUse?.variants[0]?.compare_at_price || 0;
            const priceEle = prodEle.querySelector(".prod-price");
            const compPriceEle = prodEle.querySelector(".comp-price");
            if (priceEle) priceEle.innerHTML = price;
            if (compPriceEle)
                compPriceEle.innerHTML = compPrice == price ? "" : compPrice;

            const imgEle = prodEle.querySelector("img");
            if (imgEle) imgEle.src = prodToUse?.image || "";
            choiceEle = prodEle.querySelector('.swap-div')
            choiceEle.innerHTML = ""
            if(hasDifferentStyles){
                const innerSwapDiv = document.createElement("div");
                innerSwapDiv.innerHTML = "also available in a different style"
                choiceEle.appendChild(innerSwapDiv); 
                innerSwapDiv.addEventListener("click", ()=>{
                    swapChoice(cat, len)
                })
            }

            const sizesEle = prodEle.querySelector(".sizes");
            if (sizesEle) {
                sizesEle.innerHTML = "";
                choices.forEach((choice) => {
                    const tempEle = document.createElement("div");
                    tempEle.innerHTML = choice.size;
                    sizesEle.appendChild(tempEle);
                });
            }
            });
        });
        };

    const designLoc = document.getElementById("prints-loc");

    const createOption = (matchingDesign,prods) => {
        const imageUrl = matchingDesign.node.fields.find((field)=>{return field.key=="img_url"}).value
        const designName = matchingDesign.node.fields.find((field)=>{return field.key=="tag"}).value.replace("design-","").replace("-", " ")
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
            currentSelectedDesign = designName;
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
                    currentSelectedDesign = matchingDesign.node.fields.find((field)=>{return field.key=="tag"}).value.replace("-", " ")
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
            console.log(data)

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
        choiceList.forEach((choice)=>{
            let matchingProd = currentSelectedProds.find((prod)=>{
                let toReturn = true
                if(prod.category != choice.category){
                    toReturn = false
                }
                if(!prod.variants[0].title == choice.size){
                    toReturn = false
                }
                if(choice.isSwapped){
                    if(!prod.isButtonUp){
                        toReturn = false
                    }
                }
                return toReturn
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
                  prodData.value = JSON.stringify(product);
                  prodData.setAttribute("type", "hidden");
                  prodData.id = "product-json-" + product.id;
                  form.append(prodData);
                  form.addEventListener('submit', function(event) {
                      event.preventDefault();
                  });
 
        document.getElementById("form-loc").append(form);
       
      }
 
      addFormsToCart(0)
 
    }
 
    async function addFormsToCart(index) {
          const forms = document.querySelectorAll('#form-loc .product-form');
          for (let form of forms) {
              const addToCartButton = form.querySelector('.add-to-cart-button');
              addToCartButton.click();
              await ppAddToCart(form, form.querySelector('.product-selected-variant-id').value);
          }
    //    document.querySelector('#add-match-to-cart').innerHTML = "Add To Cart";
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
            firstStage.classList.add("hidden")
            finalStage.classList.remove("hidden")
            addPair()
            // deleteForm()
            getMatches()
        }
    })
    createForm();
}))