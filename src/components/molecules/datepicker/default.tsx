import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atoms/popover/default";
import { Button } from "@/components/atoms/button/default";
import { Calendar } from "@/components/atoms/calendar/default";

// Define a type for the onChange prop
export type DateRangeChange = {
  startDate: string;
  endDate: string;
};

export function DatePickerWithRange({
  className,
  onChange,
}: React.HTMLAttributes<HTMLDivElement> & {
  onChange?: (data: DateRangeChange) => void;
}) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  // Function to format date range for output
  const formatDateRange = (): string => {
    if (!date?.from || !date?.to) {
      return ""; // Return an empty string if dates are not selected
    }
    const startDate = format(date.from, "yyyy-MM-dd");
    const endDate = format(date.to, "yyyy-MM-dd");
    return `startdate=${startDate}&enddate=${endDate}`;
  };

  // Update the URL query parameters when the date changes
  React.useEffect(() => {
    const queryString = formatDateRange();
    if (queryString) {
      const newUrl = `${window.location.pathname}?${queryString}`;
      window.history.replaceState({}, "", newUrl); // Update the URL without refreshing
    }
  }, [date]); // Only runs when the date changes

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span className="dark:text-gray-100 ">Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            className="!dark:text-gray-100 "
            onSelect={(data: DateRange | undefined) => {
              if (data && data.from && data.to) {
                const startDate = format(data.from, "yyyy-MM-dd");
                const endDate = format(data.to, "yyyy-MM-dd");
                setDate(data);
                if (onChange) {
                  onChange({ startDate, endDate });
                }
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
