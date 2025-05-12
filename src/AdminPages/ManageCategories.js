import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageCategories.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8084/api/categories/getAllCategories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleAddCategory = () => {
    if (newCategory) {
      axios.post('http://localhost:8084/api/categories/createCategory', { name: newCategory })
        .then(response => {
          setCategories([...categories, response.data]);
          setNewCategory('');
        })
        .catch(error => console.error('Error adding category:', error));
    }
  };

  const handleDeleteCategory = (id) => {
    axios.delete(`http://localhost:8084/api/categories/deleteCategories/${id}`)
      .then(() => {
        setCategories(categories.filter(category => category.id !== id));
      })
      .catch(error => console.error('Error deleting category:', error));
  };

  const handleEditCategory = (id, name) => {
    setIsEditing(true);
    setCategoryId(id);
    setNewCategory(name);
  };

  const handleUpdateCategory = () => {
    if (newCategory && categoryId !== null) {
      axios.put(`http://localhost:8084/api/categories/updateCategories/${categoryId}`, { name: newCategory })
        .then(response => {
          setCategories(categories.map(category =>
            category.id === categoryId ? response.data : category
          ));
          setIsEditing(false);
          setCategoryId(null);
          setNewCategory('');
        })
        .catch(error => console.error('Error updating category:', error));
    }
  };

  return (
    <div className="manage-categories-container">
      <h2>📂 Manage Categories</h2>
      <div className="category-input-section">
        <input
          type="text"
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
          placeholder="Enter category name"
        />
        {isEditing ? (
          <button className="update-btn" onClick={handleUpdateCategory}>Update</button>
        ) : (
          <button className="add-btn" onClick={handleAddCategory}>Add</button>
        )}
      </div>

      <div className="category-list">
        {categories.map(category => (
          <div className="category-card" key={category.id}>
            <h4>{category.name}</h4>
            <div className="action-buttons">
              <button onClick={() => handleEditCategory(category.id, category.name)} className="edit-btn">
                <FaEdit /> Edit
              </button>
              <button onClick={() => handleDeleteCategory(category.id)} className="delete-btn">
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCategories;
