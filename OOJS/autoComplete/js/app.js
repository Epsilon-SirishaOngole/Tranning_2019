let url = 'http://localhost:88/autoComplete/js/states.json';

function mouseUp(){

  /** Create ul,li Elements */
  document.getElementById("small-grid").innerHTML = "";
  var ul = document.createElement('ul');
  document.getElementById("small-grid").appendChild(ul);

  /** Fetch function to fetch data from json object */
  
  fetch(url)
  .then(res => res.json())
  .then((out) => {
    let states = out.States;
    states.filter(word => 
    {
      /** get the input text */

       let chartcher = document.getElementById("word-input").value;

       if(chartcher != ''){

         /** filtered word append to li */
          var WordExists = word.includes(chartcher);
          if(WordExists){
            var li = document.createElement('li');
            li.innerHTML=word;
            ul.appendChild(li);
          }
       }
  })}).catch(err => { throw err });
  
  }
  