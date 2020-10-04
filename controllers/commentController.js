const repository = require('../data/commentRespository');

module.exports = {
  update_comment: (req, res) => {
    repository.UpdateComment(req.body.bugId, req.body.comment._id, req.body.comment)
      .then((comment) => {
        res.status(204).send(comment);
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  },

  insert_comment: (req, res) => {
    req.body.comment.user = req.user._id;
    repository.InsertComment(req.body.bugId, req.body.comment)
      .then((comment) => {
        res.status(200).send(comment);
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  },

  delete_comment: (req, res) => {
    repository.DeleteCommentByID(req.body.bugId, req.body.commentId)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  },

  get_comments: (req, res) => {
    repository.GetAllComments(req.body.bugId)
      .then((comments) => {
        res.status(200).send(comments);
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  },
};
