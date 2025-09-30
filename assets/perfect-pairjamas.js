(document.addEventListener("DOMContentLoaded", ()=>{

    let design_list = []; 
    const designMap = new Map();
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
                    for(each of node.node.fields){
                    if(each.key == "tag"){
                        designMap.set(each.value, node.node);
                    }
                    }
                }
                }
            }
            console.log(designMap)
            })
    
    }
    get_designs();


    const currentFormLoc = document.querySelector("#current-form-loc");
    let currentFormEle
    const choiceList = [];
    const addPair = () =>{
        const checkedInputs = Array.from(document.querySelectorAll(".current-form input:checked"));
        console.log(checkedInputs);
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
    const createOptions = (data) =>{
        Object.entries(data).forEach(([design, prods]) => {
            console.log(design);
            console.log(designMap)
            const matchingDesign = designMap.get(design.replace("design-",""));
            console.log(matchingDesign);
            prods.forEach((prod, i) => {
                console.log(`  Product ${i + 1}: ${prod.title}`);
            });
        });

    } 
    const getMatches = async () => {
          try {
            console.log(choiceList)
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