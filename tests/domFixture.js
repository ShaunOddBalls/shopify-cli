export function mountBaseDOM() {
    document.body.innerHTML = `
      <input id="plain-background" value="#fff" />
      <input id="patterned-background" value="#eee" />
      <input id="secondary-plain-background" value="#fafafa" />
      <input id="secondary-patterned-background" value="#f0f0f0" />
      <input class="origional-background" value="#111" />
      <input class="swap-background" value="#222" />
      <input class="secondary-origional-background" value="#333" />
      <input class="secondary-swap-background" value="#444" />
      <input id="current-product-json" value='{
        "title":"Original Product",
        "images":["https://cdn/img-month-sep-1.jpg","https://cdn/img-month-sep-2.jpg"],
        "selling_plan_groups":[{"selling_plans":[{"id":"sp_123"}]}],
        "variants":[{"id":111,"option1":"Red","option2":"Small"}]
      }' />
      <input id="style-equivalent-product-json" value='{
        "title":"Swap Product",
        "images":["https://cdn/img-month-sep-3.jpg","https://cdn/img-month-sep-4.jpg"],
        "selling_plan_groups":[{"selling_plans":[{"id":"sp_999"}]}],
        "variants":[{"id":222,"option1":"Blue","option2":"Large"}]
      }' />
      <div id="subs-background"></div>
      <div id="mobile-subs-background"></div>
  
      <input id="product-json" value='{
        "title":"Original Product",
        "images":["https://cdn/img-month-sep-1.jpg","https://cdn/img-month-sep-2.jpg"],
        "selling_plan_groups":[{"selling_plans":[{"id":"sp_123"}]}],
        "variants":[
          {"id":111,"option1":"Red","option2":"Small"},
          {"id":112,"option1":"Red","option2":"Large"}
        ]
      }' />
  
      <form class="product-form">
        <input type="hidden" name="id" value="" />
      </form>
  
      <div id="product-content">
        <div id="product-variants">
          <div class="product-option" data-option-name="Color">
            <label><input type="radio" name="opt1" data-option-value="Red" /></label>
            <label><input type="radio" name="opt1" data-option-value="Blue" /></label>
          </div>
          <div class="product-option" data-option-name="Size">
            <label><input type="radio" name="opt2" data-option-value="Small" /></label>
            <label><input type="radio" name="opt2" data-option-value="Large" /></label>
          </div>
        </div>
      </div>
  
      <button id="add-to-cart-loaded">Add to Basket</button>
      <div id="add-sub-form"></div>
  
      <button id="subscription-print-swap">Swap</button>
      <div id="product-images">
        <img class="ob-product-media__image subscription" />
        <img class="ob-product-media__image subscription" />
      </div>
      <div id="mobile-product-images">
        <img class="ob-product-media__image" />
        <img class="ob-product-media__image" />
        <img class="ob-product-media__image" />
      </div>
      <div class="thumbnails">
        <img class="ob-product-media__image" />
        <img class="ob-product-media__image" />
      </div>
      <img class="subs-info-image" />
      <img class="subs-info-image" />
  
      <h1 id="product-title">Original Product</h1>
      <div id="cart-items-number">0</div>
  
      <!-- Click targets -->
      <div class="product-variant">variant</div>
    `;
  }
  