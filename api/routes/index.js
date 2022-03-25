const express = require("express");
const router = express.Router();
const models = require("../models");
const { User, Course } = models;
const bcrypt = require("bcryptjs");
const { authenticateUser } = require("../middleware/auth-user.js");

/* Handler function to wrap each route. */
function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

// Returns  all properties and values for the currently authenticated User

router.get(
  "/users",
  authenticateUser,
  asyncHandler(async (req, res) => {
    const user = await User.findOne({
      where: { id: req.currentUser.id },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      include: [{ model: Course }],
    });
    res.json({ user });
    res.status(200).end();
  })
);

// Creates a new user, set the Location header to "/", and return a 201 HTTP status code and no content.

router.post(
  "/users",
  asyncHandler(async (req, res) => {
    const errors = [];

    try {
      const user = await User.build(req.body);

      if (!user.firstName) {
        errors.push("Please provide your First Name");
      }
      if (!user.lastName) {
        errors.push("Please provide you Last Name");
      }
      if (!user.emailAddress) {
        errors.push("Please provide your e-mail address");
      }
      if (!user.password) {
        errors.push("Please provide a password");
      }
      if (errors.length > 0) {
        res.status(400).json({ errors });
      } else {
        if (user.password) {
          user.password = bcrypt.hashSync(user.password, 10);
        }
        await user.save();
        res.status(201).location("/").end();
      }
    } catch (error) {
      console.log("there was an error", error);
    }
  })
);

// Returns all courses including  User associated
router.get(
  "/courses",
  asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ["password", "createdAt", "updatedAt"] },
        },
      ],
    });
    res.json(courses.map((course) => course.get({ plain: true })));
    res.status(200).end();
  })
);

//  Returns corresponding course including  User associated
router.get(
  "/courses/:id",
  asyncHandler(async (req, res) => {
    try {
      const course = await Course.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: { exclude: ["password", "createdAt", "updatedAt"] },
          },
        ],
      });
      if (course) {
        res.json({
          course,
        });
        res.status(200).end();
      } else {
        res.status(404).json({
          message: "Route Not Found",
        });
      }
    } catch (error) {
      console.log("there was an error", error);
    }
  })
);
//  Creates a new course
router.post(
  "/courses",
  authenticateUser,
  asyncHandler(async (req, res) => {
    let course;
    const errors = [];
    try {
      course = await Course.build(req.body);
      course.userId = req.currentUser.id;

      if (!course.title) {
        errors.push('Please provide a value for "title"');
      }
      if (!course.description) {
        errors.push('Please provide a value for "description"');
      }

      if (errors.length > 0) {
        res.status(400).json({ errors });
      } else {
        if (course) {
          await course.save();
          res.status(201).location(`/courses/${course.id}`).end();
        }
      }
    } catch (error) {
      console.log("There was an error", error);
    }
  })
);
// Updates the corresponding course and return a 204 HTTP status code and no content.

router.put(
  "/courses/:id",
  authenticateUser,
  asyncHandler(async (req, res) => {
    let course;
    const errors = [];
    const user = req.currentUser;

    try {
      course = await Course.findByPk(req.params.id);
      if (course) {
        if (course.userId === user.id) {
          await course.update(req.body);
          res.status(204).end();
        } else {
          res.status(403).json({ error: "Not authorised" });
        }
      } else {
        res.status(404).json(`Course Not Found`);
      }
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

//  Deletes the corresponding course and return a 204 HTTP status code and no content.
router.delete(
  "/courses/:id",
  authenticateUser,
  asyncHandler(async (req, res) => {
    try {
      const course = await Course.findByPk(req.params.id);
      const user = req.currentUser;
      if (user.id === course.userId) {
        if (course) {
          await course.destroy();
          res.status(204).location("/courses/").end();
        } else {
          res.status(404).json("Course Not Found");
        }
      } else {
        res.status(401).json({
          message: "Not Authorized.",
        });
      }
    } catch (error) {
      console.log("there was an error", error);
    }
  })
);
module.exports = router;
