import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./productDetail.css";

const Product_API = "https://fakeapi.net/products";

const ProductDetail = () => {
  const { id } = useParams();
  console.log("ProductDetail rendered with id:", id);
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const fetchProduct = useCallback(async () => {
    setStatus("loading");
    setError("");

    try {
      const response = await fetch(`${Product_API}/${id}`);

      if (!response.ok) {
        throw new Error("Could not load this product.");
      }

      const result = await response.json();
      setProduct(result.data ?? result);
      setStatus("success");
    } catch (requestError) {
      setError(requestError.message);
      setStatus("error");
    }
  });

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (status === "loading") {
    return (
      <main className="product-detail-page">
        <p className="list-message">Loading product...</p>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="product-detail-page">
        <Link className="back-link" to="/">
          Back to products
        </Link>
        <div className="list-message error-message">
          <p>{error}</p>
          <Link className="primary-link" to="/">
            Return to products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="product-detail-page">
      <Link className="back-link" to="/">
        Back to products
      </Link>
      <article className="product-detail">
        <img
          className="product-detail-image"
          src={product.image}
          alt={product.title}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = `https://picsum.photos/seed/product-${product.id}/800/600`;
          }}
        />
        <div className="product-detail-content">
          <p className="product-category">
            {product.brand} / {product.category}
          </p>
          <div className="product-detail-heading">
            <h1>{product.title}</h1>
            <strong>${product.price.toFixed(2)}</strong>
          </div>
          <p className="product-detail-description">{product.description}</p>
          <div className="product-detail-facts">
            <span>Rating {product.rating.rate} / 5</span>
            <span>{product.rating.count} reviews</span>
            <span>{product.stock} in stock</span>
          </div>
          <dl className="product-detail-specs">
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
          <p className="product-detail-id">Product ID: {product.id}</p>
        </div>
      </article>
    </main>
  );
};

export default ProductDetail;
