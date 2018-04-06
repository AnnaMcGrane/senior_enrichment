import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

const SET_STUDENTS = 'SET_STUDENTS'
const UPDATE_STUDENT = 'UPDATE_STUDENT'
const DELETE_STUDENT = 'DELETE_STUDENT'

const studentsReducer = (state=[], action)=> {
    switch(action.type){
      case SET_STUDENTS:
        state = action.students;
        break;  
      case UPDATE_STUDENT:
        state = state.map( student => student.id === action.student.id ? action.student : student )
        break;
    }
    return state;
  };
  
const reducer = combineReducers({
    students: studentsReducer,
});
  
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

// export const deleteStudent = (student, history)=> {
//     if(student.id){
//         return(dispatch)=> {
//             return axios.delete(`/api/students/${student.id}`, student)
//                 .then(result => result.data)
//                 .then(() => dispatch({
//                     type: DELETE_STUDENT,
//                     student
//                 })
//             )
//             .then ( ()=> {
//                 history.push('/students')
//             })
//         }
//     }
// }


const store = createStore(reducer, applyMiddleware(thunk));
export default store;