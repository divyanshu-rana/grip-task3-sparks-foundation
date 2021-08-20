const Razorpay = require("razorpay");
const axios = require("axios");
const Email = require("../utils/email");

var instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});
exports.donation = async (req, res) => {
  const { amount } = req.body;
  var options = {
    amount: parseFloat(amount) * 100, // amount in the smallest currency unit
    currency: "INR",
  };
  instance.orders.create(options, function (err, order) {
    res.status(200).json({
      status: "success",
      orderId: order.id,
    });
  });
};
exports.donationConfirm = async (req, res) => {
  try {
    const userData = await axios(
      `https://${process.env.KEY_ID}:${process.env.KEY_SECRET}@api.razorpay.com/v1/payments/${req.body.razorpay_payment_id}`
    );
    const paymentDate = new Date(userData.data.created_at * 1000);
    const data = {
      email: userData.data.email,
      name: userData.data.notes.name,
      amount: userData.data.amount / 100,
      paymentId: userData.data.id,
      date: `${
        paymentDate.getDate() +
        "/" +
        (paymentDate.getMonth() + 1) +
        "/" +
        paymentDate.getFullYear()
      }`,
      mode: userData.data.method,
      description: "Donation in Helping Hands Founation",
    };
    const email = new Email(data);
    await email.sendReceipt();
    res.status(301).redirect("/thankyou");
  } catch (error) {
    console.log(error);
  }
};
