import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useAxios from "@/apis/axios";

const baseUrl = "https://fakestoreapi.com";

export const useServices = () => {
  const axiosInstance = useAxios();

  // Fetch products with optional date range parameters
  const getProducts = async (
    startDate?: string,
    endDate?: string
  ): Promise<any> => {
    console.log("Fetching products with date range:", startDate, endDate);
    // Create a URL with date query parameters if provided
    const url = new URL(
      `${baseUrl}/products${
        startDate !== undefined && startDate
          ? `?startdate=${startDate}&enddate=${endDate}`
          : ""
      }`
    );

    const response = await axiosInstance.get(url.toString());
    return response.data;
  };

  // Create a React Query hook for fetching products, accepting date range parameters
  const useProductsQuery = (
    startDate?: string,
    endDate?: string
  ): UseQueryResult<any, Error> => {
    console.log("useProductsQuery", startDate, endDate);
    return useQuery({
      queryKey: ["products", startDate, endDate], // Include dates in the query key for caching
      queryFn: () => getProducts(startDate, endDate), // Provide the function to fetch data
      staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    });
  };

  return { useProductsQuery };
};
