'use strict'

const getErrorMessage = (err) => {
  let message = ''
  if (err.code) {
    switch (err.code) {
      case 11000: //Mongoose Error Codes
      case 11001:
        message = getUniqueErrorMessage(err)
        break
        default:
          message = "Ooops! Something went wrong"
    }
  } else {
    for (let errName in err.errors){
      if (err.errors[errName].message)
      message = err.errors[errName].message
    }
  }
  return message

}

const getUniqueErrorMessage = (err) => {
  let output
  try {
    let fieldName =
    err.message.substring(err.message.lastIndexOf('.$') + 2,
    err.message.lastIndexOf('_1'))
    output = fieldName.chartAt(0).toUpperCase() + fieldName.slice(1)
    +
    'Already exists'
  } catch (ex){
    output = 'Unique field already exists'
  }
  return output
}

export default {getErrorMessage}
