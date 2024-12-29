import { Card } from "@/components/atoms/card/default";
import ReadOnlyStarRating from "../ratingStar/default";

const TableMobile = ({ data }: { data: any }) => {
  if (data?.length === 0) {
    return <div>No data found</div>;
  }
  return (
    <div className="flex flex-col gap-2">
      {data?.map((item: any) => {
        return (
          <Card className="relative flex flex-col w-full text-lg text-black border shadow-md">
            <div className="flex items-center gap-2 w-ful">
              <div className="w-[120px] h-[120px] flex items-center">
                <img
                  src={item.image}
                  // width={120}
                  // height={120}
                  className="p-2 w-[120px] h-[120px]"
                  alt={item.title}
                />
              </div>
              <div className="flex flex-col w-full pe-3">
                {/* price */}
                <div className="flex items-center justify-between w-full gap-4">
                  <h3 className="font-semibold text-md dark:text-gray-100 ">
                    {item.title}
                  </h3>
                  <p className="text-sm font-bold text-gray-600 dark:text-gray-100 whitespace-nowrap">
                    {item.price} $
                  </p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 ">
                  {item.description}
                </p>
                {/* rating */}
                <p className="text-sm font-bold text-gray-600 dark:text-gray-100 ms-auto bottom-2 right-2">
                  <ReadOnlyStarRating rating={item.rating?.rate} />
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default TableMobile;
