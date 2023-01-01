const commentsModel = require("../models/comments.js");
const assert = require("assert");

describe("comments", () => {
  const body = {
    name: "testUser",
    email: "testuser@gmail.com",
    comment:
      "Reply Lists are a continuous group of text or images. They are composed of items containing primary and supplemental actions, which are represented by icons and text.",
    replies: [],
  };
  it("get comments", (done) => {
    commentsModel.find().then((comments) => {
      assert(typeof comments === "object");
      done();
    });
  });

  it("Creates a New Comment", (done) => {
    const newComment = new commentsModel(body);
    newComment
      .save() // returns a promise after some time
      .then(() => {
        assert(!newComment.isNew);
        done();
      });
  });

  it("Creates a New Reply", (done) => {
    var id = "";
    // const newComment = new commentsModel(body);
    commentsModel.findOne({ name: "testUser" }).then(async (comment) => {
      id = comment?._id;
      let addedreply = await commentsModel.updateOne(
        { _id: id },
        { $push: { replies: body } }
      );
      await commentsModel.deleteOne({ _id: id });
      assert(addedreply.acknowledged === true);
      done();
    });
  });
});
