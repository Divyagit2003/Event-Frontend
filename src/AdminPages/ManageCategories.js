import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageCategories.css';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  // Fetch categories from backend
  useEffect(() => {
    axios.get('http://localhost:8083/api/categories/getAllCategories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  // Handle category addition
  const handleAddCategory = () => {
    if (newCategory) {
      axios.post('http://localhost:8083/api/categories/createCategory', 
        { name: newCategory },
        {
          headers: {
            'Content-Type': 'application/json', // Ensure Content-Type is JSON
          },
        })
        .then(response => {
          setCategories([...categories, response.data]);
          setNewCategory('');
        })
        .catch(error => console.error('Error adding category:', error));
    }
  };

  // Handle category deletion
  const handleDeleteCategory = (id) => {
    axios.delete(`http://localhost:8083/api/categories/deleteCategories/${id}`)
      .then(() => {
        setCategories(categories.filter(category => category.id !== id));
      })
      .catch(error => console.error('Error deleting category:', error));
  };

  // Handle category edit (optional)
  const handleEditCategory = (id, name) => {
    setIsEditing(true);
    setCategoryId(id);
    setNewCategory(name);
  };

  // Handle updating category
  const handleUpdateCategory = () => {
    if (newCategory && categoryId !== null) {
      axios.put(`http://localhost:8083/api/categories/updateCategories/${categoryId}`, { name: newCategory })
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
      <h2>Manage Categories</h2>
      <div>
        <input 
          type="text" 
          value={newCategory} 
          onChange={e => setNewCategory(e.target.value)} 
          placeholder="Category Name" 
        />
        {isEditing ? (
          <button onClick={handleUpdateCategory}>Update Category</button>
        ) : (
          <button onClick={handleAddCategory}>Add Category</button>
        )}
      </div>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            {category.name} 
            <button onClick={() => handleEditCategory(category.id, category.name)}>Edit</button>
            <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCategories;
