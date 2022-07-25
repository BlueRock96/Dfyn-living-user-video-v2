var express = require('express');
var router = express.Router();
var request = require("request");
var validator = require("validator");

/* GET users listing. */
router.get('/hi', function(req, res, next) {
  res.send('respond with a resource');
});


function sendOTPToNumber(mobile_no, otp_string) {
  try {
    var options = {
      method: "GET",
      url: `http://2factor.in/API/V1/${process.env.OTP_APIKEY}/SMS/${mobile_no}/${otp_string}`,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      form: {},
    };

    request(options, function (error, response, body) {
      // if (error) throw new Error(error);
      // console.log(body);
      // console.log(JSON.parse(body).Status);
      // console.log(JSON.parse(body).Details);
      if (JSON.parse(body).Status === "Success") {
        return { status: true, message: "OTP sent successfully" };
      } else {
        throw new Error("Unable to send OTP, Please try again!");
      }
    });
  } catch (error) {
    return { status: false, message: "Error sending OTP" };
  }
}

router.post("/sendOTP", async (req, res) => {
  try {
    const { mobile_no, otp_string } = req.body;
    //console.log(mobile_no);
    //console.log(validator.isMobilePhone(String(mobile_no), ["en-IN"]));
    if (!mobile_no || !validator.isMobilePhone(String(mobile_no), ["en-IN"])) {
      return res.status(400).send({ message: "Invalid Mobile Number!" });
    }
    const user = await pool.query(
      "SELECT * FROM customer WHERE phone = $1 limit 1",
      [mobile_no]
    );

    // const otp_string = await generateOTPString();

    // // Uncomment to send OTP using 2factor API
    await sendOTPToNumber(mobile_no, otp_string);

    if (user.rows.length === 0) {
      let newUser = await pool.query(
        "INSERT INTO customer (phone, otp, otp_sent_at) VALUES ($1, $2, $3) RETURNING * ",
        [mobile_no, otp_string, "now()"]
      );
      if (newUser.rows.length !== 0) {
        return res
          .status(200)
          .send({ message: "OTP Sent successfully to Signed Up User!" });
      } else {
        throw new Error("Signup Failed!");
      }
    } else {
      let existingUser = await pool.query(
        "UPDATE customer set otp = $1, otp_sent_at =  $2 WHERE phone = $3 RETURNING * ",
        [otp_string, "now()", mobile_no]
      );
      if (existingUser.rows.length !== 0) {
        return res
          .status(200)
          .send({ message: "OTP Sent successfully to Logged In User!" });
      } else {
        throw new Error("Login Failed!");
      }
    }
  } catch (error) {
    console.log(chalk.red(error));
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
