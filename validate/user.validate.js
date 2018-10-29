
module.exports.postCreate =  async (req,res, next) => {
    const errors = [];

    if(!req.body.name) {
        errors.push('Name is required!');
    }
    if(!req.body.phone) {
        errors.push('Phone is required!');
    }
    if(errors.length) {
        res.render('users/createUser',{
            errors,
            values : req.body
        });
        return;
    }
    next();
}