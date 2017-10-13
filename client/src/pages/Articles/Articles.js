import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    articles: [],
    title: "",
    date: "",
    link: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, title: "", date: "", link: "" })
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.date) {
      API.saveArticle({
        title: this.state.title,
        date: this.state.date,
        link: this.state.link
      })
        .then(res => this.loadArticles())
        .catch(err => console.log(err));
    }
  };

// SETUP VARIABLES
// ==========================================================

// This variable will be pre-programmed with our authentication key
// (the one we received when we registered)
// var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

// // These variables will hold the results we get from the user's inputs via HTML
// var searchTerm = "";
// var numResults = 0;
// var startYear = 0;
// var endYear = 0;

// // queryURLBase is the start of our API endpoint. The searchTerm will be appended to this when
// // the user hits the search button
// var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
//   authKey + "&q=";

// // Counter to keep track of article numbers as they come in
// var articleCounter = 0;

// // FUNCTIONS
// // ==========================================================

// // This runQuery function expects two parameters:
// // (the number of articles to show and the final URL to download data from)
// function runQuery(numArticles, queryURL) {

//   // The AJAX function uses the queryURL and GETS the JSON data associated with it.
//   // The data then gets stored in the variable called: "NYTData"

//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).done(function(NYTData) {

//     // Logging the URL so we have access to it for troubleshooting
//     console.log("------------------------------------");
//     console.log("URL: " + queryURL);
//     console.log("------------------------------------");

//     // Log the NYTData to console, where it will show up as an object
//     console.log(NYTData);
//     console.log("------------------------------------");

//     // Loop through and provide the correct number of articles
//     for (var i = 0; i < numArticles; i++) {

//       // Add to the Article Counter (to make sure we show the right number)
//       articleCounter++;

//       // Create the HTML well (section) and add the article content for each
//       var wellSection = $("<div>");
//       wellSection.addClass("well");
//       wellSection.attr("id", "article-well-" + articleCounter);
//       $("#well-section").append(wellSection);

//       // Confirm that the specific JSON for the article isn't missing any details
//       // If the article has a headline include the headline in the HTML
//       if (NYTData.response.docs[i].headline !== "null") {
//         $("#article-well-" + articleCounter)
//           .append(
//             "<h3 class='articleHeadline'><span class='label label-primary'>" +
//             articleCounter + "</span><strong> " +
//             NYTData.response.docs[i].headline.main + "</strong></h3>"
//           );

//         // Log the first article's headline to console
//         console.log(NYTData.response.docs[i].headline.main);
//       }

//       // If the article has a byline include the headline in the HTML
//       if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.original) {
//         $("#article-well-" + articleCounter)
//           .append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");

//         // Log the first article's Author to console.
//         console.log(NYTData.response.docs[i].byline.original);
//       }

//       // Then display the remaining fields in the HTML (Section Name, Date, URL)
//       $("#articleWell-" + articleCounter)
//         .append("<h5>Section: " + NYTData.response.docs[i].section_name + "</h5>");
//       $("#articleWell-" + articleCounter)
//         .append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
//       $("#articleWell-" + articleCounter)
//         .append(
//           "<a href='" + NYTData.response.docs[i].web_url + "'>" +
//           NYTData.response.docs[i].web_url + "</a>"
//         );

//       // Log the remaining fields to console as well
//       console.log(NYTData.response.docs[i].pub_date);
//       console.log(NYTData.response.docs[i].section_name);
//       console.log(NYTData.response.docs[i].web_url);
//     }
//   });

// }

// // METHODS
// // ==========================================================

// // on.("click") function associated with the Search Button
// $("#run-search").on("click", function(event) {
//   // This line allows us to take advantage of the HTML "submit" property
//   // This way we can hit enter on the keyboard and it registers the search
//   // (in addition to clicks).
//   event.preventDefault();

//   // Initially sets the articleCounter to 0
//   articleCounter = 0;

//   // Empties the region associated with the articles
//   $("#well-section").empty();

//   // Grabbing text the user typed into the search input
//   searchTerm = $("#search-term").val().trim();
//   var queryURL = queryURLBase + searchTerm;

//   // Number of results the user would like displayed
//   numResults = $("#num-records-select").val();

//   // Start Year
//   startYear = $("#start-year").val().trim();

//   // End Year
//   endYear = $("#end-year").val().trim();

//   // If the user provides a startYear -- the startYear will be included in the queryURL
//   if (parseInt(startYear)) {
//     queryURL = queryURL + "&begin_date=" + startYear + "0101";
//   }

//   // If the user provides a startYear -- the endYear will be included in the queryURL
//   if (parseInt(endYear)) {
//     queryURL = queryURL + "&end_date=" + endYear + "0101";
//   }

//   // Then we will pass the final queryURL and the number of results to
//   // include to the runQuery function
//   runQuery(numResults, queryURL);
// });

// // This button clears the top articles section
// $("#clear-all").on("click", function() {
//   articleCounter = 0;
//   $("#well-section").empty();
// });








  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Articles Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.date}
                onChange={this.handleInputChange}
                name="date"
                placeholder="Author (required)"
              />
              <TextArea
                value={this.state.link}
                onChange={this.handleInputChange}
                name="link"
                placeholder="Synopsis (Optional)"
              />
              <FormBtn
                disabled={!(this.state.date && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Article
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6">
            <Jumbotron>
              <h1>Articles On My List</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={"/articles/" + article._id}>
                      <strong>
                        {article.title} by {article.date}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
