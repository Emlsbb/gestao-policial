import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { toast } from "react-toastify";

import { Sidebar } from "../../components/Sidebar";
import Background from "../../components/background";
import User from "../../components/User";

import backgroundImage from "../../assets/background.jpg";

import { index } from "../../services/dashboard-service";

import { Container } from "./styles";

const Dashboard = () => {
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const { data } = await index();

      const toData = [
        ["Type", "Count"],
        ["Procedimentos", data.proceduresCount],
        ["Tarefas", data.tasksCount],
        ["Solicitações", data.requestsCount],
      ];

      setData(toData);
    } catch (error) {
      toast.error("Falha ao buscar informações");
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Sidebar />
      <Background imageUrl={backgroundImage} />
      <Container>
        <h1 className="title">Dashboard</h1>

        <div className="pie_chart">
          <Chart
            chartType="PieChart"
            width="100%"
            height="400px"
            data={data}
            options={{
              backgroundColor: "transparent",
              pieHole: 0.4,
            }}
          />
        </div>
        <User />
      </Container>
    </>
  );
};

export default Dashboard;
