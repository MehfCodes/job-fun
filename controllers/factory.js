// const { ObjectId } = require('mongoose').Types;
// const catchAsync = require('./../utils/catchAsync');
// const AppError = require('./../utils/appError');

// function getAll(model) {
//   return catchAsync(async (req, res, next) => {
//     const data = await model.find();
//     res.status(200).json({
//       status: 'success',
//       results: data.length,
//       data: {
//         data
//       }
//     });
//   });
// }

// function getOne(model, dataType) {
//   return catchAsync(async (req, res, next) => {
//     if (!ObjectId.isValid(req.params.id))
//       return next(new AppError(`user not found`, 404));
//     const data = await model.findById(req.params.id);
//     if (!data) return next(new AppError(`${dataType}not found`, 404));
//     res.status(200).json({
//       status: 'success',
//       data: {
//         data
//       }
//     });
//   });
// }

// function updateOne(model, dataType) {
//   return catchAsync(async (req, res, next) => {
//     const data = await model.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true
//     });

//     if (!data) return next(new AppError(`${dataType}not found`, 404));
//     res.status(200).json({
//       status: 'success',
//       data: {
//         data
//       }
//     });
//   });
// }

// function createOne(model) {
//   return catchAsync(async (req, res, next) => {
//     const data = await model.create(req.body);
//     res.status(200).json({
//       status: 'success',
//       data: {
//         data
//       }
//     });
//   });
// }

// function deleteOne(model) {
//   return catchAsync(async (req, res, next) => {
//     const data = await model.findByIdAndDelete(req.params.id);
//     res.status(200).json({
//       status: 'success',
//       data: {
//         data
//       }
//     });
//   });
// }
// module.exports = { getAll, getOne, updateOne, createOne, deleteOne };
