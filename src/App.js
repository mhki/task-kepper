import React from 'react';
import axios from 'axios';
import Header from './components/Header'

// import { populate } from '../models/taskReminder';

class App extends React.Component { 

  state = {
    task:'',
    date:'',
    time:'',
    posts: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      task:'',
      date:'',
      time:'',
      posts: [],
      showAddTask: false
    };
  }

  

  componentDidMount =() => {
    this.getTaskReminder();
    alert("Authentication comming soon!!");
  };

  getTaskReminder = () => {
    axios.get('/api')
    .then((response) => {
      const data = response.data;
      this.setState({ posts: data});
      console.log("Data has been recieved!!");
    })
    .catch(() => {
      alert("Error recieving data!!")
    });
  }


  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value
    });
  };

  submit = (event) => {
    event.preventDefault();

    const payload = {
      task: this.state.task,
      date: this.state.date,
      time: this.state.time,
    };

    axios({
      url:'/save',
      method: 'POST',
      data: payload
    })
    .then(()=>{
      console.log('Data has been sent to server');
      this.resetUserInputs();
      this.getTaskReminder();
    })
    .catch(()=>{
      console.log("Internal server error")
    });
  };

  resetUserInputs = () => {
    this.setState({
      task: '',
      date: '',
      time: '',
    });
  };

  displayTaskReminder = (posts) => {
    
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div className="task" key={index}>
        <h3>{post.task}</h3>
        <p>{post.date} at {post.time}</p>
      </div>
    ));

  };

  render(){
    console.log('State: ', this.state);
    return(
     
        <div className="container">
     
          <Header onAdd={() => 
            this.setState({ showAddTask: 
            !this.state.showAddTask})}  showAdd={this.state.showAddTask} />
          {this.state.showAddTask &&
            <form className="add-form" onSubmit={this.submit} >
              <div className="form-control">
                <label className="form-label">Task</label>
                <input type="text" name="task" placeholder="Task" 
                value={this.state.task}
                onChange={this.handleChange}/>
              </div>
              <div className="form-control">
                <label className="form-label">Date</label>
                <input type="date" name="date" placeholder="Date" 
                value={this.state.date} onChange={this.handleChange}/>
              </div>
              <div className="form-control">
                <label className="form-label">Time</label>
                <input type="time" name="time" placeholder="Time" 
                value={this.state.time} onChange={this.handleChange}/>
              </div>
              <button className="btn btn-block">Submit</button>
            </form>
          }
         
          <div className="task">
            
            {this.displayTaskReminder(this.state.posts)}
          </div>
        </div>

      )
}
}

export default App;
