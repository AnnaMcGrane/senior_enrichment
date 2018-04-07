import React from 'react'
import { connect } from 'react-redux'
import { saveStudent, deleteStudent } from './store'

class Student extends React.Component {
    constructor(student){
        super()
        console.log(student, 'constructor')
        
        this.onSave = this.onSave.bind(this)
        this.onChangeStudent = this.onChangeStudent.bind(this)
        this.onDelete = this.onDelete.bind(this)
        
        this.state = {
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            GPA: student.GPA, 
        }
    }
    onSave(ev){
        ev.preventDefault()
        const student = { id: this.props.id, firstName: this.state.firstName}
        this.props.saveStudent(student)
    }
    onDelete(ev){
        console.log(this.props.id, 'onDelete')
        this.props.deleteStudent({ id: this.props.id })
    }
    onChangeStudent(ev){
        console.log(ev, 'this the change student event')
        this.setState({ firstName: ev.target.value })
    }
    // componentWillReceiveProps(nextProps){
    //     console.log(nextProps, 'componentWillReceive')
    //     this.setState({ name: nextProps.student ? nextProps.student.name : ''})
    // }
    render(){
        const { student, students } = this.props
        const { firstName, lastName, GPA, email } = this.state
        if (student){
            return (
                <div>
                { firstName }
                <ul>
                    <form onSubmit = { this.onSave }>
                        <li key={ student.id } > First name: <input value = { firstName } onChange = { this.onChangeStudent }></input> </li>
                        <li> Last name:<input value = { lastName } onChange = { this.onChangeStudent } ></input> </li>
                        <li> GPA:<input value = { GPA }></input> </li>
                        <li> email:<input value = { email }></input> </li>          
                        <button> Save Changes </button>
                    </form>
                        <button onClick = { this.onDelete }> Delete </button>
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



const mapStateToProps = ({ students }, { id } )=> {
    const student = students.find (student => student.id === id)
    return {
       student    
   }
} 

const mapDispatchToProps = (dispatch, { history }) => {
    return {
        saveStudent: (student) => dispatch(saveStudent(student, history)),
        deleteStudent: (student) => dispatch(deleteStudent(student.id, history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Student)

