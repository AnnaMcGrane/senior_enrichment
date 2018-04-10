import React from 'react'
import { connect } from 'react-redux'

class School extends React.Component{
    constructor(student){
        super()
        this.state = {
            firstName : ''
        }
    }
    render(){
        const { students } = this.props
        return (
            <div>

                <ul>
                    <h3> Students attending this school are: </h3>
                   {
                       students.map (student => <li key={student.id}> { student.firstName }</li>)
                   }
                </ul>
            </div>
        )
    }
}


const mapStateToProps = ({ students }, { id }) => {
    const _students = students.filter(student => student.schoolId === id)
    return { 
       students: _students
    }
}

export default connect(mapStateToProps)(School)