class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    let queryObj = { ...this.queryString };
    const excludedFields = ['page', 'limit', 'fields', 'sort'];
    excludedFields.forEach(el => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      let sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      let selectedFields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(selectedFields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
  pagination() {
    const page = parseInt(this.queryString.page) || 1;
    const limit = parseInt(this.queryString.limit) || 12;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
module.exports = APIFeatures;
