import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import "./ItemPage.css";

const ItemPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data } = useSelector((state: RootState) => state.images);

  if (!id) {
    return <div>Invalid item ID</div>;
  }

  const item = data ? data[id] : null;

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="item-page">
      <div className="item-container">
        <img src={item.image} alt={item.title} />
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
      <button onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
};

export default ItemPage;
