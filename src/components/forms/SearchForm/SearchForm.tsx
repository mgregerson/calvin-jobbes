import React, { useState } from "react";
import "./SearchForm.css";

type InitialFormData = {
  term: string;
};

type SearchFormProps = {
  initialFormData?: InitialFormData;
  handleSearch: (term: string) => void;
};

const placeholderForm: InitialFormData = { term: '' };

function SearchForm({ initialFormData = placeholderForm, handleSearch }: SearchFormProps) {
  const [formData, setFormData] = useState<InitialFormData>(initialFormData);

  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const fieldName = evt.target.name;
    const value = evt.target.value;

    setFormData((currData) => {
      return { ...currData, [fieldName]: value };
    });
  }

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    handleSearch(formData.term);
  }

  return (
    <div className="SearchForm mb-4 d-flex pt-4">
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-center justify-content-lg-start gx-1">
          <div className="col-8">
            <input
              id="search-term"
              name="term"
              className="form-control form-control-lg"
              placeholder="Search"
              onChange={handleChange}
              value={formData.term}
              aria-label="Search"
            />
          </div>
          <div className="col-auto">
            <button className="btn search-btn btn-lg btn-primary">
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
