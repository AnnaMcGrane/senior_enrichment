import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const Schools = ({ schools }) => {
    return (
        <ul>
        <h2> Schools </h2>
        {
            schools.map( school => {
                return (
                    <li key={ school.id }>
                        <Link to={`/schools/${school.id}`}>{ school.name }</Link>
                    </li>
                )
            })
        }
        </ul>
    )
}

const mapStateToProps = ({ schools }) => {
    console.log({ schools }, 'schools.js')
    return {
        schools
    }
}

export default connect(mapStateToProps)(Schools)