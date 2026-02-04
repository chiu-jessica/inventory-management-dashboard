import logo from './logo.svg';
import './App.css';
import React from 'react';

const inventory = [
  {
    id: 1,
    name: "Arduino Kit",
    category: "Hardware",
    quantity: 5,
    status: "Available"
  },
  {
    id: 2,
    name: "Figma License",
    category: "Software",
    quantity: 20,
    status: "Available"
  }
];

const InventoryList = () => {
  return (
    <div className="inventory">
      <h2>Open Project Inventory</h2>
      <div className="table-wrap">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => (
              <tr key={item.id} className={item.status === 'Available' ? 'available' : 'unavailable'}>
                <td data-label="Name">{item.name}</td>
                <td data-label="Category">{item.category}</td>
                <td data-label="Quantity">{item.quantity}</td>
                <td data-label="Status">
                  <span className={"status-badge " + (item.status === 'Available' ? 'status-available' : 'status-unavailable')}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Inventory Dashboard</h1>
      </header>
      <main>
        <InventoryList />
      </main>
    </div>
  );
}

export default App;
