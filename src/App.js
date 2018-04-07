import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux'

//IMPORT COMPONENTS
import Nav from './Nav'
import Student from './Student'
import Students from './Students'
import School from './School'
import Schools from './Schools'

//STORE IMPORT
import store from './store'
import { loadStudents, loadSchools } from './store'

class App extends React.Component{
    componentDidMount(){
        this.props.loadSchools()
        this.props.loadStudents()
    }
    render(){
        return (
            <Router>
              <div>
                <Nav />
                <Route exact path='/students' component = { Students } />
                <Route exact path='/schools' component = { Schools } />
                <Route exact path='/students/:id' render ={({ match })=> <Student id= { match.params.id*1 }/>} />
                <Route exact path='/schools/:id' render ={({ match })=> <School id= { match.params.id*1 }/>} />
              </div>
            </Router>
        );
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadSchools: ()=> dispatch(loadSchools()),
        loadStudents: ()=> dispatch(loadStudents()),
    }
}

export default connect(null, mapDispatchToProps)(App)