const quoteContainer = document.getElementById("quote-container");
const quoteAuthor = document.getElementById("author");
const quoteText = document.getElementById("quote");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn  = document.getElementById("new-quote");
const laoder = document.getElementById("loader");

 
let apiQuotes = [];
function showLoadingSpinner() {
	laoder.hidden = false;
	quoteContainer.hidden = true;
}
function removeLoadingSpinner() {
	laoder.hidden = true;
	quoteContainer.hidden = false;
}
//   Show new Quote
function newQuote() {
	showLoadingSpinner();
	if (!apiQuotes.originator || !apiQuotes.originator.name) {
	  quoteAuthor.textContent = "~ Unknown";
	} else {
	  quoteAuthor.textContent = "~ " + apiQuotes.originator.name;
	}
	
	if (apiQuotes.content.length > 150) {
	  quoteText.classList.add("long-quote");
	} else {
	  quoteText.classList.remove("long-quote");
	}
	
	quoteText.textContent = apiQuotes.content;
	removeLoadingSpinner();
  }
// Get Quote from Api
async function getQuotes() {
showLoadingSpinner();
const apiUrl = 'https://quotes15.p.rapidapi.com/quotes/random/';
const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "5b599cf020msh61def43d428be89p168205jsn814d4adda9ac",
		"X-RapidAPI-Host": "quotes15.p.rapidapi.com"
	}
};
try {
  const response = await fetch (apiUrl, options);
  apiQuotes = await response.json();
  newQuote();
} catch (error) {
	alert(error);
}
}
// tweet quote
function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ${quoteAuthor.textContent}`;
	window.open(twitterUrl, '_blank');
};

// Event listners
newQuoteBtn.addEventListener("click", getQuotes);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();
