import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { toast } from "react-toastify";
import { Sidebar } from "../../components/Sidebar";
import Background from "../../components/background";
import User from "../../components/User";
import backgroundImage from "../../assets/backgroundIII.jpg";
import { index } from "../../services/dashboard-service";
import { Container } from "./styles";

const Dashboard = () => {
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const { data } = await index();

      const toData = [
        ["Type", "Count", { role: "style" }],
        ["Procedimentos", data.proceduresCount, "#3366CB"],
        ["Tarefas", data.tasksCount, "#DC3911"],
        ["Solicitações", data.requestsCount, "#FF9900"],
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
              backgroundColor: "grey",
              pieHole: 0,
              titleTextStyle: {
                color: "white", // Altere para a cor branca
              },
            }}
          />
        </div>

        <div className="bar_chart">
          <Chart
            chartType="BarChart"
            width="100%"
            height="400px"
            data={data}
            options={{
              backgroundColor: "grey",
              titleTextStyle: {
                color: "white", // Altere para a cor branca
              },
            }}
          />
        </div>
        <User />
      </Container>
    </>
  );
};

export default Dashboard;
