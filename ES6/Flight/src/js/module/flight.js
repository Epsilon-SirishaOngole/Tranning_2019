import { flight } from "../../../template/flight.json";

class Flight {
    constructor() {
        var slide_up = document.getElementById('slide_up'),
            slide_down = document.getElementById('slide_down'),
            slide_up_a = document.getElementById('slide_up_a'),
            slide_down_a = document.getElementById('slide_down_a'),
            priceArray = {};

        
        /* 
        * Templating Json data to HTML
        */
        Object.entries(flight).map(([key, value]) => {
            const markup = `
            <div class="col-md-6">
                <div class="menu-item-container">
                    <div class="item-name">${key}</div><div><i class="fa fa-dot-circle-o veg-icon"></i></div>
                    <div class="item-price-container">
                        <div class="item-price">
                            <i class="fa fa-rupee"></i> depart at: ${value.depart} - arrive by: ${value.arival}
                        </div>
                        <div class="spacer"></div>
                        <div class="add-button">
                            <button class="btn btn-primary sc-add-to-cart" data-name="${key}" data-price="${value.price}" type="submit">BOOK NOW</button>
                        </div>
                    </div>
                </div> 
            </div>`;
            document.getElementById('products-main').insertAdjacentHTML('beforeend', markup);
            priceArray[key] = { "arival": value.arival, 'depart': value.depart };
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
        slide_up_a.addEventListener('mouseup', function (e) {
            valueOutput(e, slide_up_a);
        });
        slide_down_a.addEventListener('mouseup', function (e) {
            valueOutput(e, slide_down_a);
        });


        /*
         * Functions
         */
        var valueOutput = (element) => {

            var count_up = document.getElementById('count_up').value = slide_up.value+':00';
            var count_down = document.getElementById('count_down').value = slide_down.value + ':00';

            var count_up_a = document.getElementById('count_up_a').value = slide_up_a.value + ':00';
            var count_down_a = document.getElementById('count_down_a').value = slide_down_a.value + ':00';


            var mainDiv = document.getElementsByClassName('menu-item-container');
            Array.prototype.filter.call(mainDiv, function (e) {
                e.parentNode.style.display = "none";
            });

            Object.keys(priceArray).forEach(function (key) {

                if ((Number.parseFloat(priceArray[key].arival) <= Number.parseFloat(count_down) && Number.parseFloat(priceArray[key].arival) >= Number.parseFloat(count_up)) &&
                    (Number.parseFloat(priceArray[key].depart) <= Number.parseFloat(count_down_a) && Number.parseFloat(priceArray[key].depart) >= Number.parseFloat(count_up_a))) {
                    var showDiv = document.querySelector(`[data-name = "${key}"]`).closest('.menu-item-container');
                    showDiv.parentNode.style.display = "block";
                }
            });
        }

    
    }
}
export default Flight;