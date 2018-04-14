import React from 'react'
import { connect } from 'react-redux'
import { newStudent } from './store'

class StudentCreate extends React.Component {
    constructor(student){
        super()
        
        this.onSave = this.onSave.bind(this)
        this.onChangeFirst = this.onChangeFirst.bind(this)
        this.onChangeLast = this.onChangeLast.bind(this)
        this.onChangeImage = this.onChangeImage.bind(this)
        this.onChangeSchool = this.onChangeSchool.bind(this)
        
        this.state = {
            firstName: student.firstName ? student.firstName : '',
            lastName: student.lastName ? student.lastName : '',
            email: student.email ? student.email : '@pacer',
            imageURL: student.imageURL ? student.imageURL : '',
            GPA: student.GPA ? student.GPA : +4,
            schoolId: student.schoolId ? student.schoolId : 1
        }
    }
    onSave(ev){
        ev.preventDefault()
        this.props.newStudent(this.state)
    }
    onChangeFirst(ev){
        this.setState({ firstName: ev.target.value })
    }
    onChangeLast(ev){
        this.setState({ lastName: ev.target.value })
    }
    onChangeImage(ev){
        this.setState({ imageURL: ev.target.value })
    }
    onChangeSchool(ev){
        const schoolName = ev.target.value
        const school = this.props.schools.find(school => school.name === schoolName)
        this.setState({ schoolId: school.id })
    }
    render(){
        const { students, id, schools } = this.props
        const { firstName, lastName, GPA, email, imageURL, schoolId } = this.state
        return (
                <div>
                <ul>
                <h3> Create new student</h3>
                    <form onSubmit ={ this.onSave }>
                        <li> 
                            First name: <input value = { firstName } onChange = { this.onChangeFirst }></input> 
                        </li>        
                        
                        <li> 
                            Last name: <input value = { lastName } onChange = { this.onChangeLast }></input> 
                        </li>  
                        
                        <li> 
                             Student Image URL: <input value = { imageURL } onChange = { this.onChangeImage }></input> 
                        </li>  

                        <li> 
                             School:    
                             <select onChange = { this.onChangeSchool }>
                             <option> None </option>
                                {
                                    schools.map (school => <option key={ school.id } value={ school.name }> { school.name } </option>)
                                }
                             </select>
                         </li> 
                        <button type='submit' className="btn btn-primary btn-sm"> Update Info </button>
                    </form>
                </ul>
                </div>
            )
    }
} 

const mapStateToProps = ({ students, schools }, { id } )=> {
    return {
       students,
       id,    
       schools
   }
} 

const mapDispatchToProps = (dispatch, { history }) => {
    return {
        newStudent: (student) => dispatch(newStudent(student, history)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentCreate)


