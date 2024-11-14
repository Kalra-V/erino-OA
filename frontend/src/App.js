
import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {
  return (
    <div className="App">
      <h2>Eniro SDE Intern Assessment</h2>
      <h3>Name: Vansh Kalra</h3>
      <h3>Email: vanshkalra645@gmail.com</h3>
      <h3>Resume: <span><a target='_blank' href='https://green-hali-57.tiiny.site/'>link</a></span></h3>
      <ContactForm />
      <ContactList />
    </div>
  );
}

export default App;
