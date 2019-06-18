import { products } from "../../../template/data.json";

class App {
    constructor() {

        /*
         * Declaration
         */
        var slide_up = document.getElementById('slide_up'),
            slide_down = document.getElementById('slide_down'),
            priceArray = {};

        /* 
        * Templating Json data to HTML
        */
        Object.entries(products).map(([key, value]) => {
            const markup = `
            <div class="col-md-6">
                <div class="menu-item-container">
                    <div class="item-name">${key}</div><div><i class="fa fa-dot-circle-o veg-icon"></i></div>
                    <div class="item-price-container">
                        <div class="item-price">
                            <i class="fa fa-rupee"></i>${value.price}
                        </div>
                        <div class="spacer"></div>
                        <div class="add-button">
                            <button class="btn btn-primary sc-add-to-cart" data-name="${key}" data-price="${value.price}" type="submit">ADD</button>
                        </div>
                    </div>
                </div> 
            </div>`;
            document.getElementById('products-main').insertAdjacentHTML('beforeend', markup);
            priceArray[key] = value.price;
        });

        /*
         * Event Listeners
         */
        slide_up.addEventListener('mouseup', function (e) {
            valueOutput(e, slide_up);
        });
        slide_down.addEventListener('mouseup', function (e) {
            valueOutput(e, slide_down);
        });


        /*
         * Functions
         */
        var valueOutput = (element) => {

            var count_up = document.getElementById('count_up').value = slide_up.value;
            var count_down = document.getElementById('count_down').value = slide_down.value;


            var mainDiv = document.getElementsByClassName('menu-item-container');
            Array.prototype.filter.call(mainDiv, function (e) {
                e.parentNode.style.display = "none";
            });

            Object.keys(priceArray).forEach(function (key) {
                if (Number.parseInt(priceArray[key]) <= Number.parseInt(count_down) && Number.parseInt(priceArray[key]) >= Number.parseInt(count_up)) {
                    var showDiv = document.querySelector(`[data-name = "${key}"]`).closest('.menu-item-container');
                    showDiv.parentNode.style.display = "block";
                }
            });
        }
        
    }

}

export default App;