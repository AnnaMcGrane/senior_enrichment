import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

//STUDENT ACTIONS
const SET_STUDENTS = 'SET_STUDENTS'
const UPDATE_STUDENT = 'UPDATE_STUDENT'
const DELETE_STUDENT = 'DELETE_STUDENT'

//SCHOOL ACTIONS
const SET_SCHOOLS = 'SET_SCHOOLS'

//REDUCERS
const studentsReducer = (state = [], action)=> {
    switch(action.type){
      case SET_STUDENTS:
        state = action.students;
        break;  
      case UPDATE_STUDENT:
        state = state.map( student => student.id === action.student.id ? action.student : student )
        break;
      case DELETE_STUDENT:
        state = state.filter( student => student.id !== action.student.id); 
        break;
    }
    return state;
};

const schoolsReducer = (state=[], action)=> {
    switch(action.type){
        case SET_SCHOOLS:
          state = action.schools;
          break;  
    }
    return state;
}
  
const reducer = combineReducers({
    students: studentsReducer,
    schools: schoolsReducer
});
//AXIOS CALLS  
export const loadStudents = ()=> {
    return(dispatch)=> {
        return axios.get('/api/students')
            .then(result => result.data)
            .then(students => dispatch({
                type: SET_STUDENTS,
                students
            })
        )
    }
}

export const loadSchools = ()=> {
    return(dispatch)=> {
        return axios.get('/api/schools')
            .then(result => result.data)
            .then(schools => dispatch({
                type: SET_SCHOOLS,
                schools
            })
        )
    }
}
//SAVE
export const saveStudent = (student, history)=> {
    if(student.id){
        return(dispatch)=> {
            return axios.put(`/api/students/${student.id}`, student)
                .then(result => result.data)
                .then(student => dispatch({
                    type: UPDATE_STUDENT,
                    student
                })
            )
            .then ( ()=> {
                history.push('/students')
            })
        }
    }
}
//DELETE
export const deleteStudent = (id, history)=> {
    return (dispatch)=> {
        return axios.delete(`/api/students/${id}`) 
            .then( result => result.data)
            .then( () => dispatch({
                type: 'DELETE_STUDENT',
                student: { id  }
      }))
      .then( ()=> history.push('/'));
    }
};

//STORE
const store = createStore(reducer, applyMiddleware(thunk));
export default store;