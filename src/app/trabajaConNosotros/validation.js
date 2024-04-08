
const validation = (form) => {
    
    const error = {}
    
    if(!form.dni) error.dni = 'Requerido'
    if(!form.nroDni)  error.nroDni = 'Requerido'
    if(!form.phone)  error.phone = 'Requerido'
    if(!form.email)  error.email = 'Requerido'
    if(!form.cv)  error.cv = 'Requerido'
    if(!form.message)  error.message = 'Requerido'

    return error

}

export default validation
