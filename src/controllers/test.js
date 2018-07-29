var Demo =  require('../models/test');

/**
 * List Demos
 */
exports.list = (req, h) => {
  return Demo.find({}).exec().then((demo) => {

    return { demos: demo };

  }).catch((err) => {

    return { err: err };

  });
}

/**
 * Get Demo by ID
 */
exports.get = (req, h) => {

  return Demo.findById(req.params.id).exec().then((demo) => {

    if(!demo) return { message: 'Demo not Found' };

    return { demos: demo };

  }).catch((err) => {

    return { err: err };

  });
}


/**
 * POST a Demo
 */
exports.create = (req, h) => {

  const demoData = {
    name: req.payload.name,
    age: req.payload.age
  };

  return Demo.create(demoData).then((demo) => {

     return { message: "Demo created successfully", demo: demo };

  }).catch((err) => {

    return { err: err };

  });
}

/**
 * PUT | Update Demo by ID
 */
exports.update = (req, h) => {

  return Demo.findById(req.params.id).exec().then((demo) => {

    if (!demo) return { err: 'Demo not found' };

    demo.name = req.payload.name;
    demo.breed = req.payload.breed;
    demo.age = req.payload.age;
    demo.image = req.payload.image;

    demo.save(dogData);

  }).then((data) => {

      return { message: "Demo data updated successfully" };

  }).catch((err) => {

      return { err: err };

  });
}

/**
 * Delete Demo by ID
 */
exports.remove = (req, h) => {

  return Demo.findById(req.params.id).exec(function (err, demo) {

    if (err) return { dberror: err };
    if (!demo) return { message: 'Demo not found' };

    demo.remove(function (err) {
      if (err) return { dberror: err };

      return { success: true };
    });
  });
}