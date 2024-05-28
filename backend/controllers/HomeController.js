const multer = require("multer");
const path = require("path");

const HomeModel = require("../Models/HomeModel");

const storageImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/ProfileImages/");
  },
  filename: function (req, file, cb) {
    var imageName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  },
});

const upload = multer({ storage: storageImage }).fields([
  { name: "avatar" },
]);

exports.create = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.log("err", err);
      return res.status(500).json({
        message: "Error occurred while uploading files",
      });
    }

    const { name, email, phoneNumber, description, role } = req.body;
    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log("req.body",req.body);
    console.log("req.files",req.files);
    // return
    if(!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    if(!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    if (!regEmail.test(email)) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    if(!phoneNumber) {
      return res.status(400).json({
        message: "Phone Number is required",
      });
    }

    const regPhone = /^[6-9]\d{9}$/;
    if(!regPhone.test(phoneNumber)) {
      return res.status(400).json({
        message: "Invalid Phone Number",
      });
    }

    if(!role) {
      return res.status(400).json({
        message: "Role is required",
      });
    }

    if(!description) {
      return res.status(400).json({
        message: "Description is required",
      });
    }

   
    if (!req.files || !req.files.avatar) {
      return res.status(400).json({
        message: "images files are required",
      });
    }

    const avatar = req.files.avatar[0].filename;
    
    const HomeModelInsert = new HomeModel({
      name, email, phoneNumber, description, role, avatar
    });

    try {
      const HomeModelInserted = await HomeModelInsert.save();
      return res.status(200).json({
        success: true,
        message: " Created successfully",
        data: HomeModelInserted,
      });
    } catch (error) {
      console.error("Error saving homepage entry:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  });
};

exports.allData = async (req, res) => {
  try {
    const HomeModelAll = await HomeModel.find({}); 
    return res.status(200).json({
      success: true,
      message: `All home data!`,
      data: HomeModelAll,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};
