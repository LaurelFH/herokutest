const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");

// Matches with "/api/articles"
router.route("/")
  .get(articlesController.findAll)
  .post(articlesController.create);

// Matches with "/api/articles/:id"
router
  .route("/:id")
  .get(articlesController.findById)
  .put(articlesController.update)
  .delete(articlesController.remove);





///api/saved (get) - your components will use this to query MongoDB for all saved articles
///api/saved (post) - your components will use this to save an article to the database
///api/saved (delete) - your components will use this to delete a saved article in the database
//* (get) - will load your single HTML page (with ReactJS) in public/index.html. Make sure you put this after all other GET routes




module.exports = router;
