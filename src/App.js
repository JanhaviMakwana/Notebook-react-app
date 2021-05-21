import React from 'react';
import AddNote from './components/AddNote/AddNote';
import UpdateNote from './components/UpdateNote/UpdateNote';
import Search from './components/Search/Search';
import NoteService from './services/NoteService';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      note: null,
      update: false
    }
  }

  upateNotesHandler = (id) => {
    NoteService.getNoteById(id)
      .then(res => {
        console.log(res);
        this.setState({ note: res, update: true })
      })
      .catch(err => {
        console.log(err);
      })
  }

  updateCloseHandler = () => {
    this.setState({ note: null, update: false })
  }

  render() {
    return (
      <div className="App">
        <div className="d-flex flex-row p-5">
          {!this.state.update
            ? <AddNote />
            : <UpdateNote note={this.state.note} updated={() => this.updateCloseHandler()} />}
          <Search click={(id) => this.upateNotesHandler(id)} />
        </div>
      </div>
    );
  }
}

export default App;
