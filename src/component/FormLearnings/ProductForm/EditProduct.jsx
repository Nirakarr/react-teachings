import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./createProductForm.css";

const Product_API = "https://fakeapi.net/products";

const emptyForm = {
  title: "",
  description: "",
  category: "",
  price: "",
  stock: "",
  brand: "",
  image: "",
  ratingRate: "",
  ratingCount: "",
  color: "",
  weight: "",
  storage: "",
};

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState({
    type: "loading",
    message: "Loading product...",
  });
  const fetchProduct = useCallback(async () => {
    setStatus({ type: "loading", message: "Loading product..." });

    try {
      const response = await fetch(`${Product_API}/${id}`);
      if (!response.ok) {
        throw new Error("Could not load this product.");
      }

      const result = await response.json();
      const product = result.data ?? result;
      setForm({
        title: product.title ?? "",
        description: product.description ?? "",
        category: product.category ?? "",
        price: String(product.price ?? ""),
        stock: String(product.stock ?? ""),
        brand: product.brand ?? "",
        image: product.image ?? "",
        ratingRate: String(product.rating?.rate ?? ""),
        ratingCount: String(product.rating?.count ?? ""),
        color: product.specs?.color ?? "",
        weight: product.specs?.weight ?? "",
        storage: product.specs?.storage ?? "",
      });
      setStatus({ type: "", message: "" });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "loading", message: "Saving product..." });

    try {
      const response = await fetch(`${Product_API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          category: form.category,
          price: Number(form.price),
          stock: Number(form.stock),
          brand: form.brand,
          image: form.image,
          rating: {
            rate: Number(form.ratingRate),
            count: Number(form.ratingCount),
          },
          specs: {
            color: form.color,
            weight: form.weight,
            storage: form.storage,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update product.");
      }

      navigate("/");
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  if (status.type === "loading" && !form.title) {
    return (
      <main className="product-page">
        <p className="list-message">{status.message}</p>
      </main>
    );
  }

  if (status.type === "error" && !form.title) {
    return (
      <main className="product-page">
        <p className="form-status error" role="alert">
          {status.message}
        </p>
        <Link className="back-link" to="/">
          Back to products
        </Link>
      </main>
    );
  }

  return (
    <main className="product-page">
      <section className="product-intro">
        <p className="eyebrow">Admin Panel</p>
        <h1>Edit Product</h1>
        <p>Update the product information shown in the product list.</p>
      </section>

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="field field-wide">
            Product Title
            <input
              name="title"
              value={form.title}
              onChange={updateField}
              required
            />
          </label>
          <label className="field field-wide">
            Product Description
            <textarea
              name="description"
              value={form.description}
              onChange={updateField}
              rows="5"
              required
            />
          </label>
          <label className="field">
            Category
            <input
              name="category"
              value={form.category}
              onChange={updateField}
              required
            />
          </label>
          <label className="field">
            Price
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={updateField}
              min="0"
              step="0.01"
              required
            />
          </label>
          <label className="field">
            Stock Quantity
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={updateField}
              min="0"
              required
            />
          </label>
          <label className="field">
            Brand
            <input
              name="brand"
              value={form.brand}
              onChange={updateField}
              required
            />
          </label>
          <label className="field field-wide">
            Product Image URL
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={updateField}
              required
            />
          </label>
          <label className="field">
            Rating
            <input
              type="number"
              name="ratingRate"
              value={form.ratingRate}
              onChange={updateField}
              min="0"
              max="5"
              step="0.1"
              required
            />
          </label>
          <label className="field">
            Review Count
            <input
              type="number"
              name="ratingCount"
              value={form.ratingCount}
              onChange={updateField}
              min="0"
              required
            />
          </label>
          <label className="field">
            Color
            <input
              name="color"
              value={form.color}
              onChange={updateField}
              required
            />
          </label>
          <label className="field">
            Weight
            <input
              name="weight"
              value={form.weight}
              onChange={updateField}
              required
            />
          </label>
          <label className="field">
            Storage
            <input
              name="storage"
              value={form.storage}
              onChange={updateField}
              required
            />
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={status.type === "loading"}>
            {status.type === "loading" ? "Saving..." : "Save Changes"}
          </button>
          <Link className="back-link" to="/">
            Cancel
          </Link>
          {status.type === "error" && (
            <p className="form-status error" role="alert">
              {status.message}
            </p>
          )}
        </div>
      </form>
    </main>
  );
};

export default EditProduct;
