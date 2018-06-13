import * as EmployeeActionTypes from './EmployeeActionTypes';
import Axios from 'axios';

const apiUrl = '/api/users';

const url = employeeId => {
    let url = apiUrl;
    if (employeeId) {
        url += '/' + employeeId;
    }
    return url;
}

export const listEmployees = () => {
    return dispatch => {
        return Axios.get(url())
            .then(response => {
                dispatch(list(response.data));
                console.log("employees retrieved");
            }).catch(error => {
                console.log("error attempting to retrieve employees:", error);
            });
    }
}

export const getEmployee = id => {
    return dispatch => {
        return Axios.get(url(id))
            .then(response => {
                dispatch(get(response.data));
                return true;
            }).catch(error => {
                console.log("there was an error getting the employee:", error);
            });
    }
}

export const updateEmployee = employee => {
    return dispatch => {
        return Axios.put(url(employee._id), employee)
            .then(response => {
                dispatch(get(response.data));
                console.log("employee: " + employee.name + ", updated.");
                return true;
            }).catch(error => {
                console.log("there was an error updating the employee:", error);
            });
    }
}

export const removeEmployee = employee => {
    return dispatch => {
        employee.deleted = true;

        return Axios.put(url(employee._id), employee)
            .then(response => {
                dispatch(get(response.data));
                console.log("employee: " + employee.name + ", was deleted.");
                return true;
            }).catch(error => {
                console.log("there was an error deleting the employee:", error);
            });
    }
}

export const restoreEmployee = employee => {
    return dispatch => {
        employee.deleted = false;

        return Axios.put(url(employee._id), employee)
            .then(response => {
                dispatch(get(response.data));
                console.log("employee: " + employee.name + ", was restored.");
                return true;
            }).catch(error => {
                console.log("there was an error restoring the employee:", error);
            });
    }
}

export const createEmployee = employee => {
    return dispatch => {
        return Axios.put(url(), employee)
            .then(response => {
                dispatch(get(response.data));
                console.log("employee: " + response.data.name + ", created.");
                return true;
            }).catch(error => {
                console.log("there was an error creating the employee:", error);
            });
    }
}

export const list = employees => {
    return {
        type : EmployeeActionTypes.LIST,
        employees : employees,
    }
};

export const get = employee => {
    return {
        type : EmployeeActionTypes.GET,
        employee : employee,
    }
};