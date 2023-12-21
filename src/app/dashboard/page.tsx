
import Navbar from "@/components/Navbar";



const DashBoard = () => {

  return (
    <div>
      <Navbar></Navbar>
      <div className="dashboard-content">
        <div className="user-input">
          <input type="text" />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
