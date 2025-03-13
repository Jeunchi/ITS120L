function Validation(values) {

    let error = {}




    if(values.name === "") {
        error.name = "Name should not be empty"
    }else {
        error.name = ""
    }

    if(values.email === "") {
        error.email = "Email should not be empty"
    } else {
        error.email = ""
    }
    if(values.course === "") {
        error.course = "course should not be empty"
    } else {
        error.course = ""
    }
    if(values.yearlevel === "") {
        error.yearlevel = "Year Level should not be empty"
    } else {
        error.yearlevel = ""
    }
    if(values.timein === "") {
        error.timein = "Time in should not be empty"
    } else {
        error.timein = ""
    }
    if(values.timeout === "") {
        error.timeout = "Time out should not be empty"
    } else {
        error.timeout = ""
    }
    if(values.date === "") {
        error.date = "Date should not be empty"
    } else {
        error.date = ""
    }

    return error;
}

export default Validation;