exports.displayHome = (req, res) => {
  res.status(200).render("home");
};
exports.getDonatePage = (req, res) => {
  res.status(200).render("donate");
};
exports.getThankyouPage = (req, res) => {
  res.status(200).render("thankyou");
};
