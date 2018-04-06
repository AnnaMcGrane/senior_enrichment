const express = require('express');
const path = require('path');
const app = express();

app.use(require('body-parser').json());

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

//ROUTES -- STUDENTS

app.get('/api/students', (req, res, next)=> {
    Student.findAll()
      .then( students => res.send(students))
      .catch(next);
})

app.put('/api/students/:id', (req, res, next)=> {
    Student.findById(req.params.id)
      .then( student => {
        Object.assign(student, req.body)
        return student.save();
      })
      .then( student => res.send(student))
      .catch(next);
  })
  
  app.delete('/api/students/:id', (req, res, next)=> {
    Student.findById(req.params.id)
      .then( student => {
        return student.destroy();
      })
      .then( () => res.sendStatus(204))
      .catch(next);
  })
  
  app.post('/api/students', (req, res, next)=> {
    Student.create(req.body)
      .then( student => res.send(student))
      .catch(next);
  })

//PORT

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}`));


//SEQUELIZE
const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/my_db');

//DATABASE
const School = conn.define('school', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING
  }
});

const Student = conn.define('student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
            }
        },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
            }
        },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
            }
        },
    GPA: {
        type: Sequelize.DECIMAL,
        },
    },{
    getterMethods: {
        fullName:  function() {
            return this.firstName + ' ' + this.lastName
        }
    },
})



//SYNC AND SEED THE DATABASE

// Student.belongsTo(School)
// School.hasMany(Student);


conn.sync({ force: true })
  .then( ()=> Promise.all([
    Student.create({firstName: 'Anna', lastName: 'McGrane', GPA: 6, email: 'anna@nyu.edu'}),
    Student.create({firstName: 'Gavin', lastName: 'McGrane', GPA: 8, email: 'gavin@lowell.edu'}),
    Student.create({firstName: 'Sally', lastName: 'McGrane', GPA: 7, email: 'sally@ucb.edu'}),
    ])
//   .then(([NYU, UCB, Lowell]) => {
//         return Promise.all ([
//             Anna.setSchool(NYU),
//             Gavin.setSchool(Lowell),
//             Sally.setSchool(UCB)
//         ])
//     })
);




// School.create({ name: NYU, image: ''}),
// School.create({ name: Lowell, image: ''}),
// School.create({ name: UCB, image: ''})







//ROUTES - SCHOOL
app.get('/api/schools', (req, res, next)=> {
    School.findAll()
      .then( schools => res.send(schools))
      .catch(next);
  })
  
  app.put('/api/schools/:id', (req, res, next)=> {
    School.findById(req.params.id)
      .then( school => {
        Object.assign(school, req.body)
        return school.save();
      })
      .then( school => res.send(school))
      .catch(next);
  })
  
  app.delete('/api/schools/:id', (req, res, next)=> {
    School.findById(req.params.id)
      .then( school => {
        return school.destroy();
      })
      .then( () => res.sendStatus(204))
      .catch(next);
  })
  
  app.post('/api/schools', (req, res, next)=> {
    School.create(req.body)
      .then( school => res.send(school))
      .catch(next);
  })