const asyncHandler = require('express-async-handler')
const apiError = require('../utils/apiError')
const ApiFeatures = require('../utils/apiFeatures')

exports.deleteOne = Model =>  asyncHandler(async (req, res,next) => {
    const {id} = req.params;
    const document = await Model.findByIdAndDelete(id)
    if (!document) {
        return next(new apiError('there is not document found',404))
    }
    // trigger remove event when document is removed
    document.remove();
    res.status(204).send();
})

exports.updateOne = Model =>  asyncHandler(async (req, res,next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!document) {
        return next(new apiError('there is not document found',404))
    }
    // trigger save event when document is updated
    document.save();
    res.status(200).json({data:document})
})

exports.createOne = Model => asyncHandler(async (req, res) => {
    const document = await Model.create(req.body)
    res.status(201).json({ data: document });
})

exports.getOne = (Model,populateOpt) =>asyncHandler(async (req, res,next) => {
    const {id} = req.params;
    // build query string
    let query =  Model.findById(id)
    if(populateOpt){
        query = query.populate(populateOpt)
    }
    // excute query string
    const document = await query;
    if (!document) {
        return next(new apiError('there is not document found',404))
    }
    res.status(200).json({data:document})
})

exports.getAll = (Model,modelName = '') => asyncHandler(async (req, res,next) => {
    let filter = {};
    if (req.filterObj) {
        filter = req.filterObj
    }
    const documentCount = await Model.countDocuments();
    // Build query
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
        .pagination(documentCount)
        .filter()
        .search(modelName)
        .limitFields()
        .sort()
    const { mongooseQuery, paginationResults } = apiFeatures;
    const documents = await mongooseQuery;
    // res.status(200).json({data:documents})
    res.render('schools',{result:documents.length,paginationResults,data:documents})
})