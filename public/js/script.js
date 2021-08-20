const donateForm = document.querySelector(".second-donate-form");
const donateBtnHome = document.getElementById("second-donate-btn");
if (donateBtnHome) {
  donateBtnHome.addEventListener("click", (e) => {
    // document.querySelector(".spinner").classList.remove("hide");
  });
}
if (donateForm) {
  donateForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const name = document.getElementById("full-name").value;
      const email = document.getElementById("email").value;
      const phoneNumber = document.getElementById("phone-number").value;
      const amount = document.getElementById("amount").value;
      const userData = { name, email, phoneNumber, amount };
      const response = await fetch(`/api/v1/donation/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      var options = {
        key: "rzp_test_zpShqm4P2AqwbW", // Enter the Key ID generated from the Dashboard
        amount: `${parseFloat(amount) * 100}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Helping Hands Foundation",
        description: "Donation",
        image: `${window.location.origin}/img/icon/logo.svg`,
        order_id: `${data.orderId}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: `${window.location.origin}/api/v1/donation/confirm/`,
        prefill: {
          name: `${name}`,
          email: `${email}`,
          contact: `${phoneNumber}`,
        },
        notes: {
          name: `${name}`,
        },
        theme: {
          color: "#000052",
        },
      };
      var rzp1 = new Razorpay(options);
      rzp1.open();
      e.preventDefault();
    } catch (err) {
      console.log(err);
    }
  });
}
