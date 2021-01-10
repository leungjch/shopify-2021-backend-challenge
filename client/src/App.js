import logo from './logo.svg';
import './App.css';
import { FormControl, Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">


      <Form>
        <div className="mb-3">
          <Form.File id="formcheck-api-custom" custom>
            <Form.File.Input isValid />
            <Form.File.Label data-browse="Upload">
              Upload Image(s)
      </Form.File.Label>
            <Form.Control.Feedback type="valid">Successfully uploaded!</Form.Control.Feedback>
          </Form.File>
        </div>
      </Form>





    </div>
  );
}

export default App;
