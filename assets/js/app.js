'use strict'

// variables

const listaTweets = document.querySelector('#lista-tweets');

// add event listener

function addEventListeners (){
  document.querySelector('#formulario').addEventListener('submit', crearTweet)
  listaTweets.addEventListener('click', borrarTweet)
  document.addEventListener('DOMContentLoaded', localStorageListo)

}
addEventListeners ();

// funciones

function crearTweet(event){
  event.preventDefault();
  const tweet = document.querySelector('#tweet').value;
  const li = document.createElement('li');
  const borrarTweet = document.createElement('a');
  borrarTweet.classList = 'borrar-tweet'
  borrarTweet.innerText = 'X';
  li.classList = 'list-tweets';
  li.innerText = tweet;
  listaTweets.appendChild(li)
  li.appendChild(borrarTweet)

  agregarTweetLocalStorage(tweet);
}

function borrarTweet(event){
  event.preventDefault();
  if(event.target.className === 'borrar-tweet'){
    event.target.parentElement.remove();
    borrarTweetLocalStorage(event.target.parentElement.innerText)
  }
}

function agregarTweetLocalStorage(tweet){
  let tweets;
  tweets = obtenerTweetsLocalStorage();
  tweets.push(tweet);
  localStorage.setItem('tweets', JSON.stringify(tweets))
}

function obtenerTweetsLocalStorage(){
  let tweets;
  if(localStorage.getItem('tweets') === null){
    tweets = [];
  }
  else{
    tweets = JSON.parse(localStorage.getItem('tweets'));
  }
  return tweets;
}

function localStorageListo(){
  let tweets;
  tweets = obtenerTweetsLocalStorage()
  tweets.forEach(function(tweet){
    const li = document.createElement('li');
    const borrarTweet = document.createElement('a');
    borrarTweet.classList = 'borrar-tweet'
    borrarTweet.innerText = 'X';
    li.classList = 'list-tweets';
    li.innerText = tweet;
    listaTweets.appendChild(li)
    li.appendChild(borrarTweet)
  })
}

function borrarTweetLocalStorage(tweet){
  let borrarTweet = tweet.slice(0, tweet.length - 1);
  let tweets = obtenerTweetsLocalStorage();
  tweets.forEach(function(tweet, index){
    if(borrarTweet === tweet){
      tweets.splice(index, 1)
  }
  });
  localStorage.setItem('tweets', JSON.stringify(tweets))
}


