import axios from "axios";
// import "../CSS/Dashboard.css";
import { useEffect, useState } from "react";
import { useToasts } from 'react-toast-notifications'

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [serving, setServing] = useState("");
    const [error, setError] = useState(null);
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    const headers = { authorization: `Bearer ${token}` };
    const { addToast } = useToasts();
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios
            .get("https://cheese-amore.onrender.com/product/getAll")
            .then((response) => {
                console.log(response);
                setProducts(response.data.data);
            })
            .catch((error) => {
                setError(error);
            });
    };

    const handleImageChange = (e) => {
        setImage(e.target.file);
    };

    const handleDelete = async (productID) => {
        try {
            await axios.delete(
                `https://cheese-amore.onrender.com/product/delete/${productID}`,
                {
                    headers,
                }
            );
            fetchProducts();
            addToast("Product deleted successfully", {
                appearance: 'success',
                autoDismiss: true,
            })
        } catch (error) {
            setError(error);
            addToast("Unable to delete user", {
                appearance: 'error',
                autoDismiss: true,
            })
        }
    };

    const handleAddProduct = async () => {
        const formData = new FormData();
        formData.append("Name", name);
        formData.append("Image", image);
        formData.append("Description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("serving", serving);

        try {
            await axios.post(
                `https://cheese-amore.onrender.com/product/add`,
                formData,
                {
                    headers,
                }
            );
            fetchProducts();
            addToast("Product added successfully", {
                appearance: 'success',
                autoDismiss: true,
            })
        } catch (error) {
            setError(error);
            addToast("Unable to add product", {
                appearance: 'error',
                autoDismiss: true,
            })
        }
    };

    const UpdateProduct = (e, product) => {
        e.preventDefault();
        setSelectedProduct(product);
        setProducts(product.products);
        setName(product.name);
        setImage(product.image);
        setDescription(product.description);
        setPrice(product.price);
        setServing(product.serving);
        setCategory(product.category);

    };
    console.log('selectedProduct', selectedProduct)
    const handleUpdateProduct = async (e, selectedProduct) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("image", image);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("serving", serving);
        try {
            await axios.put(
                `https://cheese-amore.onrender.com/product/update/${selectedProduct._id}`,
                {
                    formData
                },
                {
                    headers,
                }
            );

            fetchProducts();
            addToast("Product added successfully", {
                appearance: 'success',
                autoDismiss: true,
            })
        } catch (error) {
            setError(error);
            addToast("Unable to update product", {
                appearance: 'error',
                autoDismiss: true,
            })
        }
    };

    const [sortOrder, setSortOrder] = useState(true); // true for ascending order , false for descending
    const toggleSort = (field) => {
        const newSortedProducts = [...products].sort((a, b) => {
            // if(a[field]< b[field]) return -1 aw 1 if i want sortOrder true aw false

            if (a[field] < b[field]) return sortOrder ? -1 : 1;

            if (a[field] > b[field]) return sortOrder ? 1 : -1;

            return 0;
        });

        setProducts(newSortedProducts);
        setSortOrder(!sortOrder);
    };

    return (
        <div className="card-main">
            <h1 className="dashboard-title"> Products Table </h1>

            {error && <p className="error-message">{error.message}</p>}

            <button
                className="button button-primary"
                onClick={() => {
                    setShowAddModal(true);
                }}
            >
                Add product
            </button>
            <table className="table">
                <thead>
                    <tr>
                        <th onClick={() => toggleSort("name")}>Name</th>
                        <th onClick={() => toggleSort("image")}>Image</th>
                        <th onClick={() => toggleSort("description")}>Description</th>
                        <th onClick={() => toggleSort("price")}>Serving</th>
                        <th onClick={() => toggleSort("price")}>Price</th>
                        <th onClick={() => toggleSort("category")}>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((product) => (
                        <tr className="venue-table" key={product._id}>
                            <td>{product.name}</td>
                            <td>
                                <img src={product.image} alt={product.image} />
                            </td>
                            <td>{product.description}</td>
                            <td>{product.serving}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>
                                <button
                                    className="button button-primary"
                                    onClick={(e) => {
                                        UpdateProduct(e, product);
                                    }}
                                >
                                    Update
                                </button>
                                <button
                                    className="button button-secondary"
                                    onClick={() => {
                                        handleDelete(product._id);
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add Venue Modal */}
            {showAddModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span
                            className="close"
                            onClick={() => {
                                setShowAddModal(false);
                            }}
                        >
                            &times;
                        </span>
                        <h2>Add Product</h2>
                        <div className="form-input">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                            />
                        </div>
                        <div className="form-input">
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                            />
                        </div>
                        <div className="form-input">
                            <textarea
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="Category"
                            />
                        </div>
                        <div className="form-input">
                            <textarea
                                value={serving}
                                onChange={(e) => setServing(e.target.value)}
                                placeholder="Serving"
                            />
                        </div>
                        <div className="form-input">
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Price"
                            />
                        </div>
                        <div className="form-input">
                            <input type="file" onChange={handleImageChange} />
                        </div>

                        <button
                            className="button button-primary"
                            onClick={handleAddProduct}
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            )}

            {/* Update Venue Modal */}
            {showUpdateModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span
                            className="close"
                            onClick={() => {
                                setShowUpdateModal(false);
                            }}
                        >
                            &times;
                        </span>
                        <h2>Update Product</h2>
                        <div className="form-input">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                            />
                        </div>
                        <div className="form-input">
                            <input
                                type="text"
                                value={serving}
                                onChange={(e) => setServing(e.target.value)}
                                placeholder="Serving"
                            />
                        </div>
                        <div className="form-input">
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                            />
                        </div>
                        <div className="form-input">
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Price"
                            />
                        </div>
                        <div className="form-input">
                            <input type="file" onChange={handleImageChange} />
                        </div>
                        <div className="form-input">
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="Category"
                            />
                        </div>

                        <button
                            className="button button-primary"
                            onClick={(e) => handleUpdateProduct(e, selectedProduct)}
                        >
                            Update Product
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductTable;