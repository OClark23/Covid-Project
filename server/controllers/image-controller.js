const handleImage = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
  handleImage
};
