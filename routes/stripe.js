const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SEC_KEY);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
      apiKey:
        "sk_test_51KkiDeAUFaW3s2nQVKAGiCc10ItHHp4u1lBCXizdaLAFlGOfBTnPGoYq00OHu4XK6MwoUMAAUaVDEuQUmh6dylDs00Frc6chp9",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
