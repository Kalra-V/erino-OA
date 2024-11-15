import './App.css';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {
  return (
    <div className="App">
      <h2 style={{ color: '#2c3e50', textAlign: 'center' }}>Erino SDE Intern Assessment</h2>
      <h3 style={{ color: '#34495e', margin: '10px 0' }}>Name: Vansh Kalra</h3>
      <h3 style={{ color: '#34495e', margin: '10px 0' }}>Email: <span style={{ fontWeight: 'normal' }}>vanshkalra645@gmail.com</span></h3>
      <h3 style={{ color: '#34495e', margin: '10px 0' }}>Resume: <span><a target='_blank' href='https://green-hali-57.tiiny.site/' style={{ color: '#2980b9', textDecoration: 'underline' }}>link</a></span></h3>
      <ContactForm />
      <ContactList />
    </div>
  );
}

export default App;
