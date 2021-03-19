const { Person, Course  } = require('../models');

async function lookupPersonAndCourses(personId) {
  return await Person.findByPk(personId, {
    include: Course
  })
};

async function lookupPersonByLastName(lastName) {
  return await Person.findAll({
    where: { lastName }
  })
};

async function lookupCoursesByPersonEmail(email) {
  const person = await Person.findOne({
    where: { email },
    include: Course
  });
  return person.Courses;
};

module.exports = {
  lookupPersonAndCourses,
  lookupPersonByLastName,
  lookupCoursesByPersonEmail,
};
