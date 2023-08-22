// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

document.addEventListener('DOMContentLoaded', function () {

  const nodeListOfArticles = document.querySelectorAll('article.media-post');
  //adds event listener to each article

  nodeListOfArticles.forEach((article) => {
    article.querySelector('span.like-glyph').addEventListener('click', function (e) {
      e.preventDefault();

      //trying to make liking the posts linked with the fetched data.
      //mimicking only.
      mimicServerCall()
        .then((response) => {
          document.querySelector('div#modal').classList.add('hidden');
          let indexOfActivatedClass = false;
          //check to see if DOM element has activated class or not.
          for(let i = 0; i < article.querySelector('span.like-glyph').classList.length ; i++){
            if(article.querySelector('span.like-glyph').classList.item(i) === 'activated-heart'){
              indexOfActivatedClass = true;
            }
          }
          indexOfActivatedClass ? removeHearts(article,'span.like-glyph','activated-heart') : addHearts(article,'span.like-glyph','activated-heart');
          console.log(response);
        })
        .catch((error) => {
          document.querySelector('div#modal').classList.remove('hidden');
          console.log(error);
          setTimeout( ()=> {
            document.querySelector('div#modal').classList.add('hidden');
          }, 3000);
        })

    })
  })
})


function addHearts(parentDOM, heartCSSLocation, nameOfClass){
  parentDOM.querySelector(heartCSSLocation).classList.add(nameOfClass);
  parentDOM.querySelector(heartCSSLocation).textContent = FULL_HEART;
  console.log('added heart');
}

function removeHearts(parentDOM, heartCSSLocation, nameOfClass){
  parentDOM.querySelector(heartCSSLocation).classList.remove(nameOfClass);
  parentDOM.querySelector(heartCSSLocation).textContent = EMPTY_HEART;
  console.log('removed heart');
}



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
