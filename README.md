<h1>Web Scrapin'</h1>

<h4>Link</h4>
<p>https://floating-savannah-37073.herokuapp.com/</p>

<h4>Technology used</h4>
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>Jquery</li>
    <li>Javascript</li>
    <li>NodeJs</li>
    <li>Express</li>
    <li>MongoDB</li>
    <li>Mongoose</li>
    <li>Axios</li>
    <li>Cheerio</li>
</ul>

<h2>Description</h2>
<p>This application scrapes reviews from the IGN reviews website in order to provide the user with an article headline, the score(rating) of the product being reviewed, and the link for the review. Users are able to leave a note on the review that will be pushed into the database and saved for viewing later.<p>

<h2>Development</h2>
<p>This application uses web scraping via the Cheerio npm to get data from the ign.com website. Cheerio looks for specific html elements containing the review score, title, and url link. Once the user clicks the "Scrape Articles" button, Cheerio scrapes the provided website, and results are dynamically created using a for loop and Jquery. The user can post notes to the database by clicking the "Leave a note" button. The button fires a function to POST or GET data from the database using ajax.</p>