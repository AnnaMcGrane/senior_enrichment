import React from 'react'
import { connect } from 'react-redux'
import { saveStudent, deleteStudent, newStudent } from './store'

class Student extends React.Component {
    constructor(student){
        super()
        console.log(student, 'constructor')
        
        this.onSave = this.onSave.bind(this)
        this.onChangeStudent = this.onChangeStudent.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.onCreate = this.onCreate.bind(this)
        
        this.state = {
            firstName: student.firstName ? student.firstName : '',
            lastName: student.lastName ? student.lastName : 'McGrane',
            email: student.email ? student.email : '@pacerpro.com',
            GPA: student.GPA ? student.GPA : '4.0', 
        }
    }
    onSave(ev){
        ev.preventDefault()
        const student = { id: this.props.id, firstName: this.state.firstName}
        this.props.saveStudent(student)
    }
    onCreate(ev){
        ev.preventDefault()
        const student = { firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, GPA: this.state.GPA}
        this.props.newStudent(student)
    }
    onDelete(ev){
        console.log(this.props.id, 'onDelete')
        this.props.deleteStudent({ id: this.props.id })
    }
    onChangeStudent(ev){
        this.setState({ firstName: ev.target.value })
    }
    // componentWillReceiveProps(nextProps){
    //     console.log(nextProps, 'componentWillReceive')
    //     this.setState({ name: nextProps.student ? nextProps.student.name : ''})
    // }
    render(){
        const { student, students, id } = this.props
        const { firstName, lastName, GPA, email } = this.state
        if (student){
            return (
                <div>
                <ul>
                    <form onSubmit = { this.onSave }>
                        <li key={ student.id } > First name: <input value = { firstName } onChange = { this.onChangeStudent }></input> </li>        
                        <button> Save Changes </button>
                    </form>
                        <button onClick = { this.onDelete }> Delete </button>
                </ul>
                </div>
            )
        }
        if (id === 'create'){
            return (
                <div>
                    <ul>
                    
                    <h2>Enroll a new student </h2>
                    
                    <form onSubmit = { this.onCreate }>
                        
                        <li > First name: 
                            <input value = { firstName } onChange = { this.onChangeStudent }></input> 
                        </li>           
                        <button> Save Changes </button>
                    </form>
                    </ul>
                </div>
            )
        }
        else {
            return (
                <h3> Student removed </h3>
            )
        }
    }
}

// <li> Last name:<input value = { lastName } ></input> </li>
// <li> GPA:<input value = { GPA }></input> </li>
// <li> email:<input value = { email }></input> </li>       

const mapStateToProps = ({ students }, { id } )=> {
    const student = students.find (student => student.id === id*1)
    return {
       student,
       id    
   }
} 

const mapDispatchToProps = (dispatch, { history }) => {
    return {
        saveStudent: (student) => dispatch(saveStudent(student, history)),
        deleteStudent: (student) => dispatch(deleteStudent(student.id, history)),
        newStudent: (student) => dispatch(newStudent(student, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Student)

