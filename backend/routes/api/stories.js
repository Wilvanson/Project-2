const express = require('express');
const asyncHandler = require('express-async-handler');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Story, comments } = require('../../db/models');

const router = express.Router();

const addingValidations = [
  check('title')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a Title.'),
  check('body')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a Body.'),
  handleValidationErrors
];


router.get('/', asyncHandler(async function(_req, res) {
    const stories = await Story.findAll();
    return res.json(stories);
  }));
  
  router.post( '/', addingValidations, asyncHandler(async function (req, res) {
      const {title, body, authorId}= req.body;
      const story = await Story.create({
        authorId,
        title,
        body
      });
      return res.json(story);
    })
  );
  
  router.put('/:id', asyncHandler(async function (req, res) {
      const id = parseInt(req.params.id, 10);
      const {title, body} = req.body;
      const story = await Story.findOne({
        where: id
      });

      await story.update({
        title,
        body
    });
      return res.json(story);
    })
  );

  router.delete("/:id", asyncHandler(async function (req, res) {
    const id = parseInt(req.params.id, 10);
    await Story.destroy({
      where: {
      id
      }
     });

    return res.json({ id });
  }));
  
module.exports = router;