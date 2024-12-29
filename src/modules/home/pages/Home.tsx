import LayoutPrimary from "@/components/sections/layouts/LayoutPrimary";
import NavbarPrimary from "@/components/sections/navbar/Primary";
import { useServices } from "../services/services";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { format } from "date-fns"; // Importing the format function
import InputPrimary from "@/components/atoms/input/primary";
import { DatePickerWithRange } from "@/components/molecules/datepicker/default"; // Ensure correct import
import useDebounce from "@/components/utils/debounce";
import TablePrimary from "@/components/molecules/table/primary";

type DateRange = {
  startDate?: Date;
  endDate?: Date;
};

type Product = {
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
  rating?: {
    rate?: number;
    count?: number;
  };
};

const HomePage = () => {
  const { useProductsQuery } = useServices();

  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [filter, setFilter] = useState<string>(""); // State for filter input
  const debouncedFilter = useDebounce(filter, 500); // Use 2 seconds debounce

  const formattedStartDate = dateRange?.startDate
    ? format(dateRange.startDate, "yyyy-MM-dd")
    : undefined;

  const formattedEndDate = dateRange?.endDate
    ? format(dateRange.endDate, "yyyy-MM-dd")
    : undefined;

  // Use formatted dates in the query
  const {
    data: products,
    isLoading,
    error,
  } = useProductsQuery(formattedStartDate, formattedEndDate);

  // Handle error showing
  useEffect(() => {
    if (error) {
      toast.error(`Error fetching products: ${error.message}`);
    }
  }, [error]);

  // Define columns for the table
  const columns = useMemo(() => {
    return [
      {
        key: "image",
        header: "Product Title",
        Cell: (row: Product) => (
          <img
            className="w-[60px] h-[60px] rounded-full"
            src={row.image ?? ""}
          />
        ),
      },
      {
        key: "title",
        header: "Product Title",
        Cell: (row: Product) => <strong>{row.title ?? "-"}</strong>,
      },
      {
        key: "price",
        header: "Price",
        Cell: (row: Product) => <span>${row.price ?? "-"}</span>,
      },
      {
        key: "description",
        header: "Description",
        Cell: (row: Product) => (
          <em className="line-clamp-2">{row.description ?? "-"}</em>
        ),
      },
      {
        key: "category",
        header: "Category",
        Cell: (row: Product) => <em>{row.category ?? "-"}</em>,
      },
    ];
  }, []);

  // Function to filter products based on the input
  const filteredProducts = useMemo(() => {
    return products?.filter((product: any) =>
      product.title?.toLowerCase().includes(debouncedFilter.toLowerCase())
    );
  }, [products, debouncedFilter]);

  return (
    <LayoutPrimary navbar={<NavbarPrimary />}>
      <div className="flex flex-col items-center justify-center p-2 ">
        <div className="max-w-[1440px] flex flex-col w-full gap-2">
          <div className="flex justify-start w-full gap-4">
            <div>
              <DatePickerWithRange
                onChange={(data: any) => {
                  setDateRange({
                    startDate: new Date(data.startDate), // Convert string to Date
                    endDate: new Date(data.endDate), // Convert string to Date
                  });
                }}
              />
            </div>
            <div className="w-full max-w-[240px]">
              <InputPrimary
                placeholder="item name ..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)} // Update filter state
              />
            </div>
          </div>
          {error && (
            <div className="text-red-500">
              Error fetching products: {error.message}
            </div>
          )}

          <>
            <TablePrimary
              columns={columns}
              data={filteredProducts} // Use filtered products
              loading={isLoading}
            />
          </>
        </div>
      </div>
    </LayoutPrimary>
  );
};

export default HomePage;
