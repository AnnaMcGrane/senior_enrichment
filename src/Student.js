import React from 'react'
import { connect } from 'react-redux'
import { saveStudent } from './store'

class Student extends React.Component {
    constructor(student){
        super()
        console.log(student, 'constructor')
        this.state = {
            firstName: '',
        }
        this.onSave = this.onSave.bind(this)
        this.onChangeFirstName = this.onChangeFirstName.bind(this)
    }
    onSave(ev){
        ev.preventDefault()
        const student = { id: this.props.id, firstName: this.state.firstName }
        this.props.saveStudent(student)
    }
    onChangeFirstName(ev){
        this.setState({ firstName: ev.target.value })
    }
    render(){
        const { student } = this.props
        const { firstName, lastName, GPA, email } = this.state
        return (
            <ul>
                <form onSubmit = { this.onSave }>
                <li> First name:<input value = { firstName } onChange = { this.onChangeFirstName }></input> </li>
                <button> Save Changes </button>
                </form>
            </ul>
        )
    }
}

const mapStateToProps = ({ students }, { id } )=> {
    const student = students.find (student => student.id === id)
    console.log(student, 'map state to props')
    return {
       student    
   }
} 

const mapDispatchToProps = (dispatch, { id }) => {
    return {
        saveStudent: (student) => dispatch(saveStudent(student, history)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Student)

// <li> Last name:<input value = { lastName }></input> </li>
// <li> GPA:<input value = { GPA }></input> </li>
// <li> email:<input value = { email }></input> </li>