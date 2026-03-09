import type React from "react";
import { useCallback } from "react";
import FormDropdown from "./FormDropdown";
import FormInput from "./FormInput";
import { categoryInterface } from "@/utils/interfaces/categoryInterface";
import { TransactionQueryProps } from "@/utils/interfaces/transactionInterface";

interface FilterProps {
  query: TransactionQueryProps;
  setQuery: React.Dispatch<React.SetStateAction<TransactionQueryProps>>;
  categories: categoryInterface[];
}

const TransactionFilters = ({ setQuery, query, categories }: FilterProps) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      setQuery((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        page: 1,
      }));
    },
    [setQuery],
  );

  const categoryOptions = [
    { value: "", label: "All Categories" },
    ...categories.map((cat) => ({ value: cat.id!, label: cat.name })),
  ];

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row md:items-end md:gap-3">
      <section>
        <FormInput
          name="search"
          type="text"
          label=""
          placeholder="Search "
          onChange={handleChange}
          value={query.search}
        />
      </section>
      <fieldset className="grid grid-cols-2 gap-3 md:flex md:gap-3">
        <FormDropdown
          label="Type"
          name="type"
          options={[
            { value: "", label: "All Types" },
            { value: "income", label: "Income" },
            { value: "expense", label: "Expense" },
          ]}
          value={query.type}
          onChange={handleChange}
        />
        <FormDropdown
          label="Category"
          name="categoryId"
          options={categoryOptions}
          value={query.categoryId}
          onChange={handleChange}
        />
        <FormInput
          name="startDate"
          type="date"
          label="From"
          placeholder=""
          onChange={handleChange}
          value={query.startDate ?? ""}
        />
        <FormInput
          name="endDate"
          type="date"
          label="To"
          placeholder=""
          onChange={handleChange}
          value={query.endDate ?? ""}
          min={query.startDate ?? ""}
        />
        <FormDropdown
          label="Sort by"
          name="sortBy"
          options={[
            { value: "date", label: "Date" },
            { value: "amount", label: "Amount" },
            { value: "title", label: "Title" },
          ]}
          value={query.sortBy}
          onChange={handleChange}
        />
        <FormDropdown
          label="Sort order"
          name="sortOrder"
          options={[
            { value: "desc", label: "Newest first" },
            { value: "asc", label: "Oldest first" },
          ]}
          value={query.sortOrder}
          onChange={handleChange}
        />
      </fieldset>
    </div>
  );
};

export default TransactionFilters;
