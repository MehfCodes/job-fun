const Company = require('./../models/companyModel');
const { getAll, getOne, updateOne, deActiveOne } = require('./factory');

const getAllCompany = getAll(Company);
const getCompany = getOne(Company);
const updateCompany = updateOne(Company);
const deActiveCompany = deActiveOne(Company);

module.exports = {
  getAllCompany,
  getCompany,
  updateCompany,
  deActiveCompany
};
