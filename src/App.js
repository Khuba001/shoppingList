import { useState } from "react";

export default function App() {
  const initalItems = [
    {
      id: 1,
      name: "Apple",
      quantity: 4,
      isPacked: false,
    },
    {
      id: 2,
      name: "Milk",
      quantity: 4,
      isPacked: false,
    },
    {
      id: 3,

      name: "Juice",
      quantity: 4,
      isPacked: false,
    },
  ];

  const [items, setItems] = useState(initalItems);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handlePackItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isPacked: !item.isPacked } : item
      )
    );
  }

  function handleRemoveItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div className="App">
      <ShoppingList
        items={items}
        handleAddItems={handleAddItems}
        handlePackItems={handlePackItems}
        handleRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

function ShoppingList({
  items,
  handleAddItems,
  handlePackItems,
  handleRemoveItem,
}) {
  return (
    <div>
      <Header />
      <AddItem handleAddItems={handleAddItems} />
      <ItemList
        items={items}
        handlePackItems={handlePackItems}
        handleRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

function Header() {
  return <h1 className="header">Shopping List</h1>;
}

function AddItem({ handleAddItems }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) return;
    const newItem = {
      id: crypto.randomUUID(),
      name: name,
      quantity: quantity,
      isPacked: false,
    };
    handleAddItems(newItem);

    setName("");
    setQuantity(1);
  }

  return (
    <form onSubmit={handleSubmit} type="submit" className="add-item">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Add an item..."
      />
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num}>{num}</option>
        ))}
      </select>
      <button>➕</button>;
    </form>
  );
}

function ItemList({ items, handlePackItems, handleRemoveItem }) {
  return (
    <ul className="item-list">
      {items.map((item) => (
        <Item
          item={item}
          handlePackItems={handlePackItems}
          handleRemoveItem={handleRemoveItem}
        />
      ))}
    </ul>
  );
}

function Item({ item, handlePackItems, handleRemoveItem }) {
  return (
    <li className="item">
      {item.name} x{item.quantity}{" "}
      {item.isPacked ? (
        <div>
          <button onClick={() => handlePackItems(item.id)}>UnPack</button>
          <button onClick={() => handleRemoveItem(item.id)}>Delete</button>
        </div>
      ) : (
        <div>
          {" "}
          <button onClick={() => handlePackItems(item.id)}>Pack</button>
          <button onClick={() => handleRemoveItem(item.id)}>Delete</button>
        </div>
      )}
    </li>
  );
}
