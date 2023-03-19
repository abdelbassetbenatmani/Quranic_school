
class ApiFeatures{
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }

    filter() {
        const queryStringObj = { ...this.queryString }
        const excludeQuery = ["page", "limit", "fileds", "sort"]
        excludeQuery.forEach((elem) => delete queryStringObj[elem]);
        let strQuery = JSON.stringify(queryStringObj);
        // apply filtretion use [get,gt,lte,lt]
        strQuery = strQuery.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(strQuery));
        return this
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.sort(sortBy)
        } else {
            this.mongooseQuery = this.mongooseQuery.sort('-createAt')
        }
        return this
    }

    limitFields() {
        if (this.queryString.fields) {
            const filedsBy = this.queryString.fields.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.select(filedsBy)
        } else {
            this.mongooseQuery = this.mongooseQuery.select('-__V')
        }
        return this

    }

    search() { 
        if (this.queryString.keyword) {
            let query = {};
            query = { name: { $regex: this.queryString.keyword, $options: "i" } } 
            this.mongooseQuery = this.mongooseQuery.find(query)
        }
        return this
    }

    pagination(countDoc) {
        const page = +this.queryString.page || 1;
        const limit = +this.queryString.limit || 50;
        const skip = (page - 1) * limit
        const endIndex = limit * page;

        const paginationObj = {};
        paginationObj.currentPage = page;
        paginationObj.limit = limit;
        paginationObj.numberPages = Math.ceil(countDoc / limit);
        if (endIndex<countDoc) {
            paginationObj.next = page+1
        }
        if (skip>0) {
            paginationObj.prev = page-1
        }
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit)
        this.paginationResults = paginationObj;
        return this
    }
}


module.exports = ApiFeatures;
