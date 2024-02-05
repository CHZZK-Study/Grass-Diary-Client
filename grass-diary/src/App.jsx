import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Page/Main";
import CreateDiary from "./Page/CreateDiary";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/creatediary" element={<CreateDiary />} />
      </Routes>
    </Router>
  );
};

export default App;
