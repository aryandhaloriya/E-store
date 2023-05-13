const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 8080;

dotenv.config();

app.use(cors());
app.use(express.json());

// Connect to MongoDB 
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB database"))
  .catch((err) => console.log(err));

// Define user schema
const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

const userModel = mongoose.model("user", userSchema);

// api
app.get("/", (req, res) => {
  res.send("Server is running");
});
//signup api
app.post("/signup", async(req, res) => {
    // console.log(req.body);
    const {firstName, lastName, email, password} = req.body;
  
    try {
      const result = await userModel.findOne({email});
      // console.log(result)
      if(result){
          res.send({message : "Email id is already registered", alert : false})
      }
      else {
        const newUser = new userModel({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        });
        // console.log(newUser);
        const savedUser = await newUser.save();
        // console.log(savedUser);
        res.send({ message: "Signup is successful", alert: true });
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({message: "Internal server error"})
    }
  });
  


//api login
app.post("/login", async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;
  
    try {
      const result = await userModel.findOne({ email }).exec();
      if (result) {
        const isPasswordMatch = result.password === password;
        if (isPasswordMatch) {
          const dataSend = {
            _id: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
          };
          // console.log(dataSend);
          res.send({ message: "Login is successful", alert: true, data: dataSend });
        } else {
          res.send({ message: "Wrong password", alert: false });
        }
      } else {
        res.send({ message: "Email is not registered", alert: false });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  });


//product section
const schemaProduct = mongoose.Schema({
  name : String,
  category : String,
  image: String,
  price : String,
  description : String,
});
const productModel = mongoose.model("product",schemaProduct )

// configure multer middleware
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })


//save product in data
//api
app.post("/uploadProduct", upload.single('image'), async (req,res)=>{
  // console.log(req.body);
  const data = await productModel(req.body)
  const datasave = await data.save()
  res.send({message : "upload successful"})
   })

//fech data from backend
app.get("/product", async(req,res)=>{
  const data =  await productModel.find({})
  res.send(JSON.stringify(data))
})

  

app.listen(PORT, () => console.log(`Server is running at port: ${PORT}`));
