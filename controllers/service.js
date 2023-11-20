const Service = require("../model/service");

async function createService(req, res) {
  try {
    const { name, description, categoryService } = req.body;
    console.log("categoryService", categoryService);
    console.log(req.files.photos)
   
    const photos = Array.isArray(req.files.photos)
      ? req.files.photos.map((file) => file.path)
      : [];
   
    const newService = new Service({
      name,
      description,
      photos,
      categoryService,
    });

    console.log("newService", newService);
    const savedService = await newService.save();
    console.log("savedService", savedService);
    res.status(201).json(savedService);
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(400).json({ message: "Error creating service" });
  }
}

module.exports = {
  createService
};
