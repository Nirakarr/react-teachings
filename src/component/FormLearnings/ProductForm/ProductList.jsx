import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./productList.css";

const Product_API = "https://fakeapi.net/products";

const ProductList = () => {
  const [products, setproducts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  const fetchproducts = useCallback(async () => {
    setStatus("loading");
    setError("");

    try {
      const response = await fetch(`${Product_API}?limit=20`);

      if (!response.ok) {
        throw new Error("Could not load products.");
      }

      const result = await response.json();
      setproducts(result.data ?? []);
      setStatus("success");
    } catch (requestError) {
      setError(requestError.message);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchproducts();
  }, [fetchproducts]);

  const deleteProduct = async (id) => {
    setDeletingId(id);
    setDeleteError("");

    try {
      const response = await fetch(`${Product_API}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Could not delete this product.");
      }

      setproducts((currentProducts) =>
        currentProducts.filter((product) => product.id !== id),
      );
    } catch (requestError) {
      setDeleteError(requestError.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="list-page">
      <section className="list-header">
        <div>
          <p className="eyebrow">Coursework studio</p>
          <h1>Products</h1>
          <p>Review the latest product briefs from the demo service.</p>
        </div>
        <Link className="primary-link" to="/products/new">
          + Create Product
        </Link>
        <Link className="primary-link" to="/assignments/new">
          + Create Assignment
        </Link>
        <Link className="primary-link" to="/event/new">
          + Create Event
        </Link>
      </section>

      {status === "loading" && (
        <p className="list-message">Loading products...</p>
      )}

      {status === "error" && (
        <div className="list-message error-message">
          <p>{error}</p>
          <button type="button" onClick={fetchproducts}>
            Try again
          </button>
        </div>
      )}

      {status === "success" && products.length === 0 && (
        <p className="list-message">No products found.</p>
      )}

      {deleteError && (
        <p className="list-message error-message" role="alert">
          {deleteError}
        </p>
      )}

      {status === "success" && products.length > 0 && (
        <section className="product-list" aria-label="product list">
          {products.map((product, index) => (
            <article className="product-item" key={product.id}>
              <Link
                className="product-image-link"
                to={`/products/${product.id}`}
                aria-label={`View ${product.title}`}
              >
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.title}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = `https://picsum.photos/seed/product-${product.id}/400/300`;
                  }}
                />
              </Link>
              <div className="product-number">
                {String(index + 1).padStart(2, "0")}
              </div>
              <Link className="product-copy" to={`/products/${product.id}`}>
                <div className="product-heading">
                  <div>
                    <p className="product-category">
                      {product.brand} / {product.category}
                    </p>
                    <h2>{product.title}</h2>
                  </div>
                  <strong className="product-price">
                    ${product.price.toFixed(2)}
                  </strong>
                </div>
                <p>{product.description}</p>
                <div className="product-facts">
                  <span>Rating {product.rating.rate} / 5</span>
                  <span>{product.rating.count} reviews</span>
                  <span>{product.stock} in stock</span>
                </div>
                <dl className="product-specs">
                  <div>
                    <dt>Color</dt>
                    <dd>{product.specs.color}</dd>
                  </div>
                  <div>
                    <dt>Weight</dt>
                    <dd>{product.specs.weight}</dd>
                  </div>
                  <div>
                    <dt>Storage</dt>
                    <dd>{product.specs.storage}</dd>
                  </div>
                </dl>
              </Link>
              <span className="product-id">ID {product.id}</span>
              <div className="product-actions">
                <Link
                  className="product-action edit-action"
                  to={`/products/${product.id}/edit`}
                >
                  Edit Product
                </Link>
                <button
                  className="product-action delete-action"
                  type="button"
                  onClick={() => deleteProduct(product.id)}
                  disabled={deletingId === product.id}
                >
                  {deletingId === product.id ? "Deleting..." : "Delete Product"}
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default ProductList;
