import { FiFilter } from "react-icons/fi";

import "./styles.css";

// eslint-disable-next-line react/prop-types
const SearchBox = ({ value, setValue, setFilterVisible }) => {
  return (
    <div className="search_box">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="search_box_input"
        placeholder="Pesquisar..."
      />

      <div className="filters" onClick={() => setFilterVisible(true)}>
        <p>Filtrar por</p>
        <FiFilter color="white" size={24} />
      </div>
    </div>
  );
};

export default SearchBox;
