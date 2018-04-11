import React from 'react'
import { connect } from 'react-redux'

import { deleteSchool, saveStudent } from './store'
import Students from './Students';

class School extends React.Component{
    constructor(school){
        super()
        
        this.onSave = this.onSave.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
        this.enrollStudent = this.enrollStudent.bind(this)

        this.state = {
            name : school.name ? school.name : '',
            imageURL: school.imageURL ? school.imageURL : '',
            student: ''
            // fullName: student.fullName
        }
    }
    onSave(ev){
        ev.preventDefault()
        // const student = this.props.students.find(student => student.fullName === fullName)
        this.props.saveStudent(this.state.student)
    }
    onDelete(ev){
        this.props.deleteSchool({ id: this.props.id })
    }
    onChangeName(ev){
        this.setState({ name: ev.target.value })
    }
    enrollStudent(ev){

        const studentId = +ev.target.value
        console.log(this.props.studentNotEnrolled)
        const student = this.props.studentNotEnrolled.find(student => student.id === studentId)
        console.log(student,'enroll')
        console.log(this.props.id, 'id is here')
        const studentWithNewSchoolId = (student)=> {
            student.schoolId = this.props.id 
            return student;
        }
       
        this.setState({ student: studentWithNewSchoolId })
    }

    render(){
        const { students, studentNotEnrolled,  school, schools } = this.props
        if (school) {
            return (
                <div> 
                    <ul> 
                        <h3> Students attending {school.name} are: </h3>
                       {
                           students.map (student => <li key={ student.id }> { student.firstName } </li>)
                       }
                    </ul> 
                <form onSubmit = { this.onSave } >
                    <ul>
                    <select onChange = { this.enrollStudent }>
                    <option> None </option>
                        {
                            studentNotEnrolled.map(student => <option value= { student.id }> { student.fullName }</option> )
                        }
                    </select>
                        <button type='submit' className="btn btn-primary btn-sm"> Enroll New Student </button>
                    </ul>
                </form>
                <ul>
                    <button type="button" className="btn btn-secondary btn-sm" onClick = { this.onDelete }> Close {school.name} </button>
                </ul>
                </div>
            )
        }
        else {
            return (
                <h2> School updated </h2>
            )
        }
    }
}


const mapStateToProps = ({ students, schools }, { id }) => {
    const _students = students.filter(student => student.schoolId === id)
    const studentNotEnrolled = students.filter(student => student.schoolId !== id)
    const school = schools.find(school => school.id === id)
    
    return { 
       school: school,  
       schools: schools,
       studentNotEnrolled: studentNotEnrolled,
       students: _students
    }
}

const mapDispatchToProps = (dispatch, { history }) => {
    return {
        saveStudent: (student) => dispatch(saveStudent(student, history)),
        deleteSchool: (school) => dispatch(deleteSchool(school.id, history)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(School)