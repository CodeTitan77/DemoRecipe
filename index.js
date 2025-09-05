const express=require("express");
const app=express();
const {initializeDatabase}=require("./dbConnect.js");
const Recipe=require("./recipe.model.js");

initializeDatabase();
app.use(express.json());

app.post("/recipes", async (req, res) => {
  try {
    const newRecipe = new Recipe({
      title: req.body.title,
      author: req.body.author,
      difficulty: req.body.difficulty,
      prepTime: req.body.prepTime,
      cookTime: req.body.cookTime,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      imageUrl: req.body.imageUrl
    });
    
    await newRecipe.save();
    return res.status(201).json({
      message: "Recipe created successfully",
      data: newRecipe
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    if (recipes && recipes.length > 0) {
      return res.status(200).json({
        message: "Recipes fetched successfully",
        data: recipes
      });
    } else {
      return res.status(404).json({ message: "No recipes found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/recipes/title/:title", async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ title: req.params.title });
    if (recipe) {
      return res.status(200).json({
        message: "Recipe fetched successfully",
        data: recipe
      });
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/recipes/author/:author", async (req, res) => {
  try {
    const recipes = await Recipe.find({ author: req.params.author });
    if (recipes && recipes.length > 0) {
      return res.status(200).json({
        message: "Recipes fetched successfully",
        data: recipes
      });
    } else {
      res.status(404).json({ message: "No recipes found for this author" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/recipes/difficulty/Easy", async (req, res) => {
  try {
    const recipes = await Recipe.find({ difficulty: "Easy" });
    if (recipes && recipes.length > 0) {
      return res.status(200).json({
        message: "Easy recipes fetched successfully",
        data: recipes
      });
    } else {
      res.status(404).json({ message: "No easy recipes found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch("/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
      Object.assign(recipe, req.body);
      const updatedRecipe = await recipe.save();
      res.status(200).json({
        message: "Recipe updated successfully",
        data: updatedRecipe
      });
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.patch("/recipes/title/:title", async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ title: req.params.title });
    if (recipe) {
      Object.assign(recipe, req.body);
      const updatedRecipe = await recipe.save();
      res.status(200).json({
        message: "Recipe updated successfully",
        data: updatedRecipe
      });
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/recipes/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (recipe) {
      res.status(200).json({
        message: "Recipe deleted successfully",
        data: recipe
      });
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3050;
app.listen(PORT, () => {
  console.log(`Recipe API started at port ${PORT}`);
});