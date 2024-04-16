const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const axios = require("axios");
const env = require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const client = new OAuth2Client();

const key = process.env.SECRET_KEY;

const uri = "mongodb://localhost:27017/Dashboard";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connection success");
  })
  .catch((err) => {
    console.log({ err: err });
  });

const userSchema = new mongoose.Schema({
  mailId: "string",
  password: "string",
  role: "string",
  mentorId: "string",
});

const user = mongoose.model("Credentials", userSchema, "Credentials");

app.get("/", (req, res) => {
  user
    .find()
    .then((use) => {
      res.send(use);
    })
    .catch((err) => {
      console.log({ msg: err });
    });
});

const mentorSchema = new mongoose.Schema({
  name: "string",
  dept: "string",
  rollNo: "string",
  status: "string",
  mentorId: "string",
  mailId: "string",
  mobileNo: "string",
  level: "string",
});

const mentor = mongoose.model("Mentors", mentorSchema, "Mentors");

app.get("/totalmentor", (req, res) => {
  mentor
    .find()
    .then((data) => {
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "No mentors found" });
      }
      res.send(data);
    })
    .catch((err) => {
      console.log({ msg: err });
      res.status(500).json({ message: "Internal server error" });
    });
});

app.get("/mentor/:mentorId", (req, res) => {
  const mentorId = req.params.mentorId.replace(/['"]+/g, "");

  mentor
    .findOne({ mentorId: mentorId })
    .catch((err) => {
      console.log({ msg: err });
      res.status(500).json({ message: "Internal server error" });
    })
    .then((data) => {
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "No mentors found" });
      }
      res.send(data);
    });
});

const studentSchema = new mongoose.Schema({
  name: "string",
  dept: "string",
  course: "string",
  rollNo: "string",
  status: "string",
  mentorId: "string",
  mailId: "string",
  mobileNo: "string",
  level: "string",
});

const student = mongoose.model("Students", studentSchema, "Students");

app.get("/allStudents", (req, res) => {
  student
    .find()
    .then((data) => {
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "No student found" });
      }
      res.send(data);
    })
    .catch((err) => {
      console.log({ msg: err });
      res.status(500).json({ message: "Internal server error" });
    });
});

app.get("/student/:mentorId", (req, res) => {
  const mentorId = req.params.mentorId.replace(/['"]+/g, "");

  student
    .find({ mentorId: mentorId })
    .then((data) => {
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "No student found" });
      }
      res.send(data);
    })
    .catch((err) => {
      console.log({ msg: err });
      res.status(500).json({ message: "Internal server error" });
    });
});

const createToken = (result) => {
  try {
    const token = JSON.parse(JSON.stringify(result));
    // console.log("token=",token.mailId);
    const data = jwt.sign(
      {
        mailId: token.mailId,
        mentorId: token.mentorId,
        role: token.role,
      },
      key,
      {expiresIn:"1h"}
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

app.get("/credentialToken", (req, res) => {
  try {
    const token = req.headers.authorization;
    if (token == null) {
      res.json({ msg: "token is empty" });
      return;
    }
    const access_token = token.split(" ")[1];
    axios
      .get(`https://oauth2.googleapis.com/tokeninfo?id_token=${access_token}`)
      .then((response) => {
        const mail = response.data.email;
        console.log(response.data);
        user
          .findOne({ mailId: mail })
          .then((result) => {
            const userData = createToken(result);
            res.send(userData);
          })
          .catch((err) => {
            console.log("user not found", err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log("err in credentials");
  }
});

app.post("/credential", (req, res) => {
  try{
  const userDataToken = req.body.token;
  const userData = jwt.verify(userDataToken, key);
  res.send(userData);
  }catch(err){

  }
});

const port = 4000;
app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
