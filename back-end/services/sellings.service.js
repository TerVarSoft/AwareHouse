const winston = require('./../winston.wrapper');
const SellingsDAO = require('./../DAL/DAO/sellings.DAO')();

const loggingOptions = { layer: "services", file: "sellings.service.js" };

const SellingService = function() {
    const findAll = function() {
        return SellingDAO.findAll();
    }

    const save = function(sellingToUpdate) {
        if(!sellingToUpdate.id) {
            winston.verbose(`No selling id found for: ${sellingToUpdate.code}, Creating the selling` , 
                loggingOptions);

            return SellingDAO.create(sellingToUpdate);
        } else {
            return SellingDAO.update(sellingToUpdate);
        }
    }

    const remove = function(sellingToDelete) {
        return SellingsDAO.remove(sellingToDelete);
    }

    return {
        findAll: findAll,
        save: save,
        remove: remove
    }
}

module.exports = SellingService;