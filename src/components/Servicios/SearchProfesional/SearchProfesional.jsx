import SearchChips from "./SearchChips";
import SearchSpecialty from "./SearchSpecialty";
import SearchInput from "./SearchInput";

const SearchProfesional = () => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col sm:flex-row gap-5  p-5 rounded-md">
        <SearchInput />
        <SearchSpecialty />
      </div>
      <SearchChips />
    </div>
  );
};

export default SearchProfesional;
