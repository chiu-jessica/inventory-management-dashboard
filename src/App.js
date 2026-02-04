import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

const InventoryList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:4000/inventory');
      if (!res.ok) throw new Error('Server error: ' + res.status);
      const data = await res.json();
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const category = form.category.value.trim();
    const quantity = Number(form.quantity.value);
    const status = form.status.value;

    if (!name || !category || !Number.isFinite(quantity)) {
      alert('Please fill in valid values.');
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, category, quantity, status })
      });
      if (!res.ok) throw new Error('Failed to add item');
      const newItem = await res.json();
      setItems(prev => [...prev, newItem]);
      form.reset();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>Loading inventory...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="inventory">
      <h2>Open Project Inventory</h2>

      <form className="add-form" onSubmit={handleAdd}>
        <input name="name" placeholder="Name" required />
        <input name="category" placeholder="Category" required />
        <input name="quantity" placeholder="Quantity" type="number" min="0" required />
        <select name="status" defaultValue="Available">
          <option>Available</option>
          <option>Unavailable</option>
        </select>
        <button type="submit">Add Item</button>
      </form>

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
            {items.map(item => (
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
