import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../redux/store";

import { fetchAllImages } from "../../redux/imageSlice";
import "./HomePage.css";
import { Pagination } from "../../components/Pagination/Pagination";
import { getImage } from "../../utils/getImage";

const ITEMS_PER_PAGE = 10;

const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, data, error, lastValidData } = useSelector(
    (state: RootState) => state.images
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    dispatch(fetchAllImages());
  }, [dispatch]);

  const handleItemClick = (id: string) => {
    navigate(`/${id}/item`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) return <div>Loading...</div>;
  if (error && !lastValidData) return <div>Error: {error}</div>;

  const sortedData = data || lastValidData || {};
  const sortedEntries = Object.entries(sortedData).sort(([, a], [, b]) => a.index - b.index);
  const totalPages = Math.ceil(sortedEntries.length / ITEMS_PER_PAGE);
  const paginatedData = sortedEntries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container">
      <h1>Main Page</h1>
      <div className="grid">
        {paginatedData.map(([id, item]) => (
          <div
            key={id}
            className="grid-item"
            onClick={() => handleItemClick(id)}
          >
            <img src={getImage(item.image)} alt={item.title} />
            <div className="title">{id}</div>
          </div>
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
};

export default HomePage;
