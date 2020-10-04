const repository = require('../data/bugRepository');

module.exports = {
  get_all_bugs: (req, res) => {
    repository
      .GetAllBugs()
      .then((bugs) => {
        res.status(200).send(bugs);
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  },

  get_bug_by_id: (req, res) => {
    repository
      .GetBugByID(req.params.id)
      .then((bug) => {
        res.status(200).json(bug);
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  },

  add_tag: (req, res) => {
    repository
      .AddTag(req.body.id, req.body.tag)
      .then((tag) => {
        res.status(201).send(tag);
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  },

  create_bug_post: (req, res) => {
    const { bug } = req.body;
    repository
      .InsertSingleBug(bug)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  },

  update_bug: (req, res) => {
    repository
      .UpdateBug(req.body)
      .then((data) => {
        res.status(204).send(data);
      })
      .catch((err) => {
        res.status(500).send({ error: err });
      });
  },
};
