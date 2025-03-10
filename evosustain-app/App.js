import React, { useState } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const drivers = [
  "John Doe", "Emma Smith", "Liam Johnson", "Olivia Brown", "Noah Williams", "Sophia Davis"
];

const londonRoutes = [
  "Oxford Street", "Tower Bridge", "Hyde Park", "Canary Wharf", "Greenwich Park",
  "Regent Street", "Piccadilly Circus", "Victoria Station", "London Eye", "Baker Street"
];

const elements = [
  { id: "1", type: "input", data: { label: "Client Scans QR Code" }, position: { x: 250, y: 50 } },
  { id: "2", data: { label: "Request Sent" }, position: { x: 250, y: 150 } },
  { id: "3", data: { label: "Alert Received at Central" }, position: { x: 250, y: 250 } },
  { id: "4", data: { label: "Route Assignment" }, position: { x: 250, y: 350 } },
  { id: "5", data: { label: "Pickup Completed" }, position: { x: 250, y: 450 } },
  { id: "6", type: "output", data: { label: "Report Generation" }, position: { x: 250, y: 550 } },
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3", animated: true },
  { id: "e3-4", source: "3", target: "4", animated: true },
  { id: "e4-5", source: "4", target: "5", animated: true },
  { id: "e5-6", source: "5", target: "6", animated: true }
];

export default function App() {
  const [requestSent, setRequestSent] = useState(false);
  const [alertReceived, setAlertReceived] = useState(false);
  const [routeAssigned, setRouteAssigned] = useState(false);
  const [pickupCompleted, setPickupCompleted] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [assignedRoutes, setAssignedRoutes] = useState([]);
  const [completedRoutes, setCompletedRoutes] = useState([]);

  const sendRequest = () => {
    setRequestSent(true);
    alert("Pickup request sent");
  };

  const receiveAlert = () => {
    setAlertReceived(true);
    alert("Alert received at central");
  };

  const assignRoutes = () => {
    const assigned = drivers.map(driver => ({
      driver,
      routes: [...londonRoutes]
    }));
    setAssignedRoutes(assigned);
    setRouteAssigned(true);
    alert("10 London routes assigned to each driver");
  };

  const completePickup = () => {
    setPickupCompleted(true);
    setCompletedRoutes(assignedRoutes);
    alert("Pickup completed");
  };

  const generateReport = () => {
    setReportGenerated(true);
    alert("Report generated");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold">EvoSustain App</h1>
      
      <Button className="bg-green-500 text-white p-3" onClick={sendRequest}>Request Pickup</Button>
      {requestSent && <Button className="bg-red-500 text-white p-3" onClick={receiveAlert}>Receive Alert at Central</Button>}
      {alertReceived && <Button className="bg-blue-500 text-white p-3" onClick={assignRoutes}>Assign 10 London Routes to Each Driver</Button>}
      {routeAssigned && <Button className="bg-orange-500 text-white p-3" onClick={completePickup}>Complete Pickup</Button>}
      {pickupCompleted && <Button className="bg-purple-500 text-white p-3" onClick={generateReport}>Generate Report</Button>}
      
      {routeAssigned && (
        <div className="bg-white p-4 rounded-lg shadow-lg w-3/4">
          <h2 className="text-xl font-bold">Assigned Routes</h2>
          {assignedRoutes.map(({ driver, routes }) => (
            <div key={driver} className="mt-4">
              <h3 className="text-lg font-semibold">{driver}</h3>
              <ul className="list-disc pl-5 text-sm">
                {routes.map(route => (
                  <li key={route}>{route}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {reportGenerated && (
        <div className="bg-white p-4 rounded-lg shadow-lg w-3/4 mt-4">
          <h2 className="text-xl font-bold">Pickup Report</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={completedRoutes}>
              <XAxis dataKey="driver" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="routes.length" fill="#4CAF50" name="Completed Routes" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div style={{ height: "500px", width: "80%", border: "1px solid #ddd" }}>
        <ReactFlow elements={elements} fitView style={{ width: "100%", height: "100%" }}>
          <MiniMap position="bottom-left" zoomable pannable />
          <Controls position="top-right" />
          <Background color="#ccc" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
}
