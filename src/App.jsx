import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import JobSearch from "@/pages/JobSearch";
import Applications from "@/pages/Applications";
import Resume from "@/pages/Resume";
import JobAlerts from "@/pages/JobAlerts";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <main className="pb-12">
          <Routes>
            <Route path="/" element={<JobSearch />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/alerts" element={<JobAlerts />} />
          </Routes>
        </main>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="shadow-lg"
          bodyClassName="font-medium"
        />
      </div>
    </Router>
  );
}

export default App;