import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { saveStudent, deleteStudent } from './store'

class Student extends React.Component {
    constructor(student){
        super()
        console.log(student, 'constructor')
        
        this.onSave = this.onSave.bind(this)
        this.onDelete = this.onDelete.bind(this)
 

        this.onChangeFirst = this.onChangeFirst.bind(this)
        this.onChangeLast = this.onChangeLast.bind(this)
        this.onChangeImage = this.onChangeImage.bind(this)
        this.onChangeSchool = this.onChangeSchool.bind(this)
        
        this.state = {
            firstName: student.firstName ? student.firstName : '',
            lastName: student.lastName ? student.lastName : '',
            email: student.email ? student.email : '@pacer',
            GPA: student.GPA ? student.GPA : '4.0', 
            imageURL: student.imageURL ? student.imageURL : '',
            schoolId: student.schoolId ? student.schoolId : 3 
        }
    }
    onSave(ev){
        console.log('calling onSave', ev)
        ev.preventDefault()
        const student = { id: this.props.id, firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, GPA: this.state.GPA, imageURL: this.state.imageURL, schoolId: this.state.schoolId}
        this.props.saveStudent(student)
    }
    onDelete(ev){
        console.log('calling onDelete')
        this.props.deleteStudent({ id: this.props.id })
    }
    onChangeFirst(ev){
        console.log('calling on ChangeFirst', ev.target.value)
        this.setState({ firstName: ev.target.value })
    }
    onChangeLast(ev){
        console.log('calling on ChangeLast',ev.target.value)
        this.setState({ lastName: ev.target.value })
    }
    onChangeImage(ev){
        console.log('calling on ChangeImage', ev.target.value)
        this.setState({ imageURL: ev.target.value })
    }
    onChangeSchool(ev){
        console.log('calling on ChangeSchool', schoolId)
        this.setState({ schoolId: ev.target.value })
    }
    // componentWillReceiveProps(nextProps){
    //     console.log(nextProps, 'from componentwillreceiveprops')
    // }
    
    //RENDER IS TWO PARTS: FIRST PART LINKS TO AN INDIVIDUAL STUDENT PAGE
    //SECOND PART LINKS TO A CREATE STUDENT PAGE. SHOULD HAVE PUT THIS IN A SEPARATE COMPONENT
    
    render(){
        const { student, students, id, schools } = this.props
        const { firstName, lastName, GPA, email, imageURL, schoolId } = this.state
        
        if (student){
            return (
                <div>
                <ul>
                <h3>{ student.fullName }</h3>
                <h4> Edit { student.firstName }'s info here </h4>
                    <form onSubmit ={ this.onSave }>
                        <li key= { student.firstName } > 
                            First name: <input value = { firstName } onChange = { this.onChangeFirst }></input> 
                        </li>        
                        
                        <li key= { student.lastName } > 
                            Last name: <input value = { lastName } onChange = { this.onChangeLast }></input> 
                        </li>  
                        
                        <li key={ student.imageURL } > 
                             Student Image URL: <input value = { imageURL } onChange = { this.onChangeImage }></input> 
                        </li>  

                        <li key= { GPA }> 
                             School:    
                             <select>
                             <option> None </option>
                                {
                                    schools.map (school => <option value={ schoolId } onChange = { this.onChangeSchool }> { school.name } </option>)
                                }
                             </select>
                         </li> 
                        <button type='submit' className="btn btn-primary btn-sm"> Update Info </button>
                    </form>
                        <button type="button" className="btn btn-secondary btn-sm" onClick = { this.onDelete }> Delete </button>
                </ul>
                </div>
            )
        }
        else {
            return (
                <div>
                <ul>
                <h2> Current Students </h2>
                {
                  students.map( student => {
                    return (
                        <li key={ student.id }>
                            <Link to={`/students/${student.id}`}>{ student.fullName }</Link>
                        </li>
                    )
                })
                }
                </ul>
                </div>
            )
        }
    }
} 

const mapStateToProps = ({ students, schools }, { id } )=> {
    const student = students.find (student => student.id === id*1)
    return {
       students,
       student,
       id,    
       schools
   }
} 

const mapDispatchToProps = (dispatch, { history }) => {
    return {
        saveStudent: (student) => dispatch(saveStudent(student, history)),
        deleteStudent: (student) => dispatch(deleteStudent(student.id, history)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Student)

