const Order = require('./../models/Order');
const errorHandler = require('./../utils/errorHandler');

module.exports.getAll = async (req, res) => {
    const query = {
        user: req.user.id
    };
    if (req.query.start || req.query.end) {
        query.date = {};
        if (req.query.start) {
            query.date.$gte = req.query.start
        }
        
        if (req.query.end) {
            query.date.$lte = req.query.end
        }
    }

    if (req.query.order) {
        query.order = +req.query.order;
    }

    try {
        const orders = await Order
            .find(query)
            .sort({date: -1})
            .skip(+req.params.offset)
            .limit(+re.params.limit);

        res.status(200).json(orders);
    } catch(error) {
        errorHandler(res, error);
    }
};

module.exports.getAllByUser = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.params.user
        }).populate('list.product');
        res.status(200).json(orders);

    } catch(error) {
        errorHandler(res, error);
    }
};

module.exports.create = async (req, res) => {
    try {
        const lastOrder = await Order.findOne().sort({date: -1});

        let maxOrder = (lastOrder ? lastOrder.order : 0) + 1;
        const order = await new Order({
            order: ++maxOrder,
            user: req.body.user,
            address: req.body.address,
            phone: req.body.phone,
            list: req.body.list
        }).save();
        res.status(201).json(order);
    } catch(error) {
        errorHandler(res, error);
    }
};
