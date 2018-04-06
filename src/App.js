import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux'

import Nav from './Nav'
import Student from './Student'
import Students from './Students'

import store from './store'
import { loadStudents } from './store'

class App extends React.Component{
    componentDidMount(){
        this.props.loadStudents()
    }
    render(){
        return (
            <Router>
              <div>
                <Nav />
                    <Route exact path='/students' component = { Students } />
                    <Route exact path='/students/:id' render ={({match})=> <Student id={match.params.id*1}/>} />
              </div>
            </Router>
        );
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadStudents: ()=> dispatch(loadStudents())
    }
}

export default connect(null, mapDispatchToProps)(App)