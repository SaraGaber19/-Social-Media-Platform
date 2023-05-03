

const methods = ["body", "params", "query"]



const validation = (schema) => {
    return (req, res, next) => {   //

        let errorArray = []
        methods.forEach((e) => {
            if (schema[e]){
                const checkSchema = schema[e].validate(req[e])
            if (checkSchema.error) {
                errorArray.push(checkSchema.error.details[0])
            }
        }
    })

    if (errorArray.length) {
        res.json({ message: "validation error", err: errorArray })
    }
    else {
        next()
    }
}
}
module.exports = validation