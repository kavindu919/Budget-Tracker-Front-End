import type React from "react";

import FormDropdown from "./FormDropdown";
import FormInput from "./FormInput";
import { QueryProps } from "@/utils/interfaces/categoryInterface";

interface FilterProps {
  query: QueryProps;
  setQuery: React.Dispatch<React.SetStateAction<QueryProps>>;
}

const CategoryFilters = ({ setQuery, query }: FilterProps) => {
  const handleChnage = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <form className="flex w-full flex-col items-center justify-between gap-4 md:flex-row md:items-end md:gap-3">
      <section>
        <FormInput
          name="search"
          type="text"
          label=""
          placeholder="Search issue title"
          onChange={handleChnage}
          value={query.search}
        />
      </section>
      <fieldset className="grid grid-cols-2 gap-3 md:flex md:gap-3">
        <FormDropdown
          label="Type"
          name="type"
          options={[
            { value: "", label: "All" },
            { value: "income", label: "Income" },
            { value: "expense", label: "Expense" },
          ]}
          value={query.type}
          onChange={handleChnage}
        />
        <FormDropdown
          label="Sort by"
          name="sortBy"
          options={[
            { value: "createdAt", label: "Created date" },
            { value: "updatedAt", label: "Updated date" },
          ]}
          value={query.sortBy}
          onChange={handleChnage}
        />
        <FormDropdown
          label="Sort order"
          name="sortOrder"
          options={[
            { value: "desc", label: "Newest first" },
            { value: "asc", label: "Oldest first" },
          ]}
          value={query.sortOrder}
          onChange={handleChnage}
        />
      </fieldset>
    </form>
  );
};

export default CategoryFilters;
