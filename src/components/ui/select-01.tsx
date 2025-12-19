import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Select01Props {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder: string;
  label: string;
}

const Select01 = ({
  value,
  onChange,
  options,
  placeholder,
  label,
}: Select01Props) => {
  return (
    <Select value={value} onValueChange={(val) => onChange(val)}>
      <SelectTrigger className="bg-transparent border border-border text-white! w-full font-secondary hover:bg-accent hover:text-primary!">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((option) => (
            <SelectItem key={option.label} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Select01;
