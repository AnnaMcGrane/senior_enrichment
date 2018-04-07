import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const Students = ({ students, count }) => {
    return (
        <ul>
        Students { count }
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
    )
}

const mapStateToProps = ({ students } ) => {
    console.log({students}, 'students.js')
    return {
        students,
        count: students.length
    }
}

export default connect(mapStateToProps)(Students)