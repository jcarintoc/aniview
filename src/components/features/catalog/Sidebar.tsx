import { SlidersHorizontal } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, Activity, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { GetAllAnimeParams } from "@/type/anime";
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
import { ChevronDownIcon, FunnelX } from "lucide-react";
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
import Select01 from "@/components/ui/select-01";
import useMobile from "@/hooks/useMobile";

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

interface SidebarProps {
  initialParams?: GetAllAnimeParams;
  onFiltersChange: (params: GetAllAnimeParams) => void;
}

const Sidebar = ({ initialParams, onFiltersChange }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const isMobile = useMobile(768);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isMobile]);

  const handleToggleFilters = () => {
    setIsOpen((prev) => !prev);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      start_date: initialParams?.start_date,
      end_date: initialParams?.end_date,
      genres: initialParams?.genres,
      rating: initialParams?.rating,
      min_score: initialParams?.min_score,
      max_score: initialParams?.max_score,
      status: initialParams?.status,
      type: initialParams?.type,
      order_by: initialParams?.order_by,
      sort: initialParams?.sort,
    },
  });

  // Update form when initialParams change (e.g., from URL)
  useEffect(() => {
    if (initialParams) {
      form.reset({
        start_date: initialParams.start_date,
        end_date: initialParams.end_date,
        genres: initialParams.genres,
        rating: initialParams.rating,
        min_score: initialParams.min_score,
        max_score: initialParams.max_score,
        status: initialParams.status,
        type: initialParams.type,
        order_by: initialParams.order_by as
          | z.infer<typeof orderByEnum>
          | undefined,
        sort: initialParams.sort as z.infer<typeof sortEnum> | undefined,
      });
    }
  }, [initialParams, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Convert form values to API params format
    const params: GetAllAnimeParams = {
      start_date: values.start_date || undefined,
      end_date: values.end_date || undefined,
      genres:
        values.genres && values.genres.length > 0 ? values.genres : undefined,
      rating: values.rating || undefined,
      min_score: values.min_score || undefined,
      max_score: values.max_score || undefined,
      status: values.status || undefined,
      type: values.type || undefined,
      order_by: values.order_by as GetAllAnimeParams["order_by"],
      sort: values.sort as GetAllAnimeParams["sort"],
    };

    // Remove undefined values
    Object.keys(params).forEach((key) => {
      const k = key as keyof GetAllAnimeParams;
      if (params[k] === undefined) {
        delete params[k];
      }
    });

    onFiltersChange(params);
  }

  function handleResetFilters() {
    form.reset();
    onFiltersChange({});
  }

  return (
    <aside className="w-full md:w-52 lg:w-60 p-2 rounded-2xl space-y-0">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal strokeWidth={3} className="size-4" />
          <h1 className="font-secondary">Filters</h1>
        </div>

        <Button
          variant="outline"
          className="font-secondary md:hidden"
          onClick={handleToggleFilters}
        >
          {isOpen ? "Hide filters" : "Show filters"}
        </Button>
      </div>

      <Activity mode={isOpen ? "visible" : "hidden"}>
        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-6 sticky top-24"
          >
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
                    <DropdownMenuContent className="w-[90vw] md:w-auto md:min-w-44 border-2 overflow-y-hidden">
                      <DropdownMenuLabel className="text-xs font-light">
                        Genres
                      </DropdownMenuLabel>
                      <ScrollArea className="flex flex-col w-full p-0 max-h-72">
                        {GENRES.map((genre) => (
                          <FormItem
                            key={
                              genre.mal_id +
                              genre.name +
                              genre.url +
                              genre.count
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
                                          (id) => id !== genre.mal_id,
                                        ),
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
                    <Select01
                      value={field.value?.toString() ?? ""}
                      onChange={(val) =>
                        field.onChange(val === "" ? undefined : String(val))
                      }
                      options={RATINGS.map((rating) => ({
                        label: rating.label,
                        value: rating.value,
                      }))}
                      placeholder="Rating"
                      label="Rating"
                    />
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
                    <Select01
                      value={field.value?.toString() ?? ""}
                      onChange={(val) =>
                        field.onChange(val === "" ? undefined : String(val))
                      }
                      options={STATUS.map((status) => ({
                        label: status.label,
                        value: status.value,
                      }))}
                      placeholder="Status"
                      label="Status"
                    />
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
                    <Select01
                      value={field.value?.toString() ?? ""}
                      onChange={(val) =>
                        field.onChange(val === "" ? undefined : String(val))
                      }
                      options={TYPES.map((type) => ({
                        label: type.label,
                        value: type.value,
                      }))}
                      placeholder="Type"
                      label="Type"
                    />
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
                      <Select01
                        value={field.value?.toString() ?? ""}
                        onChange={(val) =>
                          field.onChange(val === "" ? undefined : Number(val))
                        }
                        options={scores.map((score) => ({
                          label: score.toString(),
                          value: score.toString(),
                        }))}
                        placeholder="Min score"
                        label="Min score"
                      />
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
                      <Select01
                        value={field.value?.toString() ?? ""}
                        onChange={(val) =>
                          field.onChange(val === "" ? undefined : Number(val))
                        }
                        options={scores.map((score) => ({
                          label: score.toString(),
                          value: score.toString(),
                        }))}
                        placeholder="Max score"
                        label="Max score"
                      />
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
                    <Select01
                      value={field.value?.toString() ?? ""}
                      onChange={(val) =>
                        field.onChange(val === "" ? undefined : String(val))
                      }
                      options={OrderBy.map((orderBy) => ({
                        label: orderBy.label,
                        value: orderBy.value,
                      }))}
                      placeholder="Order by"
                      label="Order by"
                    />
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
                    <Select01
                      value={field.value?.toString() ?? ""}
                      onChange={(val) =>
                        field.onChange(val === "" ? undefined : String(val))
                      }
                      options={SORT.map((sort) => ({
                        label: sort.label,
                        value: sort.value,
                      }))}
                      placeholder="Sort"
                      label="Sort"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2">
              <Button type="submit" className="font-secondary w-full">
                Apply filters
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="font-secondary inline-flex items-start gap-2"
                onClick={handleResetFilters}
              >
                <FunnelX strokeWidth={3} className="size-4" />
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </Activity>
    </aside>
  );
};

export default Sidebar;
