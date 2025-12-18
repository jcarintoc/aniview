import { SlidersHorizontal } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { DatePicker } from "@/components/ui/date-picker";
import { formatDate } from "@/lib/utils/common";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDownIcon } from "lucide-react";
import { GENRES } from "@/lib/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ratingEnum,
  statusEnum,
  typeEnum,
  orderByEnum,
  sortEnum,
} from "@/type/enum";
import { scores, RATINGS, STATUS, SORT, TYPES, OrderBy } from "@/lib/data";

const dateRegex =
  /^(?:\d{4}|\d{4}-(0[1-9]|1[0-2])|\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;

const optionalDate = z.union([
  z.string().regex(dateRegex, {
    message: "Invalid date format. Use YYYY, YYYY-MM, or YYYY-MM-DD",
  }),
  z.literal(""),
]);

const formSchema = z.object({
  start_date: optionalDate.optional(),
  end_date: optionalDate.optional(),
  genres: z.array(z.number()).optional(),
  rating: ratingEnum.optional(),
  min_score: z.number().min(1).max(10).optional(),
  max_score: z.number().min(1).max(10).optional(),
  status: statusEnum.optional(),
  type: typeEnum.optional(),
  order_by: orderByEnum.optional(),
  sort: sortEnum.optional(),
});

const Sidebar = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      start_date: undefined,
      end_date: undefined,
      genres: undefined,
      rating: undefined,
      min_score: undefined,
      max_score: undefined,
      status: undefined,
      type: undefined,
      order_by: undefined,
      sort: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = {
      ...values,
      genres: values.genres?.length ? values.genres.join(",") : undefined,
    };

    console.log(payload);
  }

  return (
    <aside className=" w-full md:w-52 lg:w-60 p-2 rounded-2xl space-y-6">
      <div className="flex items-center gap-2">
        <SlidersHorizontal strokeWidth={3} className="size-4" />
        <h1 className="font-secondary">Filters</h1>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Start Date */}
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => {
              const dateValue =
                typeof field.value === "string" && field.value.length > 0
                  ? new Date(field.value)
                  : undefined;

              return (
                <FormItem>
                  <FormControl>
                    <DatePicker
                      className="border bg-transparent w-full font-secondary"
                      value={dateValue}
                      onChange={(date) => field.onChange(formatDate(date))}
                      placeholder="Start date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* End Date */}
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => {
              const dateValue =
                typeof field.value === "string" && field.value.length > 0
                  ? new Date(field.value)
                  : undefined;

              return (
                <FormItem>
                  <FormControl>
                    <DatePicker
                      className="border bg-transparent w-full font-secondary"
                      value={dateValue}
                      onChange={(date) => field.onChange(formatDate(date))}
                      placeholder="End date"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* Genres */}
          <FormField
            control={form.control}
            name="genres"
            render={({ field }) => (
              <div className="space-y-2">
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex justify-between items-center text-start py-1.5 px-3 rounded-md bg-transparent border border-border text-white w-full font-secondary hover:bg-accent hover:text-primary">
                    Genres
                    <ChevronDownIcon className="size-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full min-w-44 border-2 overflow-y-hidden">
                    <DropdownMenuLabel className="text-xs font-light">
                      Genres
                    </DropdownMenuLabel>
                    <ScrollArea className="flex flex-col w-full p-0 max-h-72">
                      {GENRES.map((genre) => (
                        <FormItem
                          key={
                            genre.mal_id + genre.name + genre.url + genre.count
                          }
                          className="w-full hover:bg-accent rounded-sm cursor-pointer"
                        >
                          {/* Wrap the whole row in a label for accessibility */}
                          <label className="flex items-center space-x-2 w-full px-2 py-1">
                            <Checkbox
                              id={`genre-${genre.mal_id}`}
                              checked={
                                field.value?.includes(genre.mal_id) ?? false
                              }
                              onCheckedChange={(checked) => {
                                const current = field.value ?? [];
                                field.onChange(
                                  checked
                                    ? [...current, genre.mal_id]
                                    : current.filter(
                                        (id) => id !== genre.mal_id
                                      )
                                );
                              }}
                            />
                            <span className="font-normal text-sm">
                              {genre.name}
                            </span>
                          </label>
                        </FormItem>
                      ))}
                    </ScrollArea>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          />

          {/* Ratings */}
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={field.value?.toString() ?? ""}
                    onValueChange={(val) =>
                      field.onChange(val === "" ? undefined : String(val))
                    }
                  >
                    <SelectTrigger className="bg-transparent border border-border text-white! w-full font-secondary hover:bg-accent hover:text-primary!">
                      <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Rating</SelectLabel>
                        {RATINGS.map((rating) => (
                          <SelectItem key={rating.label} value={rating.value}>
                            {rating.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={field.value?.toString() ?? ""}
                    onValueChange={(val) =>
                      field.onChange(val === "" ? undefined : String(val))
                    }
                  >
                    <SelectTrigger className="bg-transparent border border-border text-white! w-full font-secondary hover:bg-accent hover:text-primary!">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        {STATUS.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={field.value?.toString() ?? ""}
                    onValueChange={(val) =>
                      field.onChange(val === "" ? undefined : String(val))
                    }
                  >
                    <SelectTrigger className="bg-transparent border border-border text-white! w-full font-secondary hover:bg-accent hover:text-primary!">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Type</SelectLabel>
                        {TYPES.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Min and Max Score */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="min_score"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      value={field.value?.toString() ?? ""}
                      onValueChange={(val) =>
                        field.onChange(val === "" ? undefined : Number(val))
                      }
                    >
                      <SelectTrigger className="bg-transparent border border-border text-white! w-full font-secondary hover:bg-accent hover:text-primary!">
                        <SelectValue placeholder="Min score" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Min score</SelectLabel>
                          {scores.map((score) => (
                            <SelectItem key={score} value={score}>
                              {score}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="max_score"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      value={field.value?.toString() ?? ""}
                      onValueChange={(val) =>
                        field.onChange(val === "" ? undefined : Number(val))
                      }
                    >
                      <SelectTrigger className="bg-transparent border border-border text-white! w-full font-secondary hover:bg-accent hover:text-primary!">
                        <SelectValue placeholder="Max score" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Max score</SelectLabel>
                          {scores.map((score) => (
                            <SelectItem key={score} value={score}>
                              {score}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Order By */}
          <FormField
            control={form.control}
            name="order_by"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={field.value?.toString() ?? ""}
                    onValueChange={(val) =>
                      field.onChange(val === "" ? undefined : String(val))
                    }
                  >
                    <SelectTrigger className="bg-transparent border border-border text-white! w-full font-secondary hover:bg-accent hover:text-primary!">
                      <SelectValue placeholder="Order by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Order by</SelectLabel>
                        {OrderBy.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Sort */}
          <FormField
            control={form.control}
            name="sort"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    value={field.value?.toString() ?? ""}
                    onValueChange={(val) =>
                      field.onChange(val === "" ? undefined : String(val))
                    }
                  >
                    <SelectTrigger className="bg-transparent border border-border text-white! w-full font-secondary hover:bg-accent hover:text-primary!">
                      <SelectValue placeholder="Sort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Sort</SelectLabel>
                        {SORT.map((sort) => (
                          <SelectItem key={sort.value} value={sort.value}>
                            {sort.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="font-secondary">
            Submit
          </Button>
        </form>
      </Form>
    </aside>
  );
};

export default Sidebar;
