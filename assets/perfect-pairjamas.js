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

    document.addEventListener("click", (e)=>{
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