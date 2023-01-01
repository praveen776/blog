var express = require("express");
var router = express.Router();
const Joi = require("joi");
const _ = require("lodash");
const commentsModel = require("../models/comments.js");

const validationSchema = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required().messages({
      "string.empty": `Name is required`,
      "string.required": `Name is required`,
      "string.min": `Name should have atleast 3 charecters`,
    }),
    email: Joi.string().email().required().messages({
      "string.empty": `Email is required`,
      "string.email": `Please enter a valid Email`,
      "string.required": `Email is required`,
    }),
    comment: Joi.string().min(3).required().messages({
      "string.empty": `Comment is required`,
      "string.required": `Comment is required`,
      "string.min": `Comment should have atleast 3 charecters`,
    }),
    created: Joi.date().raw(),

    replies: Joi.array(),
  });

  return schema.validate(data);
};

router.get("/get_comments", async (req, res) => {
  try {
    const allComments = await commentsModel.find().sort({ created: -1 });
    res.status(200).json({
      data: allComments,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/create_comment", async (req, res) => {
  const body = validationSchema({ ...req.body, created: new Date() });
  if (!_.isEmpty(body?.error?.details)) {
    res?.status(400).json({
      status: "failure",
      error: body?.error?.details[0]?.message,
    });
  } else {
    const newComment = new commentsModel(body?.value);
    try {
      await newComment.save();
      res.status(201).json({
        status: "success",
        message: "comment created successfully!",
        data: newComment,
      });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }
});

router.post("/create_comment/:id", async (req, res) => {
  const id = req?.params.id;
  const body = validationSchema(req.body);
  if (!_.isEmpty(body?.error?.details)) {
    res?.status(400).json({
      status: "failure",
      message: body?.error?.details[0]?.message,
    });
  } else {
    try {
      let addedreply = await commentsModel.updateOne(
        { _id: id },
        { $push: { replies: { ...req?.body, created: new Date() } } }
      );
      if (addedreply?.acknowledged) {
        res?.status(200).json({
          status: "success",
          message: "Reply Added Successfully",
          data: req?.body,
        });
      } else {
        res?.status(400).json({
          status: "failure",
          message: "Something went wrong. please try again",
        });
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
});

module.exports = router;
