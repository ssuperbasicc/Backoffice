const resFn = function (resCode, resMessage, result) {
    let response = {
        responseCode: parseInt(resCode),
        responseMessage: resMessage.toString()
    }

    if (result) {
        response = { ...response, result }
    }

    return response
}

module.exports = { resFn }