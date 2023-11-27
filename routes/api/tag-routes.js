const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    // find all tags
    const tagData = await Tag.findAll({
      // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: "Unable to find tags" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find a single tag by its `id`
    const tagData = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tagData) {
      res.status(404).json({ message: "Unable to find tag by id" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({ message: "Unable to find tag" });
  }
});

router.post("/", async (req, res) => {
  try {
    // create a new tag
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json({ message: "Failed creating tag" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    // update a tag's name by its `id` value
    const updated = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    !updated[0]
      ? res.status(404).json({ message: "Unable to find tag by id" })
      : res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update tag" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // delete on tag by its `id` value
    const deleted = await Tag.destroy({ where: { id: req.params.id } });
    !deleted
      ? res.status(404).json({ message: "Unable to find tag by id" })
      : res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ message: "Failed to delete tag" });
  }
});

module.exports = router;
