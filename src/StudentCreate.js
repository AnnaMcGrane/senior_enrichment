import React from 'react'
import { connect } from 'react-redux'
import { newStudent } from './store'

class StudentCreate extends React.Component {
    constructor(student){
        super()
        console.log(student, 'constructor')
        
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
            GPA: student.GPA ? student.GPA : +4
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
        this.setState({ schoolId: ev.target.value })
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
                             <select>
                             <option> None </option>
                                {
                                    schools.map (school => <option key={ school.id } value={ schoolId } onChange = { this.onChangeSchool }> { school.name } </option>)
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




// import React from 'react'
// import { connect } from 'react-redux'
// import { newStudent } from './store'

// class StudentCreate extends React.Component {
//     constructor(student){
//         super()

//         this.onChangeFirst = this.onChangeFirst.bind(this)
//         this.onChangeLast = this.onChangeLast.bind(this)
//         this.onChangeEmail = this.onChangeEmail.bind(this)

//         this.state = {
//             firstName: student.firstName ? student.firstName : '',
//             lastName: student.lastName ? student.lastName : '',
//             email: student.email ? student.email : '@pacer',
//         }
//     } 
//     onSave(ev){
//         ev.preventDefault()
//         this.props.newStudent(this.state);
//     }
//     onChangeFirst(ev){
//         this.setState({ firstName: ev.target.value })
//     }
//     onChangeLast(ev){
//         this.setState({ lastName: ev.target.value })
//     }
//     onChangeEmail(ev){
//         this.setState({ email: ev.target.value })
//     }
//     render(){
//         const { onSave, onChangeFirst, onChangeLast, onChangeEmail } = this
//         const { schools } = this.props
//         const { firstName, lastName, email } = this.state
//         return (
//             <div>
//                 <ul>  
//                 <h2> Enroll a new student </h2>
//                 <form onSubmit = { onSave }>
                    
//                     <li > First name: 
//                         <input value = { firstName } onChange = { onChangeFirst }></input> 
//                     </li>  
//                     <li> Last name:
//                         <input value = { lastName } onChange = { onChangeLast } ></input> 
//                     </li>   
//                     <li> Email:
//                         <input value = { email } onChange = { onChangeEmail } ></input> 
//                     </li>             
                    
//                     <button disabled={ !email } onClick={ onSave }>Save</button>
                
//                 </form>
//                 </ul>
//             </div>
//         )
//     }
// }

// const mapStateToProps = ({ schools } )=> {
//     return {
//        schools
//    }
// } 

// const mapDispatchToProps = (dispatch, { history }) => {
//     return {
//         newStudent: (student) => dispatch(newStudent(student, history))
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(StudentCreate)