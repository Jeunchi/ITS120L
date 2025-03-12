function RecordsValidation(values) {

    let error = {}


    if(values.ID === "") {
        error.ID = "ID should not be empty"
    }else {
        error.ID = ""
    }

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

    return error;
}

export default RecordsValidation;